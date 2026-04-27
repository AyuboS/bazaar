"use client";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";

type Props = { searchParams: Record<string, string | undefined> };

const FILTER_LABELS: Record<string, (v: string) => string> = {
  q:          (v) => `"${v}"`,
  city:       (v) => v,
  priceMin:   (v) => `no €${v}`,
  priceMax:   (v) => `līdz €${v}`,
  withPhoto:  () => "Tikai ar foto",
  sort:       (v) => v === "price_asc" ? "Cena ↑" : v === "price_desc" ? "Cena ↓" : "",
};

const CHIP_KEYS = ["q", "city", "priceMin", "priceMax", "withPhoto", "sort"] as const;

export function FilterChips({ searchParams }: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  const chips = CHIP_KEYS.flatMap((key) => {
    const val = searchParams[key];
    if (!val) return [];
    if (key === "sort" && val === "newest") return [];
    if (key === "withPhoto" && val !== "1") return [];
    const label = FILTER_LABELS[key]?.(val) ?? val;
    if (!label) return [];
    return [{ key, label }];
  });

  if (chips.length === 0) return null;

  function removeFilter(key: string) {
    const params = new URLSearchParams(
      Object.entries(searchParams).filter((e): e is [string, string] => e[1] != null && e[0] !== key),
    );
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(({ key, label }) => (
        <span
          key={key}
          className="flex items-center gap-1.5 bg-[#FAEEDA] text-[#9A5219] text-xs font-medium px-3 py-1.5 rounded-full"
        >
          {label}
          <button onClick={() => removeFilter(key)} className="hover:text-[#B8651E]">
            <X size={12} />
          </button>
        </span>
      ))}
    </div>
  );
}
