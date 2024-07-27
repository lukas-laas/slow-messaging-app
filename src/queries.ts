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

const mockdb = [
  { id: "1", message: "Hej!!", time: new Date(), username: "Stig" },
  { id: "2", message: "Tjena!", time: new Date(), username: "Tomas" },
  { id: "3", message: "Hur mår du?", time: new Date(), username: "Stig" },
];

export const getAllMessages = async () => {
  //const messages = await db.query.messages.findMany();
  const timeNow = new Date();
  const session = await getSession();

  const messages = await mockdb;
  const filteredMessages = filterMessages(messages, session, timeNow);
  return filteredMessages;
};

export const postMessage = async (formData: FormData) => {
  const session = await getSession();

  const message = formData.get("message")!.toString();
  Message.safeParse(message);

  const data = {
    id: mockdb.length.toString(),
    message: message,
    time: new Date(),
    username: session.user,
  };
  mockdb.push(data);
  revalidatePath("/");
};
