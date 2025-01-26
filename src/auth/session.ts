import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { SESSION_EXPIRE_TIME, SESSION_EXPIRING_SOON } from "~/constants/auth";
// import {
//   deleteSession,
//   getSession,
//   insertSession,
//   updateSession,
// } from "repository/session";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export const getCurrentSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = await validateSessionToken(token);
  return result;
});

export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = await insertSession({
    id: sessionId,
    user_id: userId,
    expires_at: new Date(Date.now() + SESSION_EXPIRE_TIME),
  });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: session.expires_at,
  });

  return session;
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await getSession(sessionId, { user: true });
  if (typeof result === "undefined") return null;
  const session = result;

  if (Date.now() >= session.expires_at.getTime()) {
    await deleteSession(sessionId);
    return null;
  }

  if (Date.now() >= session.expires_at.getTime() - SESSION_EXPIRING_SOON) {
    session.expires_at = new Date(Date.now() + SESSION_EXPIRE_TIME);
    await updateSession(session.id, { expires_at: session.expires_at });
  }

  return session;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await deleteSession(sessionId);
}
