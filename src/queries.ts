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

const mockMessages = [
  {
    id: "1",
    message: "Hej!!",
    time: new Date(1722101712000),
    username: "Stig",
  },
  {
    id: "2",
    message: "Tjena!",
    time: new Date(1722101712000),
    username: "Tomas",
  },
  {
    id: "3",
    message: "Hur mår du?",
    time: new Date(1722101712000),
    username: "Stig",
  },
  { id: "3", message: "Hur mår du?", time: new Date(), username: "Stig" },
  { id: "3", message: "Hur mår du?", time: new Date(), username: "Stig" },
];

const mockFetches = [
  {
    username: "Stig",
    type: "daily",
    time: new Date(1722101712000),
  },
  {
    username: "Stig",
    type: "weekly",
    time: new Date(1722101713000),
  },
  {
    username: "Tomas",
    type: "daily",
    time: new Date(1722106012000),
  },
];

export const getAllMessages = async () => {
  const session = await getSession();

  const lastFetch = getLastestFetch(mockFetches, session.user);

  const messages = await mockMessages;
  const filteredMessages = filterMessages(messages, session.user, lastFetch);
  return filteredMessages;
};

export const postMessage = async (formData: FormData) => {
  const session = await getSession();

  const message = formData.get("message")!.toString();
  Message.safeParse(message);

  const data = {
    id: mockMessages.length.toString(),
    message: message,
    time: new Date(),
    username: session.user,
  };
  mockMessages.push(data);
  revalidatePath("/statistics");
  revalidatePath("/");
};

export const refetchData = async () => {
  const session = await getSession();
  const fetches = await mockFetches;

  const lastDailyFetch = getLastestDailyFetch(fetches, session);
  const secondLastWeeklyFetch = getSecondWeeklyFetch(fetches, session);

  // js date functions behave a bit strange so operations múst be seperated
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const sunday = new Date();
  sunday.setDate(sunday.getDate() - sunday.getDay());
  sunday.setUTCHours(0, 0, 0, 0);

  if (lastDailyFetch < today) {
    mockFetches.push({
      username: session.user,
      time: new Date(),
      type: "daily",
    });
    return revalidatePath("/");
  }

  if (secondLastWeeklyFetch < sunday) {
    mockFetches.push({
      username: session.user,
      time: new Date(),
      type: "weekly",
    });
    revalidatePath("/statistics");
    return revalidatePath("/");
  }
  return console.log("out of fetches");
};

export const getUsersStats = async () => {
  try {
    const fetches = await mockFetches;
    const messages = await mockMessages;

    const usernames = Array.from(
      new Set(fetches.map((fetch) => fetch.username))
    );

    const stats = usernames.map((username) => {
      const lastFetch = getLastestFetch(fetches, username);

      return getUserStats(messages, username, lastFetch, fetches);
    });

    return stats;
  } catch (error) {
    console.log("Failed to fetch from database");
  }
};
