import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { listings } from "@/db/schema";
import { LISTING_EXPIRY_DAYS } from "@/lib/constants";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Nav autorizēts." }, { status: 401 });

  const { id } = await params;
  const listingId = parseInt(id, 10);
  if (isNaN(listingId)) return NextResponse.json({ error: "Nepareizs ID." }, { status: 400 });

  const expiresAt = new Date(Date.now() + LISTING_EXPIRY_DAYS * 864e5);

  const updated = await db
    .update(listings)
    .set({ expiresAt, status: "active", updatedAt: new Date() })
    .where(and(eq(listings.id, listingId), eq(listings.userId, session.user.id)))
    .returning({ id: listings.id });

  if (!updated[0]) return NextResponse.json({ error: "Nav atrasts." }, { status: 404 });

  return NextResponse.json({ ok: true });
}
