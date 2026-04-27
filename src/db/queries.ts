import { db } from "@/db/index";
import { listings, categories, user, conversations, messages } from "@/db/schema";
import {
  eq, and, gte, lte, desc, asc, sql, count, or, inArray, isNull,
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
      .select({ id: categories.id, parentId: categories.parentId })
      .from(categories)
      .where(eq(categories.slug, categorySlug))
      .limit(1);
    if (cat[0]) {
      if (!cat[0].parentId) {
        // Root category — include all children
        const children = await db
          .select({ id: categories.id })
          .from(categories)
          .where(eq(categories.parentId, cat[0].id));
        const ids = [cat[0].id, ...children.map((c) => c.id)];
        conditions.push(ids.length === 1 ? eq(listings.categoryId, ids[0]) : inArray(listings.categoryId, ids));
      } else {
        conditions.push(eq(listings.categoryId, cat[0].id));
      }
    }
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

export async function getFeaturedListings(limit = 10): Promise<ListingRow[]> {
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
      gte(listings.featuredUntil, new Date()),
    ))
    .orderBy(desc(listings.featuredUntil))
    .limit(limit) as Promise<ListingRow[]>;
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

// Counts aggregated to root level (child counts bubble up to their parent)
export async function getRootCategoryCounts(): Promise<Record<number, number>> {
  const rows = await db
    .select({
      rootId: sql<number>`COALESCE(${categories.parentId}, ${categories.id})`,
      total:  count(),
    })
    .from(listings)
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .where(eq(listings.status, "active"))
    .groupBy(sql`COALESCE(${categories.parentId}, ${categories.id})`);
  return Object.fromEntries(rows.map((r) => [r.rootId, Number(r.total)]));
}

export async function getRootCategories() {
  return db.select().from(categories).where(isNull(categories.parentId)).orderBy(categories.sort);
}

export async function getSubcategories(parentId: number) {
  return db.select().from(categories).where(eq(categories.parentId, parentId)).orderBy(categories.sort);
}

export type CategoryGrouped = {
  id:       number;
  slug:     string;
  nameLv:   string;
  children: Array<{ id: number; slug: string; nameLv: string }>;
};

export async function getAllCategoriesGrouped(): Promise<CategoryGrouped[]> {
  const all = await db
    .select({ id: categories.id, parentId: categories.parentId, slug: categories.slug, nameLv: categories.nameLv })
    .from(categories)
    .orderBy(categories.sort);

  const roots    = all.filter((c) => !c.parentId);
  const byParent = new Map<number, typeof all>();
  for (const c of all) {
    if (c.parentId) {
      if (!byParent.has(c.parentId)) byParent.set(c.parentId, []);
      byParent.get(c.parentId)!.push(c);
    }
  }
  return roots.map((root) => ({ ...root, children: byParent.get(root.id) ?? [] }));
}

export type CategoryFamily = {
  category: typeof categories.$inferSelect;
  parent:   typeof categories.$inferSelect | null;
  children: typeof categories.$inferSelect[];
  isRoot:   boolean;
};

export async function getCategoryFamily(slug: string): Promise<CategoryFamily | null> {
  const rows = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  const cat  = rows[0];
  if (!cat) return null;

  if (cat.parentId) {
    const [parentRows, siblings] = await Promise.all([
      db.select().from(categories).where(eq(categories.id, cat.parentId)).limit(1),
      db.select().from(categories).where(eq(categories.parentId, cat.parentId)).orderBy(categories.sort),
    ]);
    return { category: cat, parent: parentRows[0] ?? null, children: siblings, isRoot: false };
  }

  const children = await db.select().from(categories).where(eq(categories.parentId, cat.id)).orderBy(categories.sort);
  return { category: cat, parent: null, children, isRoot: true };
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

export type UserListing = Awaited<ReturnType<typeof getUserListings>>[number];

// ─── Conversations ────────────────────────────────────────────────────────────

const buyerUser  = db.$with("buyerUser").as(db.select().from(user));
const sellerUser = db.$with("sellerUser").as(db.select().from(user));

export async function getUserConversations(userId: string) {
  const rows = await db
    .select({
      id:              conversations.id,
      listingId:       conversations.listingId,
      buyerId:         conversations.buyerId,
      sellerId:        conversations.sellerId,
      lastMessageAt:   conversations.lastMessageAt,
      listingTitle:    listings.title,
      listingImage:    sql<string | null>`${listings.images}[1]`,
      buyerName:       sql<string | null>`buyer.name`,
      sellerName:      sql<string | null>`seller.name`,
      unreadCount:     sql<number>`
        (SELECT COUNT(*) FROM messages m
         WHERE m.conversation_id = ${conversations.id}
           AND m.receiver_id = ${userId}
           AND m.read_at IS NULL)
      `.mapWith(Number),
      lastBody:        sql<string | null>`
        (SELECT body FROM messages m
         WHERE m.conversation_id = ${conversations.id}
         ORDER BY m.created_at DESC LIMIT 1)
      `,
    })
    .from(conversations)
    .innerJoin(listings, eq(conversations.listingId, listings.id))
    .innerJoin(sql`"user" buyer`, sql`buyer.id = ${conversations.buyerId}`)
    .innerJoin(sql`"user" seller`, sql`seller.id = ${conversations.sellerId}`)
    .where(or(eq(conversations.buyerId, userId), eq(conversations.sellerId, userId)))
    .orderBy(desc(conversations.lastMessageAt));
  return rows;
}

export type ConversationRow = Awaited<ReturnType<typeof getUserConversations>>[number];

export async function getConversationById(id: number) {
  const rows = await db
    .select({
      id:            conversations.id,
      listingId:     conversations.listingId,
      buyerId:       conversations.buyerId,
      sellerId:      conversations.sellerId,
      listingTitle:  listings.title,
      listingImage:  sql<string | null>`${listings.images}[1]`,
      listingCity:   listings.city,
      buyerName:     sql<string | null>`buyer.name`,
      sellerName:    sql<string | null>`seller.name`,
    })
    .from(conversations)
    .innerJoin(listings, eq(conversations.listingId, listings.id))
    .innerJoin(sql`"user" buyer`, sql`buyer.id = ${conversations.buyerId}`)
    .innerJoin(sql`"user" seller`, sql`seller.id = ${conversations.sellerId}`)
    .where(eq(conversations.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export type ConversationDetail = Awaited<ReturnType<typeof getConversationById>>;

export async function getConversationMessages(conversationId: number) {
  return db
    .select({
      id:         messages.id,
      senderId:   messages.senderId,
      receiverId: messages.receiverId,
      body:       messages.body,
      createdAt:  messages.createdAt,
      readAt:     messages.readAt,
      senderName: sql<string | null>`"user".name`,
    })
    .from(messages)
    .innerJoin(user, eq(messages.senderId, user.id))
    .where(eq(messages.conversationId, conversationId))
    .orderBy(asc(messages.createdAt));
}

export type MessageRow = Awaited<ReturnType<typeof getConversationMessages>>[number];
