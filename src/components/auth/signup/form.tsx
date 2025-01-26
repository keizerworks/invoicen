"use client";

import type { HTMLAttributes } from "react";
import type { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/ui/password-input";
import { cn } from "~/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUpSchema } from "~/validators/auth";

import { VerifyEmail } from "./verify-email";

type EmailSignUpInterface = z.infer<typeof signUpSchema>;

type Props = HTMLAttributes<HTMLDivElement>;

export const SignUpForm = ({ className, ...props }: Props) => {
  const [isOtpRequested, setOtpRequestStatus] = useState(false);

  const form = useForm<EmailSignUpInterface>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isPending } = api.auth.signUp.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
      setOtpRequestStatus(true);
    },
    onError: (err) => console.error(err),
  });

  function onSubmit(data: EmailSignUpInterface) {
    mutate(data);
  }

  function handleEmailVerificationSuccess() {
    setOtpRequestStatus(false);
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
            <FormField
              control={form.control}
              name="name"
              label="Name"
              render={({ field }) => <Input {...field} />}
            />

            <FormField
              control={form.control}
              name="email"
              label="Email"
              render={({ field }) => <Input {...field} />}
            />

            <FormField
              control={form.control}
              name="password"
              label="Passowrd"
              render={({ field }) => <PasswordInput {...field} />}
            />

            <Button loading={isPending} type="submit" className="mt-4 w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>

      {isOtpRequested ? (
        <VerifyEmail
          email={form.getValues("email")}
          onSuccess={handleEmailVerificationSuccess}
        />
      ) : null}
    </>
  );
};
