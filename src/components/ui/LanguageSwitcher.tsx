"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { LOCALES, type Locale } from "@/lib/i18n";

const META: Record<Locale, { short: string; label: string }> = {
  lv: { short: "LV", label: "Latviešu" },
  ru: { short: "RU", label: "Русский"  },
  en: { short: "EN", label: "English"  },
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen]       = useState(false);
  const router                = useRouter();
  const ref                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function select(l: Locale) {
    setOpen(false);
    setLocale(l);
    await fetch(`/api/locale?locale=${l}`, { method: "POST" });
    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 h-9 px-2.5 rounded-[7px] text-[12px] font-semibold text-[#6B6B68] hover:bg-[#F3F2EE] hover:text-[#0A0A0A] transition-colors"
        aria-label="Izvēlēties valodu"
      >
        {META[locale].short}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-px">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-[200] bg-white py-1 min-w-[120px]"
          style={{ border: "1px solid #E8E6DF", borderRadius: 10, boxShadow: "0 8px 24px rgba(10,10,10,0.12)" }}
        >
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => select(l)}
              className="flex items-center justify-between w-full px-4 py-[9px] text-[13px] transition-colors hover:bg-[#FAFAF7]"
              style={{
                color:      l === locale ? "#B8651E" : "#0A0A0A",
                fontWeight: l === locale ? 700 : 400,
                background: l === locale ? "#FEF3E7" : undefined,
              }}
            >
              <span>{META[l].label}</span>
              <span className="text-[11px] text-[#9C9A92] ml-3">{META[l].short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
