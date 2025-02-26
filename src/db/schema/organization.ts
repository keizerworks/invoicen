import {
  integer,
  pgTable,
  timestamp,
  varchar,
  index,
  uuid,
} from 'drizzle-orm/pg-core';
import { userTable } from './user';
import { sql } from 'drizzle-orm';

export const organizationTable = pgTable(
  'organization',
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    name: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull(),
    user_id: uuid()
      .references(() => userTable.id)
      .notNull(),
    logo_url: varchar({ length: 255 }),
    tax_id: varchar({ length: 100 }), // Optional
    address: varchar({ length: 500 }),
    phone: varchar({ length: 20 }),
    created_at: timestamp({ mode: 'date' }).defaultNow(),
    updated_at: timestamp({ mode: 'date' }).defaultNow(),
  },
  (table) => [index('user_id_idx').on(table.user_id)]
);
