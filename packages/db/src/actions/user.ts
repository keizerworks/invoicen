import { eq } from "drizzle-orm";

import type { CreateUserInterface } from "../schema/user";
import { db } from "../client";
import { userTable } from "../schema/user";

export const getUserByEmail = async (email: string) => {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);
  return users[0];
};

export const createUser = async (values: CreateUserInterface) => {
  const users = await db.insert(userTable).values(values).returning();
  if (!users[0]) throw new Error();
  return users[0];
};

export const updateUser = async (
  id: string,
  values: Partial<CreateUserInterface>,
) => {
  await db.update(userTable).set(values).where(eq(userTable.id, id)).execute();
};

export const deleteUser = async (id: string) => {
  await db.delete(userTable).where(eq(userTable.id, id)).execute();
};
