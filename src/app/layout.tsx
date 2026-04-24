import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | bazaar.lv",
    default:  "bazaar.lv — Sludinājumi Latvijā",
  },
  description:
    "Bezmaksas sludinājumi Latvijā. Nekustamais īpašums, transports, elektronika, darbs un vēl vairāk.",
  keywords: ["sludinājumi", "bezmaksas", "latvija", "pārdod", "pērk", "īre"],
  openGraph: {
    type:        "website",
    locale:      "lv_LV",
    siteName:    "bazaar.lv",
    title:       "bazaar.lv — Sludinājumi Latvijā",
    description: "Bezmaksas sludinājumi Latvijā",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lv" className={inter.variable}>
      <body className="bg-[#FAFAF7] text-[#0A0A0A] antialiased">
        {children}
      </body>
    </html>
  );
}
