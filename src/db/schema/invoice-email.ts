import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import { baseTable } from "../base-table";

export const EmailRecipientTypeEnum = pgEnum("email_recipient_type", [
  "primary",
  "cc",
  "bcc",
]);

export const InvoiceEmailTable = pgTable("invoice_emails", {
  ...baseTable("invoice_email"),
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  subject: text().notNull(),
});

export const EmailRecipientTable = pgTable("email_recipients", {
  id: serial("id").primaryKey(),
  invoiceEmailId: integer()
    .notNull()
    .references(() => InvoiceEmailTable.id, { onDelete: "cascade" }),
  email: varchar({ length: 255 }).notNull(),
  type: EmailRecipientTypeEnum().notNull(),
});
