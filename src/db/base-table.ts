import type { type as idType } from "~/lib/id";
import { createId } from "~/lib/id";
import { timestamp, varchar } from "drizzle-orm/pg-core";

export const baseTable = (type: keyof typeof idType) => ({
  id: varchar("id", { length: 34 })
    .$defaultFn(() => createId(type))
    .primaryKey(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
