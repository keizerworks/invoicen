import { vpc } from "./vpc";

export const bucket = new sst.aws.Bucket("invoicen-s3", {
  access: "public",
});
export const postgres = new sst.aws.Postgres("invoicen-pg", {
  vpc,
  dev: {
    // FIXME: move to .env and use sst secret to access (needed for local dev instead of creating postgres rds in aws)
    username: "postgres",
    password: "password",
    database: "invoicen",
    host: "localhost",
    port: 5432,
  },
});

export const NEXT_PUBLIC_S3_DOMAIN = $interpolate`https://${bucket.domain}`;

export const DATABASE_URL = $interpolate`postgresql://${postgres.username}:${postgres.password}@${postgres.host}:${postgres.port}/${postgres.database}`;
