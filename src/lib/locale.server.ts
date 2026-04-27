import { cookies } from "next/headers";
import { type Locale, LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const val = store.get("locale")?.value;
  return (LOCALES.includes(val as Locale) ? val : DEFAULT_LOCALE) as Locale;
}
