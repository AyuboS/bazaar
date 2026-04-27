import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Eye, Phone, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ListingCard } from "@/components/listings/ListingCard";
import { getListingById, getSimilarListings } from "@/db/queries";
import { formatPrice, formatDate, timeAgo, isFeatured, initials } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { ContactSellerButton } from "@/components/listings/ContactSellerButton";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(parseInt(id, 10));
  if (!listing) return { title: "Sludinājums nav atrasts" };
  return {
    title:       listing.title,
    description: listing.description.slice(0, 160),
    openGraph:   { title: listing.title, images: listing.images[0] ? [listing.images[0]] : [] },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) notFound();

  const [listing, session] = await Promise.all([
    getListingById(id),
    auth.api.getSession({ headers: await headers() }),
  ]);
  if (!listing) notFound();

  const similar    = listing.category ? await getSimilarListings(listing.category.id, id) : [];
  const featured   = isFeatured(listing.featuredUntil);
  const attrFields = listing.category?.attrsSchema?.fields ?? [];
  const isOwnListing = session?.user.id === listing.seller?.id;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-[#6B6B68] mb-6">
          <Link href="/" className="hover:text-[#B8651E]">Sākums</Link>
          <ChevronRight size={14} />
          {listing.category && (
            <><Link href={`/browse?cat=${listing.category.slug}`} className="hover:text-[#B8651E]">{listing.category.nameLv}</Link><ChevronRight size={14} /></>
          )}
          <span className="truncate max-w-[200px]">{listing.title}</span>
        </nav>

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          {/* Left */}
          <div className="space-y-6">
            {/* Gallery */}
            <div className="space-y-2">
              {listing.images.length > 0 ? (
                <>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F3F2EE]">
                    <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" priority />
                    {featured && <div className="absolute top-3 left-3 bg-[#B8651E] text-white text-xs font-semibold px-3 py-1 rounded">TOP</div>}
                  </div>
                  {listing.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {listing.images.slice(1, 5).map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-[#F3F2EE]">
                          <Image src={img} alt={`foto ${i + 2}`} fill className="object-cover" />
                          {i === 3 && listing.images.length > 5 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm">+{listing.images.length - 5}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[16/10] rounded-xl bg-[#F3F2EE] flex items-center justify-center text-[#C9C6BC]">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              )}
            </div>

            {/* Title + price */}
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-1">{listing.title}</h1>
              <div className="text-3xl font-bold">
                {formatPrice(listing.priceCents, listing.currency)}
                {listing.negotiable && <span className="text-sm font-normal text-[#6B6B68] ml-2">Cena sarunājama</span>}
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-[#6B6B68]">
              <span className="flex items-center gap-1.5"><MapPin size={14} />{listing.district ? `${listing.city}, ${listing.district}` : listing.city}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{timeAgo(listing.createdAt)} · {formatDate(listing.createdAt)}</span>
              <span className="flex items-center gap-1.5"><Eye size={14} />{listing.views} skatījumi</span>
            </div>

            {/* Attrs */}
            {attrFields.length > 0 && (
              <div className="bg-white border border-[#E8E6DF] rounded-xl p-5">
                <h2 className="text-sm font-semibold mb-4 text-[#3A3A37]">Raksturojums</h2>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {attrFields.map((field) => {
                    const val = listing.attrs[field.key];
                    if (val == null) return null;
                    let display: string;
                    if (field.type === "select") display = field.options.find((o) => o.value === String(val))?.label ?? String(val);
                    else if (field.type === "bool") display = val ? "Jā" : "Nē";
                    else display = field.type === "number" && "unit" in field ? `${val} ${field.unit}` : String(val);
                    return (
                      <div key={field.key}>
                        <dt className="text-xs text-[#9C9A92] mb-0.5">{field.label}</dt>
                        <dd className="text-sm font-medium">{display}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            )}

            {/* Description */}
            <div className="bg-white border border-[#E8E6DF] rounded-xl p-5">
              <h2 className="text-sm font-semibold mb-3 text-[#3A3A37]">Apraksts</h2>
              <p className="text-sm leading-relaxed text-[#3A3A37] whitespace-pre-line">{listing.description}</p>
            </div>
          </div>

          {/* Right: seller card */}
          <div>
            <div className="bg-white border border-[#E8E6DF] rounded-xl p-5 sticky top-20">
              {listing.seller && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#F3F2EE] flex items-center justify-center font-semibold text-sm text-[#6B6B68]">
                    {initials(listing.seller.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{listing.seller.name ?? "Pārdevējs"}</p>
                    <p className="text-xs text-[#9C9A92]">Dalībnieks kopš {formatDate(listing.seller.createdAt)}</p>
                  </div>
                </div>
              )}

              {listing.seller?.phone ? (
                <a href={`tel:${listing.seller.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#0A0A0A] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#3A3A37] transition-colors">
                  <Phone size={16} /> {listing.seller.phone}
                </a>
              ) : (
                <p className="text-center py-4 text-sm text-[#9C9A92]">Tālrunis nav norādīts</p>
              )}

              {/* Send message button */}
              {!isOwnListing && listing.seller && (
                <div className="mt-3">
                  {session ? (
                    <ContactSellerButton listingId={listing.id} />
                  ) : (
                    <Link
                      href={`/login?from=/listing/${listing.id}`}
                      className="flex items-center justify-center w-full border border-[#E8E6DF] text-[#3A3A37] py-2.5 rounded-xl text-sm font-medium hover:bg-[#F3F2EE] transition-colors"
                    >
                      Ienākt, lai sūtītu ziņu
                    </Link>
                  )}
                </div>
              )}

              <div className="border-t border-[#E8E6DF] mt-4 pt-4 text-xs text-[#9C9A92] space-y-1">
                <div className="flex justify-between"><span>ID</span><span>#{listing.id}</span></div>
                <div className="flex justify-between"><span>Derīgs līdz</span><span>{formatDate(listing.expiresAt)}</span></div>
              </div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold tracking-tight mb-5">Līdzīgi sludinājumi</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
