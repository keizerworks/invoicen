import { domain } from "./dns";

export const email = new sst.aws.Email("invoicen-ses", {
  sender: domain,
  dns: sst.cloudflare.dns(),
});
