import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

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
