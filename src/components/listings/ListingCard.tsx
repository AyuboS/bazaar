"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { formatPrice, timeAgo, isFeatured, listingUrl } from "@/lib/utils";
import type { ListingRow } from "@/db/queries";

type Props = { listing: ListingRow; priority?: boolean };

export function ListingCard({ listing, priority = false }: Props) {
  const featured   = isFeatured(listing.featuredUntil);
  const hasImages  = listing.images.length > 0;
  const imageCount = listing.images.length;

  return (
    <Link
      href={listingUrl(listing.id, listing.title)}
      className="group block bg-white rounded-xl border border-[#E8E6DF] overflow-hidden hover:border-[#C9C6BC] hover:shadow-sm transition-all duration-200"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-[#F3F2EE] overflow-hidden">
        {hasImages ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#C9C6BC]">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        )}

        {featured && (
          <div className="absolute top-2 left-2 bg-[#B8651E] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            TOP
          </div>
        )}

        {imageCount > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
            1 / {imageCount}
          </div>
        )}

        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
          aria-label="Pievienot izlasei"
        >
          <Heart size={13} className="text-[#0A0A0A]" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-[15px] font-semibold tracking-tight leading-none mb-1">
          {formatPrice(listing.priceCents, listing.currency)}
        </div>
        <p className="text-[13px] leading-snug line-clamp-2 mb-2">{listing.title}</p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#6B6B68] truncate max-w-[60%]">
            {listing.district ? `${listing.city}, ${listing.district}` : listing.city}
          </span>
          <span className="text-[11px] text-[#9C9A92] shrink-0">{timeAgo(listing.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E8E6DF] overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-[#F3F2EE]" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-1/2 bg-[#F3F2EE] rounded" />
        <div className="h-3 w-3/4 bg-[#F3F2EE] rounded" />
        <div className="h-3 w-1/3 bg-[#F3F2EE] rounded" />
      </div>
    </div>
  );
}
