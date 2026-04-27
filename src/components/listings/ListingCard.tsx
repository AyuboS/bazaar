"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPrice, timeAgo, isFeatured, listingUrl } from "@/lib/utils";
import type { ListingRow } from "@/db/queries";

type Props = { listing: ListingRow; priority?: boolean; wide?: boolean };

export function ListingCard({ listing, priority = false, wide = false }: Props) {
  const [saved, setSaved] = useState(false);
  const featured          = isFeatured(listing.featuredUntil);
  const hasImages         = listing.images.length > 0;

  return (
    <Link
      href={listingUrl(listing.id, listing.title)}
      className={`listing-card group block bg-white overflow-hidden${wide ? " flex min-w-[260px] max-w-[300px] flex-shrink-0" : ""}`}
      style={{
        borderRadius: 10,
        border: `1.5px solid ${featured ? "#B8651E" : "#E8E6DF"}`,
        boxShadow: featured
          ? "0 2px 16px rgba(184,101,30,0.10)"
          : "0 1px 4px rgba(10,10,10,0.05)",
      }}
    >
      {/* Image */}
      <div
        className="relative bg-[#F3F2EE] overflow-hidden flex-shrink-0"
        style={{ height: wide ? "100%" : 150, minHeight: wide ? 160 : undefined, width: wide ? 120 : "100%" }}
      >
        {hasImages ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <svg width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
            <rect width="200" height="150" fill="#F3F2EE"/>
            {[0,1,2,3,4,5].map((i) => (
              <line key={i} x1={i*36-10} y1="0" x2={i*36+130} y2="150" stroke="rgba(10,10,10,0.05)" strokeWidth="1.2"/>
            ))}
            <text x="100" y="78" textAnchor="middle" dy="0.35em" fontFamily="monospace" fontSize="10" fill="rgba(10,10,10,0.25)">foto</text>
          </svg>
        )}

        {featured && (
          <div
            className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 tracking-[0.04em]"
            style={{ background: "#B8651E", borderRadius: 4 }}
          >
            TOP
          </div>
        )}

        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setSaved((s) => !s); }}
          className="absolute top-2 right-2 flex items-center justify-center hover:bg-white transition-colors"
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            border: "none", cursor: "pointer",
          }}
          aria-label="Pievienot izlasei"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill={saved ? "#E24B4A" : "none"}>
            <path
              d="M10 16C10 16 3 11 3 6.5C3 4.5 4.8 3 7 3C8.2 3 9.3 3.6 10 4.5C10.7 3.6 11.8 3 13 3C15.2 3 17 4.5 17 6.5C17 11 10 16 10 16Z"
              stroke={saved ? "#E24B4A" : "#6B6B68"}
              strokeWidth="1.6"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "11px 13px" }}>
        {listing.categoryName && (
          <div className="text-[11px] text-[#6B6B68] mb-1">{listing.categoryName}</div>
        )}
        <p className="text-[13px] font-semibold text-[#0A0A0A] leading-[1.35] mb-2 line-clamp-2">
          {listing.title}
        </p>
        <div
          className="text-[#0A0A0A] mb-2"
          style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}
        >
          {formatPrice(listing.priceCents, listing.currency)}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-[#6B6B68]">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6.7 2 4 4.7 4 8C4 12.8 10 19 10 19C10 19 16 12.8 16 8C16 4.7 13.3 2 10 2Z" stroke="#6B6B68" strokeWidth="1.6" fill="none"/>
              <circle cx="10" cy="8" r="2.5" stroke="#6B6B68" strokeWidth="1.5" fill="none"/>
            </svg>
            <span className="truncate max-w-[80px]">
              {listing.district ? `${listing.city}, ${listing.district}` : listing.city}
            </span>
          </div>
          <span className="text-[10px] flex-shrink-0" style={{ color: "#9A9A96" }}>
            {timeAgo(listing.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ListingCardSkeleton() {
  return (
    <div
      className="bg-white overflow-hidden animate-pulse"
      style={{ borderRadius: 10, border: "1.5px solid #E8E6DF" }}
    >
      <div className="bg-[#F3F2EE]" style={{ height: 150 }} />
      <div className="space-y-2" style={{ padding: "11px 13px" }}>
        <div className="h-3 w-1/3 bg-[#F3F2EE] rounded" />
        <div className="h-4 w-3/4 bg-[#F3F2EE] rounded" />
        <div className="h-5 w-1/2 bg-[#F3F2EE] rounded" />
        <div className="h-3 w-2/3 bg-[#F3F2EE] rounded" />
      </div>
    </div>
  );
}
