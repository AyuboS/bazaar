import Link from "next/link";
import { Building2, Car, Briefcase, Smartphone, Wrench, Home, ShoppingBag, PawPrint, Baby, Gamepad2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  "nekustamais-ipasums": Building2, "transports": Car, "darbs": Briefcase,
  "elektronika": Smartphone, "pakalpojumi": Wrench, "majai-un-darzam": Home,
  "apgerbs-apavi": ShoppingBag, "dziivnieki": PawPrint, "bernu-preces": Baby, "hobiji": Gamepad2,
};

const ACCENTS: Record<string, { bg: string; icon: string }> = {
  "nekustamais-ipasums": { bg: "#EBF3FB", icon: "#185FA5" },
  "transports":          { bg: "#E8F5EE", icon: "#1D9E75" },
  "darbs":               { bg: "#FAEEDA", icon: "#B8651E" },
  "elektronika":         { bg: "#F0EEF9", icon: "#534AB7" },
  "pakalpojumi":         { bg: "#FBE9E9", icon: "#A32D2D" },
  "majai-un-darzam":     { bg: "#EAF3DE", icon: "#3B6D11" },
  "apgerbs-apavi":       { bg: "#FBEAF0", icon: "#993556" },
  "dziivnieki":          { bg: "#FAECE7", icon: "#993C1D" },
  "bernu-preces":        { bg: "#E1F5EE", icon: "#0F6E56" },
  "hobiji":              { bg: "#F3F2EE", icon: "#5F5E5A" },
};

type Props = { categories: { id: number; slug: string; nameLv: string }[]; counts: Record<number, number> };

export function CategoryGrid({ categories, counts }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {categories.map((cat) => {
        const Icon   = ICONS[cat.slug] ?? Briefcase;
        const accent = ACCENTS[cat.slug] ?? { bg: "#F3F2EE", icon: "#5F5E5A" };
        const count  = counts[cat.id] ?? 0;
        return (
          <Link key={cat.id} href={`/browse?cat=${cat.slug}`}
            className="group flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-[#E8E6DF] hover:border-[#C9C6BC] hover:shadow-sm transition-all duration-200 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
              style={{ background: accent.bg }}>
              <Icon size={22} style={{ color: accent.icon }} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium leading-tight mb-0.5">{cat.nameLv}</p>
              {count > 0 && <p className="text-xs text-[#9C9A92]">{formatNumber(count)}</p>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
