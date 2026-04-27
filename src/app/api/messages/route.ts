import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, and, or } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { messages, conversations } from "@/db/schema";
import { getConversationMessages } from "@/db/queries";

const PostSchema = z.object({
  conversationId: z.number().int().positive(),
  body:           z.string().min(1).max(2000),
});

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Nav autorizēts." }, { status: 401 });

  const convId = parseInt(req.nextUrl.searchParams.get("conversationId") ?? "", 10);
  if (isNaN(convId)) return NextResponse.json({ error: "Nepareizs ID." }, { status: 400 });

  // Verify user is a participant
  const conv = await db
    .select({ buyerId: conversations.buyerId, sellerId: conversations.sellerId })
    .from(conversations)
    .where(eq(conversations.id, convId))
    .limit(1);

  if (!conv[0]) return NextResponse.json({ error: "Nav atrasts." }, { status: 404 });
  const { buyerId, sellerId } = conv[0];
  if (session.user.id !== buyerId && session.user.id !== sellerId)
    return NextResponse.json({ error: "Piekļuve liegta." }, { status: 403 });

  // Mark messages as read
  await db
    .update(messages)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(messages.conversationId, convId),
        eq(messages.receiverId, session.user.id),
      )
    );

  const rows = await getConversationMessages(convId);
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

  const { conversationId, body: msgBody } = parsed.data;

  const conv = await db
    .select({
      buyerId:   conversations.buyerId,
      sellerId:  conversations.sellerId,
      listingId: conversations.listingId,
    })
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .limit(1);

  if (!conv[0]) return NextResponse.json({ error: "Nav atrasts." }, { status: 404 });
  const { buyerId, sellerId, listingId } = conv[0];
  if (session.user.id !== buyerId && session.user.id !== sellerId)
    return NextResponse.json({ error: "Piekļuve liegta." }, { status: 403 });

  const receiverId = session.user.id === buyerId ? sellerId : buyerId;

  const [created] = await db
    .insert(messages)
    .values({
      conversationId,
      senderId:   session.user.id,
      receiverId,
      listingId,
      body:       msgBody,
    })
    .returning({ id: messages.id });

  await db
    .update(conversations)
    .set({ lastMessageAt: new Date() })
    .where(eq(conversations.id, conversationId));

  return NextResponse.json({ id: created.id }, { status: 201 });
}
