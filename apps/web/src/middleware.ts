import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_ROUTES, PUBLIC_ROUTES } from "./routes.config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get("session")?.value ?? null;

  if (AUTH_ROUTES.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!authToken && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/trpc (TRPC routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api/trpc|test|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
