import { pgTable, serial, text, timestamp, jsonb, integer, varchar, uuid } from "drizzle-orm/pg-core";
import { templates } from "./templates";
import { sql } from "drizzle-orm";

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: text("invoice_number").unique().notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  issuedDate: timestamp("issued_date").defaultNow().notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: text("status").default("pending").notNull(),
  items: jsonb("items").notNull(),
  totalAmount: integer("total_amount").notNull(),
  currency: text("currency").default("USD").notNull(),
  taxes: jsonb("taxes").default("[]").notNull(),  
  taxTotal: integer("tax_total").default(0).notNull(),
  notes: text("notes"),
  termsAndConditions: text("terms_and_conditions"),
  templateId: uuid("template_id").references(() => templates.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});