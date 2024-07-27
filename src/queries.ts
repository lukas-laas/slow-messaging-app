"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";

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
  const messages = await mockdb;
  return messages;
};

export const postMessage = async (formData: FormData) => {
  const session = await getSession();

  const message = formData.get("message")!.toString();
  const data = {
    id: mockdb.length.toString(),
    message: message,
    time: new Date(),
    username: session.user,
  };
  mockdb.push(data);
  revalidatePath("/");
};
