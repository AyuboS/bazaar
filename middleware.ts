import { type NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/dashboard", "/messages"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected  = PROTECTED.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const sessionCookie = request.cookies.get("better-auth.session_token");
    if (!sessionCookie?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/messages/:path*"],
};
