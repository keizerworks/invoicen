import { domain } from "./dns";
import { email } from "./email";
import {
  bucket,
  DATABASE_URL,
  NEXT_PUBLIC_S3_DOMAIN,
  postgres,
} from "./storage";
import { vpc } from "./vpc";

export const auth = new sst.aws.Auth("invoicen-auth", {
  issuer: {
    handler: "src/auth/index.handler",
    link: [email, postgres],
    memory: "512 MB",
    environment: { DATABASE_URL, NEXT_PUBLIC_S3_DOMAIN },
    nodejs: {
      install: ["@aws-sdk/client-sesv2"],
    },
    vpc,
  },
  domain: {
    name: "auth." + domain,
    dns: sst.cloudflare.dns(),
  },
});

export const app = new sst.aws.Nextjs("invoicen-web", {
  vpc,
  link: [postgres, bucket, email, auth],
  environment: { DATABASE_URL, NEXT_PUBLIC_S3_DOMAIN },
  domain:
    $app.stage === "production"
      ? {
          name: domain,
          redirects: ["www." + domain],
          dns: sst.cloudflare.dns(),
        }
      : undefined,
  server: {
    runtime: "nodejs22.x",
  },
});
