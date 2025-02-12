import { z } from 'zod';
import { createEnv } from '@t3-oss/env-core';

const envSchema = {
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_SECURE: z.string(),
  PORT: z.string().optional(),
  ACCESS_TOKEN_PRIVATE_KEY: z.string(),
  ACCESS_TOKEN_PUBLIC_KEY: z.string(),
  REFRESH_TOKEN_PRIVATE_KEY: z.string(),
  REFRESH_TOKEN_PUBLIC_KEY: z.string(),
};

const env = createEnv({
  server: envSchema,
  runtimeEnv: process.env,
});

export default env;
