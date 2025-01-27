import { jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { baseTable } from "../base-table";

export const InvoiceTemplateTable = pgTable("invoice_template", {
  ...baseTable("invoice_template"),
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  thumbnail: text(),
  description: text(),
  structure: jsonb().notNull(),
});
