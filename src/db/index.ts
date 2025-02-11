import { drizzle } from 'drizzle-orm/node-postgres';
import env from '@/libs/env';

const db = drizzle({
  connection: {
    user: env.POSTGRES_USER!,
    password: env.POSTGRES_PASSWORD!,
    database: env.POSTGRES_DB!,
    host: env.POSTGRES_HOST!,
    port: Number(env.POSTGRES_PORT!),
    ssl: false,
  },
});

export default db;
