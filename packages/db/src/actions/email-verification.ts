import type { CreateEmailVerificationRequestInterface } from "../schema/user";
import { db } from "../client";
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
