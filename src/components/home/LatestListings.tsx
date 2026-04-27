"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ListingCard } from "@/components/listings/ListingCard";
import type { ListingRow } from "@/db/queries";

type Props = { listings: ListingRow[] };

const FILTERS = ["Visi", "Šodien", "Vakar"] as const;
type Filter = (typeof FILTERS)[number];

function isSameDay(date: Date | string, reference: Date) {
  const d = new Date(date);
  return (
    d.getFullYear() === reference.getFullYear() &&
    d.getMonth() === reference.getMonth() &&
    d.getDate() === reference.getDate()
  );
}

export function LatestListings({ listings }: Props) {
  const [filter, setFilter] = useState<Filter>("Visi");

  const filtered = listings.filter((l) => {
    if (filter === "Šodien") {
      return isSameDay(l.createdAt, new Date());
    }
    if (filter === "Vakar") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return isSameDay(l.createdAt, yesterday);
    }
    return true;
  });

  return (
    <section className="py-9">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="rounded-[2px]"
              style={{ width: 4, height: 20, background: "#0A0A0A" }}
            />
            <h2
              className="text-[#0A0A0A]"
              style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px" }}
            >
              Jaunākie sludinājumi
            </h2>
            {filtered.length > 0 && (
              <span className="text-[#6B6B68]" style={{ fontSize: 12 }}>
                {filtered.length} sludinājumi
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-[5px] rounded-[6px] text-[12px] cursor-pointer transition-all duration-150 whitespace-nowrap"
                style={{
                  background: filter === f ? "#0A0A0A" : "none",
                  border: `1px solid ${filter === f ? "#0A0A0A" : "#E8E6DF"}`,
                  fontWeight: filter === f ? 600 : 400,
                  color: filter === f ? "#FFFFFF" : "#6B6B68",
                }}
              >
                {f}
              </button>
            ))}
            <Link
              href="/browse"
              className="hidden md:flex items-center gap-1 text-[#B8651E] hover:underline"
              style={{ fontSize: 13, fontWeight: 600, marginLeft: 6 }}
            >
              Skatīt visus <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-[#6B6B68] text-sm py-8 text-center">
            {filter === "Visi"
              ? "Pagaidām nav sludinājumu. Esi pirmais!"
              : "Nav sludinājumu šajā periodā."}
          </p>
        ) : (
          <div className="ads-grid">
            {filtered.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} priority={i < 4} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/browse"
            className="flex items-center gap-2 border-[1.5px] border-[#0A0A0A] rounded-[8px] px-8 py-3 text-[14px] font-semibold text-[#0A0A0A] transition-all duration-150 hover:bg-[#F3F2EE]"
          >
            Rādīt vairāk sludinājumus <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
