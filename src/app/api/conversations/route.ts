import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { conversations, listings } from "@/db/schema";
import { getUserConversations } from "@/db/queries";

const PostSchema = z.object({
  listingId: z.number().int().positive(),
});

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Nav autorizēts." }, { status: 401 });

  const rows = await getUserConversations(session.user.id);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Nav autorizēts." }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Nepareizs pieprasījums." }, { status: 400 }); }

  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validācijas kļūda." }, { status: 422 });

  const { listingId } = parsed.data;

  const listing = await db
    .select({ userId: listings.userId })
    .from(listings)
    .where(eq(listings.id, listingId))
    .limit(1);

  if (!listing[0]) return NextResponse.json({ error: "Sludinājums nav atrasts." }, { status: 404 });

  const sellerId = listing[0].userId;
  if (sellerId === session.user.id)
    return NextResponse.json({ error: "Nevar sākt sarunu ar sevi." }, { status: 400 });

  // Return existing conversation if it already exists
  const existing = await db
    .select({ id: conversations.id })
    .from(conversations)
    .where(and(eq(conversations.listingId, listingId), eq(conversations.buyerId, session.user.id)))
    .limit(1);

  if (existing[0]) return NextResponse.json({ id: existing[0].id }, { status: 200 });

  const [created] = await db
    .insert(conversations)
    .values({
      listingId,
      buyerId:       session.user.id,
      sellerId,
      lastMessageAt: new Date(),
    })
    .returning({ id: conversations.id });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
