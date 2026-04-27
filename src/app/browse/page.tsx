import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSidebar } from "@/components/listings/FilterSidebar";
import { FilterChips } from "@/components/listings/FilterChips";
import { ListingGrid, ListingGridSkeleton } from "@/components/listings/ListingGrid";
import { getListings, getCategoryFamily } from "@/db/queries";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/lib/constants";

type SP = { cat?: string; city?: string; priceMin?: string; priceMax?: string; q?: string; sort?: string; page?: string; withPhoto?: string };
type Props = { searchParams: Promise<SP> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp     = await searchParams;
  const family = sp.cat ? await getCategoryFamily(sp.cat) : null;
  const title  = [sp.q && `"${sp.q}"`, family?.category.nameLv, sp.city, "Sludinājumi"]
    .filter(Boolean).join(" — ");
  return { title: title || "Sludinājumi" };
}

export default async function BrowsePage({ searchParams }: Props) {
  const sp   = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const sort = (sp.sort as SortOption) ?? "newest";

  const [{ listings, total, totalPages }, family] = await Promise.all([
    getListings({
      categorySlug: sp.cat,
      city:         sp.city,
      priceMin:     sp.priceMin ? parseFloat(sp.priceMin) : undefined,
      priceMax:     sp.priceMax ? parseFloat(sp.priceMax) : undefined,
      q:            sp.q,
      sort, page,
      withPhoto:    sp.withPhoto === "1",
    }),
    sp.cat ? getCategoryFamily(sp.cat) : null,
  ]);

  const category = family?.category;
  const heading  = sp.q ? `Meklēšana: "${sp.q}"` : category?.nameLv ?? sp.city ?? "Visi sludinājumi";
  const spRecord = sp as Record<string, string | undefined>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">

        {/* Breadcrumb for subcategory */}
        {family && !family.isRoot && family.parent && (
          <div className="flex items-center gap-1.5 text-xs text-[#6B6B68] mb-2">
            <Link href={`/browse?cat=${family.parent.slug}`} className="hover:text-[#B8651E] transition-colors">
              {family.parent.nameLv}
            </Link>
            <span>/</span>
            <span className="text-[#0A0A0A] font-medium">{category?.nameLv}</span>
          </div>
        )}

        <h1 className="text-xl font-semibold tracking-tight mb-2">{heading}</h1>

        {/* Subcategory chips — shown when browsing a root category */}
        {family && family.isRoot && family.children.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {family.children.map((sub) => (
              <Link key={sub.id} href={`/browse?cat=${sub.slug}`}
                className="shrink-0 px-3 py-1 rounded-full text-xs font-medium border border-[#E8E6DF] bg-white hover:border-[#C9C6BC] hover:bg-[#FAFAF7] transition-colors whitespace-nowrap">
                {sub.nameLv}
              </Link>
            ))}
          </div>
        )}

        {/* Sibling chips — shown when browsing a subcategory */}
        {family && !family.isRoot && family.children.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            <Link href={`/browse?cat=${family.parent?.slug}`}
              className="shrink-0 px-3 py-1 rounded-full text-xs font-medium border border-[#E8E6DF] bg-white hover:border-[#C9C6BC] transition-colors whitespace-nowrap">
              Visi
            </Link>
            {family.children.map((sib) => (
              <Link key={sib.id} href={`/browse?cat=${sib.slug}`}
                className={cn(
                  "shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                  sib.slug === sp.cat
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "border-[#E8E6DF] bg-white hover:border-[#C9C6BC] hover:bg-[#FAFAF7]",
                )}>
                {sib.nameLv}
              </Link>
            ))}
          </div>
        )}

        <Suspense fallback={null}>
          <FilterChips searchParams={spRecord} />
        </Suspense>

        <div className="flex gap-8 mt-4">
          <Suspense fallback={null}><FilterSidebar /></Suspense>
          <div className="flex-1 min-w-0">
            {total === 0 ? (
              <NoResults q={sp.q} />
            ) : (
              <Suspense key={JSON.stringify(sp)} fallback={<ListingGridSkeleton />}>
                <ListingGrid
                  listings={listings} total={total} totalPages={totalPages} page={page}
                  searchParams={spRecord}
                />
              </Suspense>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function NoResults({ q }: { q?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#C9C6BC] mb-4">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <p className="text-[#6B6B68] font-medium mb-1">
        {q ? `Nav rezultātu priekš "${q}"` : "Nav atrasts neviens sludinājums"}
      </p>
      <p className="text-sm text-[#9C9A92] mb-6">Mēģini citu meklēšanas vārdu vai maini filtrus</p>
      <div className="flex flex-wrap gap-2 justify-center text-sm">
        <span className="text-[#6B6B68]">Populāras kategorijas:</span>
        {[
          ["nekustamais-ipasums", "Nekustamais īpašums"],
          ["transports", "Transports"],
          ["elektronika", "Elektronika"],
        ].map(([slug, label]) => (
          <a key={slug} href={`/browse?cat=${slug}`} className="text-[#B8651E] hover:underline">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
