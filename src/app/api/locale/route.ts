import { NextRequest, NextResponse } from "next/server";
import { LOCALES, type Locale } from "@/lib/i18n";

export async function POST(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") as Locale | null;

  if (!locale || !LOCALES.includes(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("locale", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });
  return res;
}
