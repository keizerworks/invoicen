import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get("session")?.value ?? null;

  if (
    (pathname.startsWith("/signup") || pathname.startsWith("/signin")) &&
    authToken
  )
    return NextResponse.rewrite(new URL("/", request.url));

  if (!authToken) return NextResponse.rewrite(new URL("/signin", request.url));
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
