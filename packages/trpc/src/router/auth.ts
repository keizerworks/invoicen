import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "auth/password";
import { generateRandomOTP } from "auth/utils/code";
import {
  createEmailVerificationRequest,
  deletedEmailVerificationRequestByEmail,
  getEmailVerificationRequestByEmail,
} from "db/actions/email-verification";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  updateUser,
} from "db/actions/user";
import { getVerifyOtpHtml } from "transactional-email/emails/auth/verify-otp";
import { signUpSchema, verifyEmailSchema } from "validators/auth";

import mailer from "../mailer";
import { publicProcedure } from "../trpc";

export const authRouter = {
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input: body }) => {
      let user = await getUserByEmail(body.email);
      console.log(user);
      if (user?.emailVerified)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "A user with this email address is already registered and verified. Please sign in instead.",
        });

      body.password = await hashPassword(body.password);
      if (user && user.id) await deleteUser(user.id);
      user = await createUser(body);

      const otp = generateRandomOTP();
      const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

      await deletedEmailVerificationRequestByEmail(body.email);
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
        message:
          "A verification OTP has been sent to your email address. Please verify your email to complete the signup process.",
      };
    }),

  verifyEmail: publicProcedure
    .input(verifyEmailSchema)
    .mutation(async ({ input: body }) => {
      const verificationRequest = await getEmailVerificationRequestByEmail(
        body.email,
      );

      if (!verificationRequest)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No verification request found for this email. Please sign up again.",
        });

      if (Date.now() > verificationRequest.expiresAt.getTime())
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "The OTP has expired. Please request a new verification code.",
        });

      const updateUserPayload = { emailVerified: true };
      await updateUser(verificationRequest.userId, updateUserPayload);
      await deletedEmailVerificationRequestByEmail(body.email);

      return {
        message:
          "Your email has been successfully verified. You can now sign in.",
      };
    }),
} satisfies TRPCRouterRecord;
