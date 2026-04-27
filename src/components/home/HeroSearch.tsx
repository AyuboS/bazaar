"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router    = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/browse?q=${encodeURIComponent(q.trim())}`);
    else router.push("/browse");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto">
      <div className="flex-1 flex items-center gap-3 bg-white border border-[#E8E6DF] rounded-xl px-4 py-3.5 shadow-sm hover:border-[#C9C6BC] focus-within:border-[#B8651E] focus-within:ring-1 focus-within:ring-[#B8651E] transition-all">
        <Search size={18} className="text-[#9C9A92] shrink-0" />
        <input
          type="search"
          placeholder="Ko meklē? piem. BMW, iPhone, dzīvoklis…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#9C9A92]"
        />
      </div>
      <button
        type="submit"
        className="bg-[#B8651E] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#9A5219] transition-colors shrink-0"
      >
        Meklēt
      </button>
    </form>
  );
}
