import { pgTable, serial, text, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { templates } from "./templates";

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").unique().notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  issuedDate: timestamp("issued_date").defaultNow().notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: text("status").default("pending").notNull(),
  items: jsonb("items").notNull(),
  totalAmount: integer("total_amount").notNull(),
  currency: text("currency").default("USD").notNull(),
  notes: text("notes"),
  templateId: integer("template_id").references(() => templates.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
