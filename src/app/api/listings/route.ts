import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { listings } from "@/db/schema";
import { z } from "zod";
import { LISTING_EXPIRY_DAYS } from "@/lib/constants";
import { headers } from "next/headers";

const Schema = z.object({
  categoryId:  z.number().int().positive(),
  title:       z.string().min(3).max(120),
  description: z.string().max(3000).default(""),
  priceCents:  z.number().int().min(0).nullable().optional(),
  negotiable:  z.boolean().default(false),
  city:        z.string().min(1).max(64),
  district:    z.string().max(64).optional(),
  images:      z.array(z.string()).max(12).default([]),
  attrs:       z.record(z.unknown()).default({}),
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return NextResponse.json({ error: "Nav autorizēts." }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Nepareizs pieprasījums." }, { status: 400 }); }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validācijas kļūda.", details: parsed.error.flatten() }, { status: 422 });

  const data      = parsed.data;
  const now       = new Date();
  const expiresAt = new Date(now.getTime() + LISTING_EXPIRY_DAYS * 864e5);

  const [created] = await db.insert(listings).values({
    userId:      session.user.id,
    categoryId:  data.categoryId,
    title:       data.title,
    description: data.description,
    priceCents:  data.priceCents ?? null,
    negotiable:  data.negotiable,
    city:        data.city,
    district:    data.district ?? null,
    images:      data.images,
    attrs:       data.attrs,
    status:      "active",
    createdAt:   now,
    updatedAt:   now,
    expiresAt,
  }).returning({ id: listings.id });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
