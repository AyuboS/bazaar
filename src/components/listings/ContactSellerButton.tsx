"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";

type Props = { listingId: number };

export function ContactSellerButton({ listingId }: Props) {
  const router          = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function handleClick() {
    setLoading(true); setError(null);
    const res = await fetch("/api/conversations", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ listingId }),
    });
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/messages/${id}`);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Kļūda.");
      setLoading(false);
    }
  }

  return (
    <div>
      {error && <p className="text-xs text-[#E24B4A] mb-2">{error}</p>}
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full border border-[#E8E6DF] text-[#3A3A37] py-2.5 rounded-xl text-sm font-medium hover:bg-[#F3F2EE] transition-colors disabled:opacity-50"
      >
        <MessageSquare size={15} />
        {loading ? "Atveras…" : "Sūtīt ziņu pārdevējam"}
      </button>
    </div>
  );
}
