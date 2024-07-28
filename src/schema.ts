import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  message: text("message"),
  time: timestamp("time").defaultNow().notNull(),
  username: text("username").notNull(),
});

export const fetches = pgTable("fetches", {
  id: uuid("id").defaultRandom().notNull(),
  username: text("username").notNull(),
  time: timestamp("time").defaultNow().notNull(),
  type: text("type").notNull(),
});
