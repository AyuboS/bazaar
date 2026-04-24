import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCY_SYMBOL } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  priceCents: number | null | undefined,
  currency = "EUR",
  suffix?: string,
): string {
  if (priceCents == null) return "Cena nav norādīta";
  const symbol = CURRENCY_SYMBOL[currency] ?? currency;
  const amount = priceCents / 100;
  const formatted =
    amount % 1 === 0
      ? amount.toLocaleString("lv-LV")
      : amount.toLocaleString("lv-LV", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return suffix ? `${symbol}${formatted} ${suffix}` : `${symbol}${formatted}`;
}

export function timeAgo(date: Date | string): string {
  const d     = typeof date === "string" ? new Date(date) : date;
  const secs  = Math.floor((Date.now() - d.getTime()) / 1000);
  const mins  = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);

  if (secs < 60)   return "tikko";
  if (mins < 60)   return `pirms ${mins} min.`;
  if (hours < 24)  return `pirms ${hours} h`;
  if (days === 1)  return "vakar";
  if (days < 30)   return `pirms ${days} d.`;
  const months = Math.floor(days / 30);
  if (months < 12) return `pirms ${months} mēn.`;
  return `pirms ${Math.floor(months / 12)} g.`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("lv-LV", { day: "numeric", month: "long", year: "numeric" });
}

export function slugify(str: string): string {
  const map: Record<string, string> = {
    ā: "a", č: "c", ē: "e", ģ: "g", ī: "i",
    ķ: "k", ļ: "l", ņ: "n", š: "s", ū: "u", ž: "z",
  };
  return str
    .toLowerCase()
    .replace(/[āčēģīķļņšūž]/g, (c) => map[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function truncate(str: string, maxLen: number): string {
  return str.length <= maxLen ? str : str.slice(0, maxLen - 1) + "…";
}

export function listingUrl(id: number, title?: string): string {
  if (!title) return `/listing/${id}`;
  return `/listing/${id}-${slugify(title)}`;
}

export function categoryUrl(slug: string, params?: Record<string, string>): string {
  const base = `/browse?cat=${slug}`;
  if (!params) return base;
  return `${base}&${new URLSearchParams(params).toString()}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("lv-LV");
}

export function initials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export function isFeatured(featuredUntil: Date | null | undefined): boolean {
  if (!featuredUntil) return false;
  return new Date(featuredUntil) > new Date();
}
