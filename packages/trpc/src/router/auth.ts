import type { TRPCRouterRecord } from "@trpc/server";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";
import { hashPassword, verifyPasswordHash } from "auth/password";
import { createSession, generateSessionToken } from "auth/session";
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
import {
  signInWithEmailSchema,
  signUpSchema,
  verifyEmailSchema,
} from "validators/auth";

import mailer from "../mailer";
import { publicProcedure } from "../trpc";

export const authRouter = {
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input: body }) => {
      let user = await getUserByEmail(body.email);
      if (user?.emailVerified)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "A user with this email address is already registered and verified. Please sign in instead.",
        });

      const passwordHash = await hashPassword(body.password);
      if (user?.id) await deleteUser(user.id);
      user = await createUser({
        email: body.email,
        name: body.name,
        emailVerified: false,
        passwordHash,
      });

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

  signInWithEmail: publicProcedure
    .input(signInWithEmailSchema)
    .mutation(async ({ input: body }) => {
      const user = await getUserByEmail(body.email);
      if (!user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user found with the provided email address.",
        });

      if (!user.emailVerified)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Email address is not verified. Please verify your email to proceed.",
        });

      if (!user.passwordHash)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Password is not set for this account. Please reset your password.",
        });

      const validPassword = await verifyPasswordHash(
        user.passwordHash,
        body.password,
      );

      if (!validPassword)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password. Please try again.",
        });

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, user.id);

      if (!session)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",

          message: "Failed to create a session. Please try again later.",
        });

      const cookieStore = await cookies();
      cookieStore.set("session", sessionToken, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: session.expiresAt,
      });
    }),
} satisfies TRPCRouterRecord;
