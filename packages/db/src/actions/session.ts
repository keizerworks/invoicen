import { eq } from "drizzle-orm";

import type { InsertSessionInterface } from "../schema/session";
import { db } from "../client";
import { sessionTable } from "../schema/session";
import { userTable } from "../schema/user";

export const insertSession = async (values: InsertSessionInterface) => {
  const sessions = await db.insert(sessionTable).values(values).returning();
  if (sessions[0]) throw new Error();
  return sessions[0];
};

export const getSessionWithUser = async (sessionId: string) => {
  const res = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId))
    .limit(1);
  return res[0];
};

export const updateSession = async (
  values: Partial<InsertSessionInterface>,
  id: string,
) => {
  await db.update(sessionTable).set(values).where(eq(sessionTable.id, id));
};

export const deleteSession = async (id: string) =>
  await db.delete(sessionTable).where(eq(sessionTable.id, id));
