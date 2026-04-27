"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, Edit2, Trash2, RefreshCw } from "lucide-react";
import { formatPrice, formatDate, listingUrl } from "@/lib/utils";
import type { UserListing } from "@/db/queries";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active:  { label: "Aktīvs",    color: "bg-green-100 text-green-700"    },
  hidden:  { label: "Paslēpts",  color: "bg-[#F3F2EE] text-[#6B6B68]"   },
  expired: { label: "Beidzies",  color: "bg-red-100 text-red-600"        },
  draft:   { label: "Melnraksts",color: "bg-yellow-100 text-yellow-700"  },
  sold:    { label: "Pārdots",   color: "bg-blue-100 text-blue-700"      },
  banned:  { label: "Bloķēts",   color: "bg-red-200 text-red-800"        },
};

type Props = { listing: UserListing };

export function DashboardListingCard({ listing }: Props) {
  const router             = useRouter();
  const [loading, setLoading] = useState<"delete" | "renew" | null>(null);
  const [error, setError]  = useState<string | null>(null);
  const status             = STATUS_LABELS[listing.status] ?? { label: listing.status, color: "bg-[#F3F2EE] text-[#6B6B68]" };

  async function handleDelete() {
    if (!confirm("Vai tiešām vēlies izdzēst šo sludinājumu?")) return;
    setLoading("delete"); setError(null);
    const res = await fetch(`/api/listings/${listing.id}/delete`, { method: "POST" });
    if (res.ok) router.refresh();
    else setError("Izdzēšana neizdevās.");
    setLoading(null);
  }

  async function handleRenew() {
    setLoading("renew"); setError(null);
    const res = await fetch(`/api/listings/${listing.id}/renew`, { method: "POST" });
    if (res.ok) router.refresh();
    else setError("Atjaunošana neizdevās.");
    setLoading(null);
  }

  return (
    <div className="bg-white border border-[#E8E6DF] rounded-xl p-4 hover:border-[#C9C6BC] transition-colors">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <Link href={listingUrl(listing.id, listing.title)} className="shrink-0">
          <div className="w-20 h-20 rounded-lg bg-[#F3F2EE] overflow-hidden">
            {listing.images[0] ? (
              <Image src={listing.images[0]} alt={listing.title} width={80} height={80} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#C9C6BC]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
            )}
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="min-w-0">
              <Link href={listingUrl(listing.id, listing.title)} className="font-medium text-sm hover:text-[#B8651E] transition-colors line-clamp-1">
                {listing.title}
              </Link>
              <p className="text-xs text-[#9C9A92] mt-0.5">{listing.categoryName ?? ""} · {listing.city}</p>
            </div>
            <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2 text-xs text-[#6B6B68]">
            <span className="font-medium text-sm text-[#0A0A0A]">
              {formatPrice(listing.priceCents, listing.currency)}
            </span>
            <span className="flex items-center gap-1"><Eye size={12} /> {listing.views}</span>
            <span>Beidzas: {formatDate(listing.expiresAt)}</span>
          </div>

          {error && <p className="text-xs text-[#E24B4A] mt-1">{error}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F3F2EE]">
        <Link
          href={`/dashboard/listings/${listing.id}/edit`}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E8E6DF] hover:bg-[#F3F2EE] transition-colors"
        >
          <Edit2 size={13} /> Labot
        </Link>
        <button
          onClick={handleRenew}
          disabled={loading !== null}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E8E6DF] hover:bg-[#F3F2EE] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading === "renew" ? "animate-spin" : ""} />
          {loading === "renew" ? "Atjauno…" : "Atjaunot"}
        </button>
        <button
          onClick={handleDelete}
          disabled={loading !== null}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E8E6DF] text-[#E24B4A] hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-50 ml-auto"
        >
          <Trash2 size={13} className={loading === "delete" ? "animate-spin" : ""} />
          {loading === "delete" ? "Dzēš…" : "Dzēst"}
        </button>
      </div>
    </div>
  );
}
