import type { z } from "zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "ui/components/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "ui/components/credenza";
import { Form, FormField, useForm } from "ui/components/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "ui/components/input-otp";
import { verifyEmailSchema } from "validators/auth";

import { api } from "~/trpc/react";

type VerifyEmailInterface = z.infer<typeof verifyEmailSchema>;

interface Props {
  email: string;
  onSuccess?: () => Promise<void> | void;
}

export const VerifyEmail = ({ email, onSuccess }: Props) => {
  const router = useRouter();
  const form = useForm<VerifyEmailInterface>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const { mutate, isPending } = api.auth.verifyEmail.useMutation({
    onSuccess: async (res) => {
      toast.success(res.message);
      if (typeof onSuccess !== "undefined") await onSuccess();
      router.replace("/signin");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: VerifyEmailInterface) {
    mutate(data);
  }

  useEffect(() => {
    if (email) form.setValue("email", email);
  }, [email, form]);

  return (
    <Credenza open dismissable={false}>
      <CredenzaContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3 md:gap-y-4"
          >
            <CredenzaHeader>
              <CredenzaTitle>Verify Your Email</CredenzaTitle>
              <CredenzaDescription>
                Enter the 6-digit OTP sent to your email to complete your
                signup.
              </CredenzaDescription>
            </CredenzaHeader>

            <FormField
              control={form.control}
              name="otp"
              className="mx-auto"
              render={({ field }) => (
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            <CredenzaFooter>
              <Button loading={isPending} type="submit">
                Verify
              </Button>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
};
