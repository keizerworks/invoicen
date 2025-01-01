import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";
import { UsersTable } from "./user";

export const SessionsTable = pgTable("sessions", {
  ...baseTable,
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type SessionInterface = InferSelectModel<typeof SessionsTable>;
export type InsertSessionInterface = InferInsertModel<typeof SessionsTable>;
