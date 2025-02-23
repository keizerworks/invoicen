import { pgTable, timestamp, integer, varchar, uuid } from "drizzle-orm/pg-core";
import { userTable } from './user';
import { sql } from "drizzle-orm/sql";

export const clientTable = pgTable('client', {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    user_id: uuid().references(() => userTable.id).notNull(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique(),
    phone: varchar({ length: 20 }),
    address: varchar({ length: 500 }),
    company_name: varchar({ length: 255 }),
    tax_id: varchar({ length: 100 }), // Optional, for businesses
    
    created_at: timestamp({ mode: 'date' }).defaultNow(),
    updated_at: timestamp({ mode: 'date' }).defaultNow(),
  });
  