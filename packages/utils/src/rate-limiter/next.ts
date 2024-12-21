import { headers } from "next/headers";

import { RefillingTokenBucket } from "./refill-token-bucket.js";

const globalBucket = new RefillingTokenBucket<string>(100, 1);

export async function globalGETRateLimit() {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = (await headers()).get("X-Forwarded-For");
  if (clientIP === null) return true;
  return globalBucket.consume(clientIP, 1);
}

export async function globalPOSTRateLimit() {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = (await headers()).get("X-Forwarded-For");
  if (clientIP === null) return true;
  return globalBucket.consume(clientIP, 3);
}
