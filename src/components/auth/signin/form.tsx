"use client";

import type { HTMLAttributes } from "react";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/ui/password-input";
import { cn } from "~/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "trpc/react";
import { signInWithEmailSchema } from "~/validators/auth";

type EmailSignInInterface = z.infer<typeof signInWithEmailSchema>;
type Props = HTMLAttributes<HTMLDivElement>;

export const SignInForm = ({ className, ...props }: Props) => {
  const router = useRouter();
  const form = useForm<EmailSignInInterface>({
    resolver: zodResolver(signInWithEmailSchema),
  });

  const { mutate, isPending } = api.auth.signInWithEmail.useMutation({
    onSuccess: () => router.replace("/"),
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: EmailSignInInterface) {
    mutate(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
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
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};
