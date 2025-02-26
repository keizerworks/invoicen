import { pgTable, text, timestamp, jsonb, integer, uuid } from "drizzle-orm/pg-core";
import { templates } from "./templates";
import { clientTable } from "./client"; 
import { sql } from "drizzle-orm";

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: text("invoice_number").unique().notNull(),
  clientId: uuid("client_id").references(() => clientTable.id, { onDelete: "cascade" }).notNull(),
  issuedDate: timestamp("issued_date").defaultNow().notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: text("status").default("pending").notNull(),

  // Sender (Your Org) details
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email"),
  senderAddress: text("sender_address"),
  senderPhone: text("sender_phone"),
  senderLogoUrl: text("sender_logo_url"),
  senderTaxId: text("sender_tax_id"),
  senderCompanyName: text("sender_company"),

  // Client details (to autofill frontend)
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  clientAddress: text("client_address"),
  clientPhone: text("client_phone"),
  clientTaxId: text("client_tax_id"),
  clientCompanyName: text("client_company"),

  // Invoice details
  items: jsonb("items").notNull(), // [{ name, quantity, unitPrice }]
  totalAmount: integer("total_amount").notNull(),
  currency: text("currency").default("USD").notNull(),
  taxes: jsonb("taxes").default("[]").notNull(), // [{ type, percentage, amount }]
  taxTotal: integer("tax_total").default(0).notNull(),
  discount: integer("discount").default(0).notNull(),

  notes: text("notes"),
  termsAndConditions: text("terms_and_conditions"),
  templateId: uuid("template_id").references(() => templates.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

