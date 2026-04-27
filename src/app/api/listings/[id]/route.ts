import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { listings } from "@/db/schema";

const PatchSchema = z.object({
  title:       z.string().min(3).max(120).optional(),
  description: z.string().max(3000).optional(),
  priceCents:  z.number().int().min(0).nullable().optional(),
  negotiable:  z.boolean().optional(),
  city:        z.string().min(1).max(64).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Nav autorizēts." }, { status: 401 });

  const { id } = await params;
  const listingId = parseInt(id, 10);
  if (isNaN(listingId)) return NextResponse.json({ error: "Nepareizs ID." }, { status: 400 });

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Nepareizs pieprasījums." }, { status: 400 }); }

  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validācijas kļūda." }, { status: 422 });

  const updated = await db
    .update(listings)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(and(eq(listings.id, listingId), eq(listings.userId, session.user.id)))
    .returning({ id: listings.id });

  if (!updated[0]) return NextResponse.json({ error: "Nav atrasts." }, { status: 404 });

  return NextResponse.json({ id: updated[0].id });
}
