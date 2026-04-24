"use client";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { CITIES, SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FilterSidebar() {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const city      = searchParams.get("city")      ?? undefined;
  const priceMin  = searchParams.get("priceMin")  ?? undefined;
  const priceMax  = searchParams.get("priceMax")  ?? undefined;
  const sort      = searchParams.get("sort")      ?? "newest";
  const withPhoto = searchParams.get("withPhoto") === "1";

  const update = useCallback((key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    ["city", "priceMin", "priceMax", "sort", "withPhoto", "page"].forEach((k) => params.delete(k));
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const hasActive = !!city || !!priceMin || !!priceMax || withPhoto || sort !== "newest";

  const panel = (
    <aside className="w-full space-y-6">
      <Section label="Kārtot">
        {SORT_OPTIONS.map((opt) => (
          <Btn key={opt.value} active={sort === opt.value} onClick={() => update("sort", opt.value)}>
            {opt.label}
          </Btn>
        ))}
      </Section>

      <hr className="border-[#E8E6DF]" />

      <Section label="Pilsēta">
        <Btn active={!city} onClick={() => update("city", undefined)}>Visas pilsētas</Btn>
        {CITIES.map((c) => (
          <Btn key={c} active={city === c} onClick={() => update("city", c)}>{c}</Btn>
        ))}
      </Section>

      <hr className="border-[#E8E6DF]" />

      <Section label="Cena (€)">
        <div className="flex gap-2">
          <input type="number" placeholder="no" min={0} defaultValue={priceMin}
            onBlur={(e) => update("priceMin", e.target.value || undefined)}
            className="w-full border border-[#E8E6DF] rounded-lg px-3 py-2 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white" />
          <input type="number" placeholder="līdz" min={0} defaultValue={priceMax}
            onBlur={(e) => update("priceMax", e.target.value || undefined)}
            className="w-full border border-[#E8E6DF] rounded-lg px-3 py-2 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white" />
        </div>
      </Section>

      <hr className="border-[#E8E6DF]" />

      <button onClick={() => update("withPhoto", withPhoto ? undefined : "1")}
        className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-[#3A3A37]">Tikai ar foto</span>
        <div className={cn("w-9 h-5 rounded-full transition-colors relative", withPhoto ? "bg-[#0A0A0A]" : "bg-[#E8E6DF]")}>
          <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform", withPhoto ? "translate-x-4" : "translate-x-0.5")} />
        </div>
      </button>

      {hasActive && (
        <button onClick={clearAll} className="w-full text-sm text-[#B8651E] font-medium py-2 border border-[#B8651E]/30 rounded-lg hover:bg-[#FAEEDA] transition-colors">
          Notīrīt filtrus
        </button>
      )}
    </aside>
  );

  return (
    <>
      <div className="hidden md:block w-48 shrink-0">{panel}</div>

      <div className="md:hidden">
        <button onClick={() => setMobileOpen(true)}
          className={cn("flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-colors",
            hasActive ? "border-[#B8651E] bg-[#FAEEDA] text-[#B8651E]" : "border-[#E8E6DF] bg-white text-[#3A3A37]")}>
          <SlidersHorizontal size={15} /> Filtri
          {hasActive && <span className="w-4 h-4 rounded-full bg-[#B8651E] text-white text-[10px] flex items-center justify-center">!</span>}
        </button>

        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
            <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold">Filtri</h2>
                <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-[#F3F2EE]"><X size={18} /></button>
              </div>
              {panel}
              <button onClick={() => setMobileOpen(false)} className="w-full mt-6 bg-[#0A0A0A] text-white py-3 rounded-xl text-sm font-medium">
                Rādīt rezultātus
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9C9A92] mb-2">{label}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={cn("w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
        active ? "bg-[#0A0A0A] text-white font-medium" : "hover:bg-[#F3F2EE] text-[#3A3A37]")}>
      {children}
    </button>
  );
}
