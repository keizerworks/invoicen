import { createClient } from "@openauthjs/openauth/client";
import { Resource } from "sst/resource";

export const authClient = createClient({
  clientID: "nextjs",
  issuer: Resource["invoicen-auth"].url,
});
