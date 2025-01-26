import type { ReactNode } from "react";
import { AuthNav } from "~/components/auth/nav";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container relative grid min-h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />

        <div className="relative z-20 flex items-center text-lg font-medium">
          {/* logo */}
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Open-Blog has saved me countless hours of work and helped
              me publish blogs quickly.&rdquo;
            </p>
            <footer className="text-sm">Anon</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <AuthNav />
        {children}
      </div>
    </div>
  );
}
