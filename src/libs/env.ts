const POSTGRES_USER = process.env.POSTGRES_USER;

if (!POSTGRES_USER) {
  throw new Error('POSTGRES_USER is not set');
}

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

if (!POSTGRES_PASSWORD) {
  throw new Error('POSTGRES_PASSWORD is not set');
}

const POSTGRES_DB = process.env.POSTGRES_DB;

if (!POSTGRES_DB) {
  throw new Error('POSTGRES_DB is not set');
}

const POSTGRES_HOST = process.env.POSTGRES_HOST;

if (!POSTGRES_HOST) {
  throw new Error('POSTGRES_HOST is not set');
}

const POSTGRES_PORT = process.env.POSTGRES_PORT;

if (!POSTGRES_PORT) {
  throw new Error('POSTGRES_PORT is not set');
}

const SMTP_HOST = process.env.SMTP_HOST;

if (!SMTP_HOST) {
  throw new Error('SMTP_HOST is not set');
}

const SMTP_PORT = process.env.SMTP_PORT;

if (!SMTP_PORT) {
  throw new Error('SMTP_PORT is not set');
}

const SMTP_USER = process.env.SMTP_USER;

if (!SMTP_USER) {
  throw new Error('SMTP_USER is not set');
}

const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

if (!SMTP_PASSWORD) {
  throw new Error('SMTP_PASSWORD is not set');
}

const SMTP_SECURE = process.env.SMTP_SECURE;

if (!SMTP_SECURE) {
  throw new Error('SMTP_SECURE is not set');
}

const PORT = process.env.PORT;

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY;

if (!ACCESS_TOKEN_PRIVATE_KEY) {
  throw new Error('ACCESS_TOKEN_PRIVATE_KEY is not set');
}

const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY;

if (!ACCESS_TOKEN_PUBLIC_KEY) {
  throw new Error('ACCESS_TOKEN_PUBLIC_KEY is not set');
}

const REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY;

if (!REFRESH_TOKEN_PRIVATE_KEY) {
  throw new Error('REFRESH_TOKEN_PRIVATE_KEY is not set');
}

const REFRESH_TOKEN_PUBLIC_KEY = process.env.REFRESH_TOKEN_PUBLIC_KEY;

if (!REFRESH_TOKEN_PUBLIC_KEY) {
  throw new Error('REFRESH_TOKEN_PUBLIC_KEY is not set');
}

const env = {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_SECURE,
  PORT,
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
};

export default env;
