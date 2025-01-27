import { integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { baseTable } from "../base-table";
import { ClientTable } from "./client";
import { InvoiceTemplateTable } from "./invoice-template";

export const InvoiceStatusEnum = pgEnum("status", [
  "draft",
  "finalized",
  "archived",
]);

export const InvoiceTable = pgTable("invoices", {
  ...baseTable("invoice"),
  file: varchar().notNull(), // INFO: it will have URL of generated PDF
  status: InvoiceStatusEnum().default("draft").notNull(),

  templateId: integer()
    .references(() => InvoiceTemplateTable.id, { onDelete: "cascade" })
    .notNull(),

  clientId: varchar()
    .references(() => ClientTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const InvoiceItemTable = pgTable("invoice_items", {
  ...baseTable("invoice_item"),
  invoiceId: varchar()
    .references(() => InvoiceTable.id, { onDelete: "cascade" })
    .notNull(),
  description: text().notNull(),
  quantity: integer().notNull().default(1),

  /* INFO:
   * Always store the value in its smallest currency unit
   * (e.g., for 1 INR, store 100 as 100 paise; for 1 USD, store 100 as 100 cents)
   * This avoids precision errors and simplifies calculations.
   */
  pricePerUnit: integer().notNull(),
});
