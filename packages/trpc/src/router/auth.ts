import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "auth/password";
import { generateRandomOTP } from "auth/utils/code";
import { createEmailVerificationRequest } from "db/actions/email-verification";
import { createUser, getUserByEmail } from "db/actions/user";
import { getVerifyOtpHtml } from "transactional-email/emails/auth/verify-otp";
import { signUpSchema } from "validators/auth";

import mailer from "../mailer";
import { publicProcedure } from "../trpc";

export const authRouter = {
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input: body }) => {
      console.log({
        host: process.env.SMTP_HOST ?? "",
        port: parseInt(process.env.SMTP_PORT ?? "587"),
        secure: process.env.SMTP_SECURE === "true",
        user: process.env.SMTP_USER ?? "",
        password: process.env.SMTP_PASSWORD ?? "",
      });
      let user = await getUserByEmail(body.email);
      if (user?.emailVerified)
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

      mailer
        .sendEmail({
          to: body.email,
          html: await getVerifyOtpHtml({ validationCode: otp }),
        })
        .catch(console.error);

      return {
        message: "verify email OTP have been to your email address",
      };
    }),
} satisfies TRPCRouterRecord;
