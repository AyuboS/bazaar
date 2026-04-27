import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | maiņa.lv",
    default:  "maiņa.lv — Pērc. Pārdod. Mainies.",
  },
  description:
    "Latvijas modernākais sludinājumu portāls. Nekustamais īpašums, transports, elektronika, darbs un vēl vairāk.",
  keywords: ["sludinājumi", "bezmaksas", "latvija", "pārdod", "pērk", "mainies", "maiņa"],
  openGraph: {
    type:        "website",
    locale:      "lv_LV",
    siteName:    "maiņa.lv",
    title:       "maiņa.lv — Pērc. Pārdod. Mainies.",
    description: "Latvijas modernākais sludinājumu portāls",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lv" className={inter.variable}>
      <body className="bg-[#FAFAF7] text-[#0A0A0A] antialiased">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
