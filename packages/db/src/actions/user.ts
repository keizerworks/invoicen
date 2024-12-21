import { eq } from "drizzle-orm";

import { db } from "../client";
import type { CreateUserInterface } from "../schema/user";
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
