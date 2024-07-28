"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import z from "zod";
import { filterMessages, getLastestFetch } from "./utils";

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
  { id: "2", message: "Tjena!", time: new Date(), username: "Tomas" },
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

  const lastFetch = getLastestFetch(mockFetches, session);

  const messages = await mockMessages;
  const filteredMessages = filterMessages(messages, session, lastFetch);
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
  revalidatePath("/");
};

export const refetchData = async () => {
  const session = await getSession();

  const lastFetch = getLastestFetch(mockFetches, session);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (lastFetch < today.getDate()) {
    mockFetches.push({
      username: session.user,
      time: new Date(),
      type: "daily",
    });
    return revalidatePath("/");
  }
  return console.log("out of fetches");
};
