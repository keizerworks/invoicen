"use client";

import type { HTMLAttributes } from "react";
import type { z } from "zod";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "ui/components/button";
import { Form, FormField, useForm } from "ui/components/form";
import { Input } from "ui/components/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "ui/components/input-otp";
import { PasswordInput } from "ui/components/password-input";
import { cn } from "ui/lib/utils";
import {
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "validators/auth";

import { api } from "~/trpc/react";

type Props = HTMLAttributes<HTMLDivElement>;
type ForgotPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ForgotPasswordForm = ({ className, ...props }: Props) => {
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: sendOTPMutation, isPending: isSendingOTP } =
    api.auth.requestPasswordReset.useMutation({
      onSuccess: () => {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      },
      onError: (err) => toast.error(err.message),
    });

  const { mutate: resetPasswordMutation, isPending: isResettingPassword } =
    api.auth.resetPassword.useMutation({
      onSuccess: () => {
        toast.success("Password reset successfully");
        router.push("/signin");
      },
      onError: (err) => toast.error(err.message),
    });

  const handleSendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const email = form.getValues("email");
    const emailValidation = requestPasswordResetSchema.safeParse({ email });

    if (!emailValidation.success) {
      toast.error("Please enter a valid email");
      return;
    }

    sendOTPMutation({ email });
  };

  const handleFormSubmit = (data: ForgotPasswordFormData) => {
    resetPasswordMutation(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="grid gap-y-4"
        >
          <div className="flex items-center gap-x-2">
            <FormField
              control={form.control}
              name="email"
              label="Email"
              className="flex-1"
              render={({ field }) => <Input {...field} />}
            />
            <Button
              onClick={handleSendOTP}
              loading={isSendingOTP}
              disabled={otpSent}
              className="mt-4"
            >
              {otpSent ? "OTP sent" : "Send OTP"}
            </Button>
          </div>

          <FormField
            control={form.control}
            name="otp"
            label="OTP"
            disabled={!otpSent}
            className="flex-1"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            label="New Password"
            disabled={!otpSent}
            render={({ field }) => <PasswordInput {...field} />}
          />

          <Link href="/signin" className="text-sm text-primary">
            Sign In
          </Link>

          <Button
            type="submit"
            loading={isResettingPassword}
            className="mt-4 w-full"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};
