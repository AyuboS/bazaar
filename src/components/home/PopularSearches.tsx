"use client";
import { useRouter } from "next/navigation";

const POPULAR = [
  "automašīnas", "iphone 15", "dzīvoklis Rīgā", "klēpjdators", "velosipēds",
  "darbs Rīgā", "mēbeles", "kaķi", "suni", "iPhone 14", "māja", "ratiņi",
  "samsung", "sofa", "vakance",
];

export function PopularSearches() {
  const router = useRouter();

  return (
    <section className="bg-white border-t border-[#E8E6DF]">
      <div className="max-w-[1200px] mx-auto px-5 py-8">
        <h3
          className="text-[#6B6B68] uppercase mb-4"
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}
        >
          Populāri meklējumi
        </h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR.map((term) => (
            <button
              key={term}
              onClick={() => router.push(`/browse?q=${encodeURIComponent(term)}`)}
              className="popular-tag px-[14px] py-[6px] bg-[#F3F2EE] border border-[#E8E6DF] rounded-[20px] text-[12px] text-[#0A0A0A] cursor-pointer transition-all duration-150"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
