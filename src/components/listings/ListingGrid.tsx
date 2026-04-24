import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ListingCard, ListingCardSkeleton } from "@/components/listings/ListingCard";
import { formatNumber } from "@/lib/utils";
import type { ListingRow } from "@/db/queries";

type Props = {
  listings:     ListingRow[];
  total:        number;
  totalPages:   number;
  page:         number;
  searchParams: Record<string, string | undefined>;
};

export function ListingGrid({ listings, total, totalPages, page, searchParams }: Props) {
  function pageUrl(p: number) {
    const params = new URLSearchParams(
      Object.entries(searchParams).filter((e): e is [string, string] => e[1] != null),
    );
    params.set("page", String(p));
    return `/browse?${params.toString()}`;
  }

  return (
    <div>
      <p className="text-sm text-[#6B6B68] mb-4">
        <span className="text-[#0A0A0A] font-medium">{formatNumber(total)}</span>{" "}
        sludinājum{total === 1 ? "s" : "i"}
      </p>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#C9C6BC] mb-4">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-[#6B6B68] font-medium mb-1">Nav atrasts neviens sludinājums</p>
          <p className="text-sm text-[#9C9A92]">Mēģini mainīt meklēšanas filtrus</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {listings.map((l, i) => <ListingCard key={l.id} listing={l} priority={i < 4} />)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-10">
          <PaginationLink href={page > 1 ? pageUrl(page - 1) : null}><ChevronLeft size={16} /></PaginationLink>
          {buildPages(page, totalPages).map((item, i) =>
            item === "…" ? (
              <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-[#9C9A92]">…</span>
            ) : (
              <PaginationLink key={item} href={pageUrl(item as number)} active={item === page}>{item}</PaginationLink>
            ),
          )}
          <PaginationLink href={page < totalPages ? pageUrl(page + 1) : null}><ChevronRight size={16} /></PaginationLink>
        </div>
      )}
    </div>
  );
}

function PaginationLink({ href, active = false, children }: {
  href: string | null; active?: boolean; children: React.ReactNode;
}) {
  const base = "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors";
  if (!href) return <span className={`${base} text-[#C9C6BC] cursor-not-allowed`}>{children}</span>;
  return (
    <Link href={href} className={`${base} ${active ? "bg-[#0A0A0A] text-white" : "hover:bg-[#F3F2EE] text-[#3A3A37]"}`}>
      {children}
    </Link>
  );
}

function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export function ListingGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, i) => <ListingCardSkeleton key={i} />)}
    </div>
  );
}
