import { jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";

export const InvoiceTemplatesTable = pgTable("invoice_templates", {
  ...baseTable,
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  thumbnail: text(),
  description: text(),
  structure: jsonb().notNull(),
});
