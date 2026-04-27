import Link from "next/link";
import { formatNumber } from "@/lib/utils";

type CategoryDesign = {
  bg:       string;
  icon:     string;
  iconPath: React.ReactNode;
};

const DESIGNS: Record<string, CategoryDesign> = {
  "transports": {
    bg: "#EEF5FB", icon: "#1A6FAA",
    iconPath: (
      <>
        <rect x="3" y="10" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M3 13H21" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="19" r="2" stroke="currentColor" strokeWidth="1.7" fill="none"/>
        <circle cx="17" cy="19" r="2" stroke="currentColor" strokeWidth="1.7" fill="none"/>
        <path d="M5 10L7 5H17L19 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </>
    ),
  },
  "nekustamais-ipasums": {
    bg: "#EDF6F0", icon: "#1A7A52",
    iconPath: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M2 10L12 3L22 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <rect x="9" y="14" width="6" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      </>
    ),
  },
  "elektronika": {
    bg: "#FEF3E7", icon: "#B8651E",
    iconPath: (
      <>
        <rect x="7" y="3" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <circle cx="12" cy="16" r="1.2" fill="currentColor"/>
        <line x1="9" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
  "darbs": {
    bg: "#F4EEFB", icon: "#7B3FA0",
    iconPath: (
      <>
        <rect x="5" y="8" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M9 8V7C9 5.9 9.9 5 11 5H13C14.1 5 15 5.9 15 7V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none"/>
        <line x1="5" y1="14" x2="19" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      </>
    ),
  },
  "majai": {
    bg: "#EDFAF4", icon: "#1D9E75",
    iconPath: (
      <>
        <path d="M12 3C12 3 5 8 5 14C5 17.3 8.1 20 12 20C15.9 20 19 17.3 19 14C19 8 12 3 12 3Z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M12 20V23" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M9 14C9 14 10 16 12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
  "pakalpojumi": {
    bg: "#FFF0ED", icon: "#C04030",
    iconPath: (
      <path d="M12 3L14 8L19 8L15 11.5L16.5 17L12 14L7.5 17L9 11.5L5 8L10 8L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none"/>
    ),
  },
  "apgerbs-apavi": {
    bg: "#FFF0F6", icon: "#B03080",
    iconPath: (
      <path d="M9 4H15M9 4C9 4 7 5 5 6L7 9C8 8 9 7.5 9 9V21H15V9C15 7.5 16 8 17 9L19 6C17 5 15 4 15 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
  },
  "dzivnieki": {
    bg: "#FFF8EC", icon: "#C07A10",
    iconPath: (
      <>
        <circle cx="12" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <circle cx="7"  cy="7"  r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="17" cy="7"  r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="4"  cy="12" r="1.8" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <circle cx="20" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      </>
    ),
  },
  "bernu-preces": {
    bg: "#EEF4FF", icon: "#3060C0",
    iconPath: (
      <>
        <circle cx="12" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M5 22C5 18.1 8.1 15 12 15C15.9 15 19 18.1 19 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </>
    ),
  },
  "atputa": {
    bg: "#F5F0FF", icon: "#5A35C0",
    iconPath: (
      <>
        <rect x="4" y="9" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M8 9V7C8 5.3 9.3 4 11 4H13C14.7 4 16 5.3 16 7V9" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <circle cx="9" cy="15" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="15" r="1.5" fill="currentColor"/>
      </>
    ),
  },
  "lauksaimnieciba": {
    bg: "#EDF5E8", icon: "#3B6D11",
    iconPath: (
      <>
        <path d="M12 3C12 3 5 8 5 14C5 17.3 8.1 20 12 20C15.9 20 19 17.3 19 14C19 8 12 3 12 3Z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M12 20V23" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M9 14C9 14 10 16 12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
  "buvnieciba": {
    bg: "#F5F0E8", icon: "#7A5C1E",
    iconPath: (
      <>
        <rect x="4" y="9" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M2 9L12 3L22 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="12" y1="9" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
  "razosana": {
    bg: "#EEF0F5", icon: "#3A4A6B",
    iconPath: (
      <>
        <path d="M12 2L8 8H4L7 13L5 19H11L12 22L13 19H19L17 13L20 8H16L12 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none"/>
        <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </>
    ),
  },
};

const FALLBACK: CategoryDesign = {
  bg: "#F3F2EE", icon: "#6B6B68",
  iconPath: (
    <>
      <rect x="5" y="8" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M9 8V6C9 4.9 9.9 4 11 4H13C14.1 4 15 4.9 15 6V8" stroke="currentColor" strokeWidth="1.7" fill="none"/>
    </>
  ),
};

type Props = {
  categories: { id: number; slug: string; nameLv: string }[];
  counts:     Record<number, number>;
};

export function CategoryGrid({ categories, counts }: Props) {
  return (
    <div className="cat-grid">
      {categories.map((cat) => {
        const design = DESIGNS[cat.slug] ?? FALLBACK;
        const count  = counts[cat.id] ?? 0;
        return (
          <Link
            key={cat.id}
            href={`/browse?cat=${cat.slug}`}
            className="cat-tile flex flex-col items-center gap-2.5 text-center rounded-[12px]"
            style={{ background: design.bg, padding: "18px 12px 14px" }}
          >
            <svg
              width="36" height="36"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: design.icon, flexShrink: 0 }}
            >
              {design.iconPath}
            </svg>
            <div>
              <p className="text-[12px] font-semibold text-[#0A0A0A] leading-tight">{cat.nameLv}</p>
              {count > 0 && (
                <p className="text-[10px] text-[#6B6B68] mt-0.5">{formatNumber(count)}</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
