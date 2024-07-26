import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom(),
  message: text("message"),
  time: timestamp("time").defaultNow(),
  userId: uuid("userId"),
});
