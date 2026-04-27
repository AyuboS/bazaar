import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { QuickChips } from "@/components/home/QuickChips";
import { PopularSearches } from "@/components/home/PopularSearches";
import { AppBanner } from "@/components/home/AppBanner";
import { LatestListings } from "@/components/home/LatestListings";
import { ListingCard } from "@/components/listings/ListingCard";
import {
  getRootCategories,
  getRootCategoryCounts,
  getRecentListings,
  getFeaturedListings,
} from "@/db/queries";

export const metadata: Metadata = { title: "Pērc. Pārdod. Mainies." };
export const revalidate = 60;

export default async function HomePage() {
  const [categories, counts, recent, featured] = await Promise.all([
    getRootCategories(),
    getRootCategoryCounts(),
    getRecentListings(12),
    getFeaturedListings(10),
  ]);

  return (
    <>
      <Navbar />

      {/* Category grid strip */}
      <section className="bg-white border-b border-[#E8E6DF]">
        <div className="max-w-[1200px] mx-auto px-5 py-7">
          <h2
            className="text-[#0A0A0A] mb-[18px]"
            style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px" }}
          >
            Pārlūko kategorijas
          </h2>
          <CategoryGrid categories={categories} counts={counts} />
        </div>
      </section>

      {/* Quick filter chips */}
      <QuickChips />

      {/* TOP / featured listings */}
      {featured.length > 0 && (
        <section className="pt-9">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-[2px]"
                  style={{ width: 4, height: 20, background: "#B8651E" }}
                />
                <h2
                  className="text-[#0A0A0A]"
                  style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px" }}
                >
                  TOP sludinājumi
                </h2>
                <span
                  className="text-[#B8651E]"
                  style={{
                    padding: "2px 8px",
                    background: "#FEF3E7",
                    border: "1px solid rgba(184,101,30,0.3)",
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  TOP
                </span>
              </div>
              <Link
                href="/browse"
                className="flex items-center gap-1 text-[#B8651E] hover:underline"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                Skatīt visus <ArrowRight size={14} />
              </Link>
            </div>
            <div className="hscroll pb-2">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} wide />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest listings */}
      <LatestListings listings={recent} />

      <PopularSearches />
      <AppBanner />
      <Footer />
    </>
  );
}
