import { db } from "@/db/index";
import { listings, categories, user } from "@/db/schema";
import {
  eq, and, gte, lte, desc, asc, sql, count,
  type SQL,
} from "drizzle-orm";
import { LISTINGS_PER_PAGE } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BrowseParams = {
  categorySlug?: string;
  city?:         string;
  priceMin?:     number;
  priceMax?:     number;
  q?:            string;
  sort?:         "newest" | "price_asc" | "price_desc";
  page?:         number;
  withPhoto?:    boolean;
};

export type ListingRow = {
  id:            number;
  title:         string;
  priceCents:    number | null;
  currency:      string;
  city:          string;
  district:      string | null;
  images:        string[];
  createdAt:     Date;
  featuredUntil: Date | null;
  categorySlug:  string | null;
  categoryName:  string | null;
};

export type ListingDetail = {
  id:            number;
  title:         string;
  description:   string;
  priceCents:    number | null;
  currency:      string;
  negotiable:    boolean;
  city:          string;
  district:      string | null;
  lat:           string | null;
  lng:           string | null;
  images:        string[];
  attrs:         Record<string, unknown>;
  status:        string;
  views:         number;
  featuredUntil: Date | null;
  createdAt:     Date;
  expiresAt:     Date;
  category: {
    id:          number;
    slug:        string;
    nameLv:      string;
    attrsSchema: import("@/db/schema").CategorySchema;
  } | null;
  seller: {
    id:        string;
    name:      string | null;
    phone:     string | null;
    createdAt: Date;
  } | null;
};

// ─── Listings ─────────────────────────────────────────────────────────────────

export async function getListings(params: BrowseParams = {}) {
  const {
    categorySlug, city, priceMin, priceMax,
    q, sort = "newest", page = 1, withPhoto = false,
  } = params;

  const conditions: SQL<unknown>[] = [eq(listings.status, "active")];

  if (city)      conditions.push(eq(listings.city, city));
  if (withPhoto) conditions.push(sql`array_length(${listings.images}, 1) > 0`);

  if (priceMin != null && !isNaN(priceMin))
    conditions.push(gte(listings.priceCents, priceMin * 100));
  if (priceMax != null && !isNaN(priceMax))
    conditions.push(lte(listings.priceCents, priceMax * 100));

  if (q?.trim())
    conditions.push(sql`${listings.searchVector} @@ plainto_tsquery('simple', ${q.trim()})`);

  if (categorySlug) {
    const cat = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, categorySlug))
      .limit(1);
    if (cat[0]) conditions.push(eq(listings.categoryId, cat[0].id));
  }

  const where   = conditions.length === 1 ? conditions[0] : and(...conditions);
  const orderBy =
    sort === "price_asc"  ? asc(listings.priceCents)  :
    sort === "price_desc" ? desc(listings.priceCents) :
    desc(listings.createdAt);
  const offset = (page - 1) * LISTINGS_PER_PAGE;

  const cols = {
    id:            listings.id,
    title:         listings.title,
    priceCents:    listings.priceCents,
    currency:      listings.currency,
    city:          listings.city,
    district:      listings.district,
    images:        listings.images,
    createdAt:     listings.createdAt,
    featuredUntil: listings.featuredUntil,
    categorySlug:  categories.slug,
    categoryName:  categories.nameLv,
  };

  const [rows, totals] = await Promise.all([
    db.select(cols).from(listings)
      .leftJoin(categories, eq(listings.categoryId, categories.id))
      .where(where).orderBy(orderBy).limit(LISTINGS_PER_PAGE).offset(offset),
    db.select({ total: count() }).from(listings)
      .leftJoin(categories, eq(listings.categoryId, categories.id))
      .where(where),
  ]);

  const total      = Number(totals[0]?.total ?? 0);
  const totalPages = Math.ceil(total / LISTINGS_PER_PAGE);
  return { listings: rows as ListingRow[], total, totalPages };
}

