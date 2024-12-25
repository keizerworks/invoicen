"use client";

import type { HTMLAttributes } from "react";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "ui/components/button";
import { Form, FormField, useForm } from "ui/components/form";
import { Input } from "ui/components/input";
import { PasswordInput } from "ui/components/password-input";
import { cn } from "ui/lib/utils";
import { signUpSchema } from "validators/auth";

import { api } from "~/trpc/react";

type EmailSignUpSchema = z.infer<typeof signUpSchema>;

type Props = HTMLAttributes<HTMLDivElement>;

export const SignUpForm = ({ className, ...props }: Props) => {
  // const router = useRouter();
  const form = useForm<EmailSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isPending } = api.auth.signUp.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
      // router.replace("/verify-otp/$id");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: EmailSignUpSchema) {
    mutate(data);
  }

  return (
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
  );
};
