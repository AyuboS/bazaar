import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSidebar } from "@/components/listings/FilterSidebar";
import { ListingGrid, ListingGridSkeleton } from "@/components/listings/ListingGrid";
import { getListings, getCategoryBySlug } from "@/db/queries";
import type { SortOption } from "@/lib/constants";

type SP = { cat?: string; city?: string; priceMin?: string; priceMax?: string; q?: string; sort?: string; page?: string; withPhoto?: string };
type Props = { searchParams: SP };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const category = searchParams.cat ? await getCategoryBySlug(searchParams.cat) : null;
  const title = [searchParams.q && `"${searchParams.q}"`, category?.nameLv, searchParams.city, "Sludinājumi"]
    .filter(Boolean).join(" — ");
  return { title: title || "Sludinājumi" };
}

export default async function BrowsePage({ searchParams }: Props) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const sort = (searchParams.sort as SortOption) ?? "newest";

  const [{ listings, total, totalPages }, category] = await Promise.all([
    getListings({
      categorySlug: searchParams.cat,
      city:         searchParams.city,
      priceMin:     searchParams.priceMin ? parseFloat(searchParams.priceMin) : undefined,
      priceMax:     searchParams.priceMax ? parseFloat(searchParams.priceMax) : undefined,
      q:            searchParams.q,
      sort, page,
      withPhoto:    searchParams.withPhoto === "1",
    }),
    searchParams.cat ? getCategoryBySlug(searchParams.cat) : null,
  ]);

  const heading = searchParams.q ? `Meklēšana: "${searchParams.q}"` : category?.nameLv ?? searchParams.city ?? "Visi sludinājumi";

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <h1 className="text-xl font-semibold tracking-tight mb-6">{heading}</h1>
        <div className="flex gap-8">
          <Suspense fallback={null}><FilterSidebar /></Suspense>
          <div className="flex-1 min-w-0">
            <Suspense key={JSON.stringify(searchParams)} fallback={<ListingGridSkeleton />}>
              <ListingGrid
                listings={listings} total={total} totalPages={totalPages} page={page}
                searchParams={searchParams as Record<string, string | undefined>}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
