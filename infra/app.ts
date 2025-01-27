import { email } from "./email";
import {
  bucket,
  DATABASE_URL,
  NEXT_PUBLIC_S3_DOMAIN,
  postgres,
} from "./storage";

export const auth = new sst.aws.Auth("invoicen-auth", {
  issuer: {
    handler: "src/auth/index.handler",
    link: [email, postgres],
    memory: "512 MB",
    environment: { DATABASE_URL, NEXT_PUBLIC_S3_DOMAIN },
    nodejs: {
      install: ["@aws-sdk/client-sesv2"],
    },
  },
});

export const app = new sst.aws.Nextjs("invoicen-web", {
  link: [postgres, bucket, email, auth],
  environment: { DATABASE_URL, NEXT_PUBLIC_S3_DOMAIN },
  server: {
    runtime: "nodejs22.x",
  },
});
