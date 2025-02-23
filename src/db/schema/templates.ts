import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  templateData: jsonb("template_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});
