import { email } from "./email";
import {
  bucket,
  DATABASE_URL,
  NEXT_PUBLIC_S3_DOMAIN,
  postgres,
} from "./storage";

export const app = new sst.aws.Nextjs("invoicen-web", {
  link: [postgres, bucket, email],
  environment: { DATABASE_URL, NEXT_PUBLIC_S3_DOMAIN },
  domain: { name: "invoicen.keizerworks.com", dns: sst.cloudflare.dns() },
  server: {
    runtime: "nodejs22.x",
  },
});
