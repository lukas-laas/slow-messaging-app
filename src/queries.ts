"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import z from "zod";
import {
  filterMessages,
  getLastestDailyFetch,
  getLastestFetch,
  getSecondWeeklyFetch,
  getUserStats,
} from "./utils";

const Message = z.string().max(255).min(1);

const dbUrl = process.env.DB_URL!;
const client = postgres(dbUrl);

const db = drizzle(client, { schema });

export const getAllMessages = async () => {
  try {
    const session = await getSession();
    const messages = await db.query.messages.findMany();
    const fetches = await db.query.fetches.findMany();

    const lastFetch = getLastestFetch(fetches, session.user);

    const filteredMessages = filterMessages(messages, session.user, lastFetch);
    return filteredMessages;
  } catch (error) {
    console.log("Failed to get messages");
  }
};

export const postMessage = async (formData: FormData) => {
  try {
    const session = await getSession();

    const message = formData.get("message")!.toString();
    const valid = Message.safeParse(message);
    if (valid.error) throw valid.error;
    const data = {
      message: message,
      username: session.user,
    };

    await db.insert(schema.messages).values(data);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/statistics");
  revalidatePath("/");
};

export const refetchData = async () => {
  try {
    const session = await getSession();
    const fetches = await db.query.fetches.findMany();

    const lastDailyFetch = getLastestDailyFetch(fetches, session);
    const secondLastWeeklyFetch = getSecondWeeklyFetch(fetches, session);

    // js date functions behave a bit strange so operations múst be seperated
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const sunday = new Date();
    sunday.setDate(sunday.getDate() - sunday.getDay());
    sunday.setUTCHours(0, 0, 0, 0);

    if (lastDailyFetch < today) {
      await db.insert(schema.fetches).values({
        username: session.user,
        type: "daily",
      });
    } else if (secondLastWeeklyFetch < sunday) {
      await db.insert(schema.fetches).values({
        username: session.user,
        type: "weekly",
      });
    } else console.log("Out of fetches");
  } catch (error) {
    console.log("Failed to refetch");
  }

  revalidatePath("/statistics");
  revalidatePath("/");
};

export const getUsersStats = async () => {
  try {
    const fetches = await db.query.fetches.findMany();
    const messages = await db.query.messages.findMany();

    const usernames = Array.from(
      new Set(fetches.map((fetch) => fetch.username))
    );

    const stats = usernames.map((username) => {
      const lastFetch = getLastestFetch(fetches, username);

      return getUserStats(messages, username, lastFetch, fetches);
    });
    console.log(stats);

    return stats;
  } catch (error) {
    console.log("Failed to fetch from database");
  }
};
