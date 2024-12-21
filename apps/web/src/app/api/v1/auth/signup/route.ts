import type { NextRequest } from "next/server";

import { hashPassword } from "@repo/auth/password";
import { generateRandomOTP } from "@repo/auth/utils/code";
import { createEmailVerificationRequest } from "@repo/db/actions/email-verification";
import { createUser, getUserByEmail } from "@repo/db/actions/user";
import { globalPOSTRateLimit } from "@repo/utils/rate-limiter/next";
import { RefillingTokenBucket } from "@repo/utils/rate-limiter/refill-token-bucket";
import { signUpSchema } from "@repo/validators/auth";

const ipBucket = new RefillingTokenBucket<string>(3, 10);

export const POST = async (request: NextRequest) => {
  if (!(await globalPOSTRateLimit()))
    return Response.json({ message: "Too many requests" }, { status: 500 });

  // INFO: Assumes X-Forwarded-For is always included.
  const clientIP = request.headers.get("X-Forwarded-For");
  if (clientIP !== null && !ipBucket.check(clientIP, 1))
    return Response.json({ message: "Too many requests" }, { status: 500 });

  const parsedBody = signUpSchema.safeParse(await request.json());
  const { data: body, error, success } = parsedBody;
  if (!success) return Response.json(error.errors, { status: 400 });

  let user = await getUserByEmail(body.email);
  if (user)
    return Response.json(
      { message: "User with email addres already exists" },
      { status: 400 },
    );

  body.password = await hashPassword(body.password);
  user = await createUser(body);

  const otp = generateRandomOTP();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);
  await createEmailVerificationRequest({
    email: body.email,
    expiresAt,
    userId: user.id,
    otp,
  });

  // TODO: sendVerificationEmail(emailVerificationRequest.email, emailVerificationRequest.code);
};
