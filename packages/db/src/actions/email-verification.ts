import type { CreateEmailVerificationRequestInterface } from "../schema/user";
import { db, desc, eq } from "../client";
import { emailVerificationRequestTable } from "../schema/user";

export const createEmailVerificationRequest = async (
  values: CreateEmailVerificationRequestInterface,
) => {
  const res = await db
    .insert(emailVerificationRequestTable)
    .values(values)
    .returning();
  return res[0];
};

export const deletedEmailVerificationRequestByEmail = async (email: string) => {
  await db
    .delete(emailVerificationRequestTable)
    .where(eq(emailVerificationRequestTable.email, email));
};

export const getEmailVerificationRequestByEmail = async (email: string) => {
  const res = await db
    .select()
    .from(emailVerificationRequestTable)
    .where(eq(emailVerificationRequestTable.email, email))
    .limit(1)
    .orderBy(desc(emailVerificationRequestTable.id));
  return res[0];
};
