import type { UUID } from "crypto";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

import {
  deleteSession,
  getSessionWithUser,
  insertSession,
  updateSession,
} from "@repo/db/actions/session";

import { SESSION_EXPIRE_TIME, SESSION_EXPIRING_SOON } from "./constants.js";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export const getCurrentSession = (token: string) => {
  const result = validateSessionToken(token);
  return result;
};

export async function createSession(
  token: string,
  userId: UUID,
): Promise<string> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  await insertSession({
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_EXPIRE_TIME),
  });
  return sessionId;
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await getSessionWithUser(sessionId);
  if (!result) return { session: null, user: null };
  const { user, session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await deleteSession(sessionId);
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_EXPIRING_SOON) {
    session.expiresAt = new Date(Date.now() + SESSION_EXPIRE_TIME);
    await updateSession({ expiresAt: session.expiresAt }, session.id);
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await deleteSession(sessionId);
}
