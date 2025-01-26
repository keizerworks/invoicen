import { encodeBase32UpperCaseNoPadding } from "@oslojs/encoding";

export function generateRandomOTP(length = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Allowed characters
  let otp = "";

  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    const randomValue = randomValues[i];
    if (randomValue !== undefined)
      // Guard against undefined (TypeScript clarity)
      otp += chars[randomValue % chars.length];
  }

  return otp;
}

export function generateRandomRecoveryCode(): string {
  const recoveryCodeBytes = new Uint8Array(10);
  crypto.getRandomValues(recoveryCodeBytes);
  const recoveryCode = encodeBase32UpperCaseNoPadding(recoveryCodeBytes);
  return recoveryCode;
}