export async function getListingById(id: number): Promise<ListingDetail | null> {
  const rows = await db
    .select({
      id:            listings.id,
      title:         listings.title,
      description:   listings.description,
      priceCents:    listings.priceCents,
      currency:      listings.currency,
      negotiable:    listings.negotiable,
      city:          listings.city,
      district:      listings.district,
      lat:           listings.lat,
      lng:           listings.lng,
      images:        listings.images,
      attrs:         listings.attrs,
      status:        listings.status,
      views:         listings.views,
      featuredUntil: listings.featuredUntil,
      createdAt:     listings.createdAt,
      expiresAt:     listings.expiresAt,
      category: {
        id:          categories.id,
        slug:        categories.slug,
        nameLv:      categories.nameLv,
        attrsSchema: categories.attrsSchema,
      },
      seller: {
        id:        user.id,
        name:      user.name,
        phone:     user.phone,
        createdAt: user.createdAt,
      },
    })
    .from(listings)
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .leftJoin(user, eq(listings.userId, user.id))
    .where(eq(listings.id, id))
    .limit(1);

  if (!rows[0]) return null;

  db.update(listings)
    .set({ views: sql`${listings.views} + 1` })
    .where(eq(listings.id, id))
    .catch(() => {});

  return rows[0] as unknown as ListingDetail;
}

export async function getSimilarListings(
  categoryId: number, excludeId: number,
): Promise<ListingRow[]> {
  return db
    .select({
      id:            listings.id,
      title:         listings.title,
      priceCents:    listings.priceCents,
      currency:      listings.currency,
      city:          listings.city,
      district:      listings.district,
      images:        listings.images,
      createdAt:     listings.createdAt,
      featuredUntil: listings.featuredUntil,
      categorySlug:  categories.slug,
      categoryName:  categories.nameLv,
    })
    .from(listings)
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .where(and(
      eq(listings.status, "active"),
      eq(listings.categoryId, categoryId),
      sql`${listings.id} != ${excludeId}`,
    ))
    .orderBy(desc(listings.createdAt))
    .limit(6) as Promise<ListingRow[]>;
}

export async function getRecentListings(limit = 8): Promise<ListingRow[]> {
  return db
    .select({
      id:            listings.id,
      title:         listings.title,
      priceCents:    listings.priceCents,
      currency:      listings.currency,
      city:          listings.city,
      district:      listings.district,
      images:        listings.images,
      createdAt:     listings.createdAt,
      featuredUntil: listings.featuredUntil,
      categorySlug:  categories.slug,
      categoryName:  categories.nameLv,
    })
    .from(listings)
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .where(eq(listings.status, "active"))
    .orderBy(desc(listings.createdAt))
    .limit(limit) as Promise<ListingRow[]>;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories() {
  return db.select().from(categories).orderBy(categories.sort);
}

export async function getCategoryBySlug(slug: string) {
  const rows = await db
    .select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getCategoryCounts(): Promise<Record<number, number>> {
  const rows = await db
    .select({ categoryId: listings.categoryId, total: count() })
    .from(listings)
    .where(eq(listings.status, "active"))
    .groupBy(listings.categoryId);
  return Object.fromEntries(rows.map((r) => [r.categoryId, Number(r.total)]));
}

// ─── User dashboard ───────────────────────────────────────────────────────────

export async function getUserListings(userId: string) {
  return db
    .select({
      id:           listings.id,
      title:        listings.title,
      priceCents:   listings.priceCents,
      currency:     listings.currency,
      city:         listings.city,
      images:       listings.images,
      status:       listings.status,
      views:        listings.views,
      createdAt:    listings.createdAt,
      expiresAt:    listings.expiresAt,
      categoryName: categories.nameLv,
    })
    .from(listings)
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .where(eq(listings.userId, userId))
    .orderBy(desc(listings.createdAt));
}
