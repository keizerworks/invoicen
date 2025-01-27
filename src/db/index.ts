import { env } from "~/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst/resource";

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

const pool =
  globalForDb.pool ??
  new Pool({
    host: Resource["invoicen-pg"].host,
    port: Resource["invoicen-pg"].port,
    user: Resource["invoicen-pg"].username,
    password: Resource["invoicen-pg"].password,
    database: Resource["invoicen-pg"].database,
  });

if (env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = drizzle(pool);
