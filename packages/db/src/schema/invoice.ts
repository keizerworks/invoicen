import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";
import { ClientsTable } from "./client";
import { InvoiceTemplatesTable } from "./invoice-template";

export const InvoiceStatusEnum = pgEnum("status", [
  "draft",
  "finalized",
  "archived",
]);

export const InvoicesTable = pgTable("invoices", {
  ...baseTable,
  file: varchar().notNull(), // INFO: it will have URL of generated PDF
  status: InvoiceStatusEnum().default("draft").notNull(),

  templateId: integer()
    .references(() => InvoiceTemplatesTable.id, { onDelete: "cascade" })
    .notNull(),

  clientId: uuid()
    .references(() => ClientsTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const InvoiceItemsTable = pgTable("invoice_items", {
  ...baseTable,
  invoiceId: uuid()
    .references(() => InvoicesTable.id, { onDelete: "cascade" })
    .notNull(),
  description: text().notNull(),
  quantity: integer().notNull().default(1),

  /* INFO:
   * Always store the value in its smallest currency unit
   * (e.g., for 1 INR, store 100 as 100 paise; for 1 USD, store 100 as 100 cents)
   * This avoids precision errors and simplifies calculations.
   */
  pricePerUnit: integer().notNull(),

  total: integer().generatedAlwaysAs(sql`quantity * price_per_unit`),
});
