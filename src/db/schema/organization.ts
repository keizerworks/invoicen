import {
  integer,
  pgTable,
  timestamp,
  varchar,
  index,
} from 'drizzle-orm/pg-core';
import { userTable } from './user';

export const organizationTable = pgTable(
  'organization',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull(),
    user_id: integer()
      .references(() => userTable.id)
      .notNull(),
    logo_url: varchar({ length: 255 }),
    created_at: timestamp({ mode: 'date' }).defaultNow(),
    updated_at: timestamp({ mode: 'date' }).defaultNow(),
  },
  (table) => [index('user_id_idx').on(table.user_id)]
);
