import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ListingCard } from "@/components/listings/ListingCard";
import { getCategories, getCategoryCounts, getRecentListings } from "@/db/queries";

export const metadata: Metadata = { title: "Sludinājumi Latvijā" };
export const revalidate = 60;

export default async function HomePage() {
  const [categories, counts, recent] = await Promise.all([
    getCategories(),
    getCategoryCounts(),
    getRecentListings(8),
  ]);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-12">

        {/* Hero */}
        <section className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Atrodi vai pārdod — vienkārši
          </h1>
          <p className="text-[#6B6B68] text-lg mb-6 max-w-md mx-auto">
            Bezmaksas sludinājumi Latvijā. Nekustamais īpašums, transports, elektronika un vēl vairāk.
          </p>
          <Link href="/post" className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#3A3A37] transition-colors">
            Ievietot sludinājumu <ArrowRight size={16} />
          </Link>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-lg font-semibold tracking-tight mb-5">Kategorijas</h2>
          <CategoryGrid categories={categories} counts={counts} />
        </section>

        {/* Recent listings */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold tracking-tight">Jaunākie sludinājumi</h2>
            <Link href="/browse" className="text-sm text-[#B8651E] font-medium hover:underline flex items-center gap-1">
              Skatīt visus <ArrowRight size={14} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-[#6B6B68] text-sm py-8 text-center">Pagaidām nav sludinājumu. Esi pirmais!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {recent.map((l, i) => <ListingCard key={l.id} listing={l} priority={i < 4} />)}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-[#0A0A0A] text-white rounded-2xl px-8 py-10 text-center">
          <h2 className="text-xl font-semibold mb-2">Ievietojiet sludinājumu bez maksas</h2>
          <p className="text-[#9C9A92] mb-6 max-w-sm mx-auto text-sm">
            Reģistrācija aizņem mazāk par minūti. Sludinājums ir aktīvs 30 dienas.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/signup" className="bg-white text-[#0A0A0A] px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F3F2EE] transition-colors">
              Reģistrēties
            </Link>
            <Link href="/post" className="border border-white/30 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
              Ievietot bez reģistrācijas
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
