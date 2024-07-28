"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import z from "zod";
import { filterMessages } from "./utils";

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
    username: "Stig",
    type: "weekly",
    time: new Date(1722101714000),
  },
];

export const getAllMessages = async () => {
  //const messages = await db.query.messages.findMany();
  const timeNow = new Date();
  const session = await getSession();

  const messages = await mockMessages;
  const filteredMessages = filterMessages(messages, session, timeNow);
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
  mockdb.push(data);
  revalidatePath("/");
};
