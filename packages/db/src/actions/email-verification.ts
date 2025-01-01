import type { CreateEmailVerificationRequestInterface } from "../schema/user";
import { db, desc, eq } from "../client";
import { EmailVerificationRequestsTable } from "../schema/user";

export const createEmailVerificationRequest = async (
  values: CreateEmailVerificationRequestInterface,
) => {
  const res = await db
    .insert(EmailVerificationRequestsTable)
    .values(values)
    .returning();
  return res[0];
};

export const deletedEmailVerificationRequestByEmail = async (email: string) => {
  await db
    .delete(EmailVerificationRequestsTable)
    .where(eq(EmailVerificationRequestsTable.email, email));
};

export const getEmailVerificationRequestByEmail = async (email: string) => {
  const res = await db
    .select()
    .from(EmailVerificationRequestsTable)
    .where(eq(EmailVerificationRequestsTable.email, email))
    .limit(1)
    .orderBy(desc(EmailVerificationRequestsTable.id));
  return res[0];
};
