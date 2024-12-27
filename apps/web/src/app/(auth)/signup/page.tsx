import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui/components/card";

import { SignUpForm } from "~/components/auth/signup/form";

export default function SignUpPage() {
  return (
    <Card className="mx-auto w-full border-0 shadow-none sm:w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpForm />
      </CardContent>

      <CardFooter className="text-center">
        <CardDescription>
          By clicking continue, you agree to our{" "}
          <Link
            href="/legal/tos"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="legal/privary-policy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
