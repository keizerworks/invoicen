import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  created_at: timestamp({ mode: 'date' }).defaultNow(),
  updated_at: timestamp({ mode: 'date' }).defaultNow(),
});

export type User = InferSelectModel<typeof userTable>;
