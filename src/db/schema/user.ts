import { InferSelectModel, sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  otp: integer(),
  is_verified: boolean().default(false).notNull(),
  is_onboarded: boolean().default(false).notNull(),

  subscription_plan: varchar({ length: 50 }).default('free').notNull(), // ['free', 'pro', 'enterprise']
  subscription_status: varchar({ length: 20 }).default('inactive').notNull(), // ['active', 'inactive', 'expired']
  subscription_expires_at: timestamp({ mode: 'date' }),
  
  created_at: timestamp({ mode: 'date' }).defaultNow(),
  updated_at: timestamp({ mode: 'date' }).defaultNow(),
});

export type User = InferSelectModel<typeof userTable>;
