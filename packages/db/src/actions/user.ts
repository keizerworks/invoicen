import { eq } from "drizzle-orm";

import type { CreateUserInterface } from "../schema/user";
import { db } from "../client";
import { UsersTable } from "../schema/user";

export const getUserByEmail = async (email: string) => {
  const users = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email))
    .limit(1);
  return users[0];
};

export const createUser = async (values: CreateUserInterface) => {
  const users = await db.insert(UsersTable).values(values).returning();
  if (!users[0]) throw new Error();
  return users[0];
};

export const updateUser = async (
  id: string,
  values: Partial<CreateUserInterface>,
) => {
  await db
    .update(UsersTable)
    .set(values)
    .where(eq(UsersTable.id, id))
    .execute();
};

export const deleteUser = async (id: string) => {
  await db.delete(UsersTable).where(eq(UsersTable.id, id)).execute();
};
