import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  dialect: "postgresql",
  // Pick up all our schema files
  schema: ["./src/db/schema/**/*.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource["invoicen-pg"].host,
    port: Resource["invoicen-pg"].port,
    user: Resource["invoicen-pg"].username,
    password: Resource["invoicen-pg"].password,
    database: Resource["invoicen-pg"].database,
    ssl: false,
  },
});
