import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  dialect: "postgresql",
  // Pick up all our schema files
  schema: ["./src/db/schema/**/*.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource["invoicen-postgres"].host,
    port: Resource["invoicen-postgres"].port,
    user: Resource["invoicen-postgres"].username,
    password: Resource["invoicen-postgres"].password,
    database: Resource["invoicen-postgres"].database,
    ssl: false,
  },
});
