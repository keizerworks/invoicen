import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

config({ path: ["../.env", "../../../.env"] });

export const db = drizzle({
  connection: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT),
    ssl: false,
  },
});
