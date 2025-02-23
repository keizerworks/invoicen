import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  templateData: jsonb("template_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});
