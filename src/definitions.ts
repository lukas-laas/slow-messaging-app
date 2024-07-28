import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { fetches, messages } from "./schema";

export type FetchSelect = InferSelectModel<typeof fetches>;
export type FetchInsert = InferInsertModel<typeof fetches>;

export type Message = InferSelectModel<typeof messages>;

export type Session = {
  user: string;
  expires: number;
};
