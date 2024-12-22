import { TRPCError } from "@trpc/server";
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { signUpSchema } from "@repo/validators/auth";
import { createUser, getUserByEmail } from "@repo/db/actions/user";
import { hashPassword } from "@repo/auth/password";
import { generateRandomOTP } from "@repo/auth/utils/code";
import { createEmailVerificationRequest } from "@repo/db/actions/email-verification";

export const authRouter = {
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input: body }) => {
      let user = await getUserByEmail(body.email);
      if (user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User with email addres already exists",
        });

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

      // TODO: send verification token to user via mail (setup node mailer in email package)

      return {
        message: "verify email OTP have been to your email address",
      };
    }),
} satisfies TRPCRouterRecord;
