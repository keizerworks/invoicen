import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";
import { userTable } from "./user";

export const sessionTable = pgTable("session", {
  ...baseTable,
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type SessionInterface = InferSelectModel<typeof sessionTable>;
export type InsertSessionInterface = InferInsertModel<typeof sessionTable>;
