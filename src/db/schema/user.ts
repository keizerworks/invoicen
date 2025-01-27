import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";

import { baseTable } from "../base-table";

export const UserTable = pgTable("users", {
  ...baseTable("user"),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  verified: boolean("verified").notNull().default(false),
});

export type UserInterface = InferSelectModel<typeof UserTable>;
export type CreateUserInterface = InferInsertModel<typeof UserTable>;
