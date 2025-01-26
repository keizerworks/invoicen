import Link from "next/link";
import { SignInForm } from "~/components/auth/signin/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const runtime = "edge";

export default function SignInPage() {
  return (
    <Card className="mx-auto w-full border-0 shadow-none sm:w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Signin to Invoicen</CardTitle>
        <CardDescription>
          Please enter your email and password to access your dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignInForm />
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
