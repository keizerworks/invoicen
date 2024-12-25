import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";

export const userTable = pgTable("user", {
  ...baseTable,
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  recoveryCode: varchar("recovery_code"),
});

export const emailVerificationRequestTable = pgTable(
  "email_verification_request",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id),
    email: varchar("email").notNull(),
    otp: varchar("otp").notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
);

export type UserInterface = InferSelectModel<typeof userTable>;
export type CreateUserInterface = InferInsertModel<typeof userTable>;
export type CreateEmailVerificationRequestInterface = InferInsertModel<
  typeof emailVerificationRequestTable
>;
