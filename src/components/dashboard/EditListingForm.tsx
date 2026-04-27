"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CITIES } from "@/lib/constants";
import type { ListingDetail } from "@/db/queries";
import { ExchangeSpinner } from "@/components/ui/ExchangeSpinner";

type Props = { listing: ListingDetail };

export function EditListingForm({ listing }: Props) {
  const router                            = useRouter();
  const [title, setTitle]                 = useState(listing.title);
  const [description, setDescription]     = useState(listing.description);
  const [price, setPrice]                 = useState(
    listing.priceCents != null ? String(listing.priceCents / 100) : ""
  );
  const [negotiable, setNegotiable]       = useState(listing.negotiable);
  const [city, setCity]                   = useState(listing.city);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [success, setSuccess]             = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError("Nosaukums ir obligāts."); return; }
    setLoading(true); setError(null);

    const res = await fetch(`/api/listings/${listing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title:       title.trim(),
        description: description.trim(),
        priceCents:  price ? Math.round(parseFloat(price) * 100) : null,
        negotiable,
        city,
      }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1200);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Kļūda saglabājot.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Nosaukums" required>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          className="w-full border border-[#E8E6DF] rounded-xl px-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white"
        />
        <p className="text-xs text-[#9C9A92] mt-1">{title.length}/120</p>
      </Field>

      <Field label="Apraksts">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          maxLength={3000}
          className="w-full border border-[#E8E6DF] rounded-xl px-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white resize-none"
        />
      </Field>

      <Field label="Cena (€)">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6B6B68]">€</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full border border-[#E8E6DF] rounded-xl pl-8 pr-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white"
            />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={negotiable}
              onChange={(e) => setNegotiable(e.target.checked)}
              className="w-4 h-4 accent-[#B8651E]"
            />
            Sarunājama
          </label>
        </div>
      </Field>

      <Field label="Pilsēta" required>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-[#E8E6DF] rounded-xl px-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white appearance-none"
        >
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      {error   && <p className="text-sm text-[#E24B4A] bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      {success && <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">Saglabāts! Pāradresē…</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="flex-1 border border-[#E8E6DF] text-[#3A3A37] py-3 rounded-xl text-sm font-medium hover:bg-[#F3F2EE] transition-colors"
        >
          Atcelt
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#0A0A0A] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#3A3A37] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <ExchangeSpinner size={16} />}
          {loading ? "Saglabā…" : "Saglabāt"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}{required && <span className="text-[#E24B4A] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
