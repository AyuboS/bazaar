import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getListingById } from "@/db/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EditListingForm } from "@/components/dashboard/EditListingForm";

export const metadata: Metadata = { title: "Labot sludinājumu" };

type Props = { params: Promise<{ id: string }> };

export default async function EditListingPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;
  const listingId = parseInt(id, 10);
  if (isNaN(listingId)) notFound();

  const listing = await getListingById(listingId);
  if (!listing || listing.seller?.id !== session.user.id) notFound();

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-xl font-semibold mb-6">Labot sludinājumu</h1>
        <EditListingForm listing={listing} />
      </div>
      <Footer />
    </>
  );
}
