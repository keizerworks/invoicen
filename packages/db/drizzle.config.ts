import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT),
    ssl: false,
  },
  casing: "snake_case",
} satisfies Config;
