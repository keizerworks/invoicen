import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui/components/card";

import { ForgotPasswordForm } from "~/components/auth/forgot-password/form";

export default function ForgotPasswordPage() {
  return (
    <Card className="mx-auto w-full max-w-sm border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Provide your email address to receive an OTP to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
