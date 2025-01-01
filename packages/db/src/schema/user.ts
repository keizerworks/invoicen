import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";

export const UsersTable = pgTable("users", {
  ...baseTable,
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  recoveryCode: varchar("recovery_code"),
  passwordHash: text("password_hash"),
});

export const EmailVerificationRequestsTable = pgTable(
  "email_verification_requests",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id),
    email: varchar("email").notNull(),
    otp: varchar("otp").notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
);

export type UserInterface = InferSelectModel<typeof UsersTable>;
export type CreateUserInterface = InferInsertModel<typeof UsersTable>;
export type CreateEmailVerificationRequestInterface = InferInsertModel<
  typeof EmailVerificationRequestsTable
>;
