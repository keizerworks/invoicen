import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";

export const EmailRecipientTypeEnum = pgEnum("email_recipient_type", [
  "primary",
  "cc",
  "bcc",
]);

export const InvoiceEmailsTable = pgTable("invoice_emails", {
  ...baseTable,
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  subject: text().notNull(),
});

export const EmailRecipientsTable = pgTable("email_recipients", {
  id: serial("id").primaryKey(),
  invoiceEmailId: integer()
    .notNull()
    .references(() => InvoiceEmailsTable.id, { onDelete: "cascade" }),
  email: varchar({ length: 255 }).notNull(),
  type: EmailRecipientTypeEnum().notNull(),
});
