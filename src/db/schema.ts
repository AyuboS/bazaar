import {
  pgTable, text, integer, bigint, timestamp, jsonb, boolean,
  index, uniqueIndex, varchar, pgEnum, serial,
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const listingStatus = pgEnum("listing_status", [
  "draft", "active", "sold", "expired", "hidden", "banned",
]);

// ─── Users ───────────────────────────────────────────────────────────────────

export const user = pgTable("user", {
  id:            text("id").primaryKey(),
  name:          text("name"),
  email:         text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image:         text("image"),
  phone:         text("phone"),
  createdAt:     timestamp("created_at").defaultNow().notNull(),
  updatedAt:     timestamp("updated_at").defaultNow().notNull(),
});

// ─── Better Auth tables ───────────────────────────────────────────────────────

export const session = pgTable("session", {
  id:          text("id").primaryKey(),
  expiresAt:   timestamp("expires_at").notNull(),
  token:       text("token").notNull().unique(),
  createdAt:   timestamp("created_at").defaultNow().notNull(),
  updatedAt:   timestamp("updated_at").defaultNow().notNull(),
  ipAddress:   text("ip_address"),
  userAgent:   text("user_agent"),
  userId:      text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id:                     text("id").primaryKey(),
  accountId:              text("account_id").notNull(),
  providerId:             text("provider_id").notNull(),
  userId:                 text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken:            text("access_token"),
  refreshToken:           text("refresh_token"),
  idToken:                text("id_token"),
  accessTokenExpiresAt:   timestamp("access_token_expires_at"),
  refreshTokenExpiresAt:  timestamp("refresh_token_expires_at"),
  scope:                  text("scope"),
  password:               text("password"),
  createdAt:              timestamp("created_at").defaultNow().notNull(),
  updatedAt:              timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id:         text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value:      text("value").notNull(),
  expiresAt:  timestamp("expires_at").notNull(),
  createdAt:  timestamp("created_at").defaultNow().notNull(),
  updatedAt:  timestamp("updated_at").defaultNow().notNull(),
});

// ─── Category schema type ─────────────────────────────────────────────────────

export type CategorySchema = {
  fields: Array<
    | { key: string; type: "number"; label: string; unit?: string; required?: boolean }
    | { key: string; type: "text";   label: string; required?: boolean }
    | { key: string; type: "select"; label: string; required?: boolean; options: Array<{ value: string; label: string }> }
    | { key: string; type: "multi";  label: string; options: Array<{ value: string; label: string }> }
    | { key: string; type: "bool";   label: string }
  >;
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories = pgTable("categories", {
  id:          serial("id").primaryKey(),
  parentId:    integer("parent_id"),
  slug:        varchar("slug", { length: 64 }).notNull().unique(),
  nameLv:      text("name_lv").notNull(),
  nameRu:      text("name_ru").notNull(),
  nameEn:      text("name_en").notNull(),
  attrsSchema: jsonb("attrs_schema").$type<CategorySchema>().notNull(),
  sort:        integer("sort").default(0).notNull(),
}, (t) => ({
  parentIdx: index("categories_parent_idx").on(t.parentId),
}));

// ─── Listings ─────────────────────────────────────────────────────────────────

export const listings = pgTable("listings", {
  id:            serial("id").primaryKey(),
  userId:        text("user_id").notNull().references(() => user.id),
  categoryId:    integer("category_id").notNull().references(() => categories.id),
  title:         text("title").notNull(),
  description:   text("description").notNull(),
  priceCents:    bigint("price_cents", { mode: "number" }),
  currency:      varchar("currency", { length: 3 }).default("EUR").notNull(),
  negotiable:    boolean("negotiable").default(false).notNull(),
  city:          varchar("city", { length: 64 }).notNull(),
  district:      varchar("district", { length: 64 }),
  lat:           text("lat"),
  lng:           text("lng"),
  images:        text("images").array().$type<string[]>().default([]).notNull(),
  attrs:         jsonb("attrs").$type<Record<string, unknown>>().default({}).notNull(),
  status:        listingStatus("status").default("active").notNull(),
  featuredUntil: timestamp("featured_until"),
  views:         integer("views").default(0).notNull(),
  // Managed via raw SQL — Drizzle must not drop this column
  searchVector:  text("search_vector"),
  createdAt:     timestamp("created_at").defaultNow().notNull(),
  updatedAt:     timestamp("updated_at").defaultNow().notNull(),
  expiresAt:     timestamp("expires_at").notNull(),
}, (t) => ({
  catCityIdx: index("listings_cat_city_idx").on(t.categoryId, t.city, t.status),
  createdIdx: index("listings_created_idx").on(t.createdAt),
  priceIdx:   index("listings_price_idx").on(t.priceCents),
  userIdx:    index("listings_user_idx").on(t.userId),
  attrsGin:   index("listings_attrs_gin").using("gin", t.attrs),
}));

// ─── Saved searches ───────────────────────────────────────────────────────────

export const savedSearches = pgTable("saved_searches", {
  id:             serial("id").primaryKey(),
  userId:         text("user_id").notNull().references(() => user.id),
  name:           text("name").notNull(),
  queryJson:      jsonb("query_json").notNull(),
  notifyEmail:    boolean("notify_email").default(true).notNull(),
  lastNotifiedAt: timestamp("last_notified_at"),
  createdAt:      timestamp("created_at").defaultNow().notNull(),
});

// ─── Favourites ───────────────────────────────────────────────────────────────

export const favorites = pgTable("favorites", {
  userId:    text("user_id").notNull().references(() => user.id),
  listingId: integer("listing_id").notNull().references(() => listings.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  pk: uniqueIndex("favorites_pk").on(t.userId, t.listingId),
}));

// ─── Conversations ────────────────────────────────────────────────────────────

export const conversations = pgTable("conversations", {
  id:            serial("id").primaryKey(),
  listingId:     integer("listing_id").notNull().references(() => listings.id, { onDelete: "cascade" }),
  buyerId:       text("buyer_id").notNull().references(() => user.id),
  sellerId:      text("seller_id").notNull().references(() => user.id),
  createdAt:     timestamp("created_at").defaultNow().notNull(),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
}, (t) => ({
  listingBuyerUniq: uniqueIndex("conversations_listing_buyer_uniq").on(t.listingId, t.buyerId),
  buyerIdx:         index("conversations_buyer_idx").on(t.buyerId),
  sellerIdx:        index("conversations_seller_idx").on(t.sellerId),
}));

// ─── Messages ─────────────────────────────────────────────────────────────────

export const messages = pgTable("messages", {
  id:             serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  senderId:       text("sender_id").notNull().references(() => user.id),
  receiverId:     text("receiver_id").notNull().references(() => user.id),
  listingId:      integer("listing_id").notNull().references(() => listings.id),
  body:           text("body").notNull(),
  createdAt:      timestamp("created_at").defaultNow().notNull(),
  readAt:         timestamp("read_at"),
}, (t) => ({
  convIdx:   index("messages_conv_idx").on(t.conversationId, t.createdAt),
  senderIdx: index("messages_sender_idx").on(t.senderId),
}));
