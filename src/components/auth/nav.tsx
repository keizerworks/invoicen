"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "lib/utils";

export const AuthNav = () => {
  const pathname = usePathname();

  // Check if the pathname is '/signin' or root ('/')
  const isSigninPage = pathname === "/signin" || pathname === "/";

  return (
    <Link
      href={isSigninPage ? "/signup" : "/signin"}
      className={cn(
        buttonVariants({ variant: "link" }),
        "absolute right-4 top-4 md:right-8 md:top-8",
      )}
    >
      {isSigninPage ? "Sign up" : "Sign in"}
    </Link>
  );
};
