import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { getUserListings } from "@/db/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardListingCard } from "@/components/dashboard/DashboardListingCard";

export const metadata: Metadata = { title: "Mani sludinājumi" };

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const userListings = await getUserListings(session.user.id);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Mani sludinājumi</h1>
            <p className="text-sm text-[#6B6B68] mt-1">
              {userListings.length > 0
                ? `${userListings.length} sludinājum${userListings.length === 1 ? "s" : "i"}`
                : "Nav neviena sludinājuma"}
            </p>
          </div>
          <Link
            href="/post"
            className="flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#3A3A37] transition-colors"
          >
            <Plus size={15} /> Ievietot jaunu
          </Link>
        </div>

        {userListings.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#E8E6DF] rounded-2xl">
            <p className="text-[#6B6B68] mb-4">Tev vēl nav neviena sludinājuma.</p>
            <Link href="/post" className="text-[#B8651E] font-medium hover:underline text-sm">
              Ievietot pirmo sludinājumu →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userListings.map((listing) => (
              <DashboardListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
