import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const dbUrl = process.env.DB_URL!;
const client = postgres(dbUrl);

const db = drizzle(client, { schema });

export const getAllMessages = async () => {
  const messages = await db.query.messages.findMany();
  return messages;
};
