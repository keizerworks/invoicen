import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { baseTable } from "../base-table";

export const ClientTable = pgTable("clients", {
  ...baseTable("client"),
  name: varchar().notNull(),
  logo: varchar().notNull(), // INFO: it will have URL of logo img
  billingAddress: text(),
});
