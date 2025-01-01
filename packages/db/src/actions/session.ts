import { eq } from "drizzle-orm";

import type { InsertSessionInterface } from "../schema/session";
import { db } from "../client";
import { SessionsTable } from "../schema/session";
import { UsersTable } from "../schema/user";

export const insertSession = async (values: InsertSessionInterface) => {
  const sessions = await db.insert(SessionsTable).values(values).returning();
  if (!sessions[0]) throw new Error();
  return sessions[0];
};

export const getSessionWithUser = async (sessionId: string) => {
  const res = await db
    .select({ user: UsersTable, session: SessionsTable })
    .from(SessionsTable)
    .innerJoin(UsersTable, eq(SessionsTable.userId, UsersTable.id))
    .where(eq(SessionsTable.id, sessionId))
    .limit(1);
  return res[0];
};

export const updateSession = async (
  values: Partial<InsertSessionInterface>,
  id: string,
) => {
  await db.update(SessionsTable).set(values).where(eq(SessionsTable.id, id));
};

export const deleteSession = async (id: string) =>
  await db.delete(SessionsTable).where(eq(SessionsTable.id, id));
