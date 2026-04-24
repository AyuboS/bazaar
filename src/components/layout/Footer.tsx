import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#E8E6DF] bg-[#F3F2EE] mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-lg font-semibold tracking-tight mb-2">
              bazaar<span className="text-[#B8651E]">.</span>lv
            </div>
            <p className="text-sm text-[#6B6B68] leading-relaxed">
              Bezmaksas sludinājumi Latvijā. Ātra, moderna alternatīva.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#9C9A92] mb-3">Kategorijas</p>
            <ul className="space-y-1.5 text-sm text-[#3A3A37]">
              {[
                ["nekustamais-ipasums", "Nekustamais īpašums"],
                ["transports",          "Transports"         ],
                ["darbs",               "Darbs"              ],
                ["elektronika",         "Elektronika"        ],
                ["pakalpojumi",         "Pakalpojumi"        ],
              ].map(([slug, label]) => (
                <li key={slug}><Link href={`/browse?cat=${slug}`} className="hover:text-[#B8651E] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#9C9A92] mb-3">Konts</p>
            <ul className="space-y-1.5 text-sm text-[#3A3A37]">
              <li><Link href="/login"     className="hover:text-[#B8651E] transition-colors">Ienākt</Link></li>
              <li><Link href="/signup"    className="hover:text-[#B8651E] transition-colors">Reģistrēties</Link></li>
              <li><Link href="/post"      className="hover:text-[#B8651E] transition-colors">Ievietot sludinājumu</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#B8651E] transition-colors">Mani sludinājumi</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#9C9A92] mb-3">Informācija</p>
            <ul className="space-y-1.5 text-sm text-[#3A3A37]">
              <li><Link href="/about"   className="hover:text-[#B8651E] transition-colors">Par mums</Link></li>
              <li><Link href="/terms"   className="hover:text-[#B8651E] transition-colors">Noteikumi</Link></li>
              <li><Link href="/privacy" className="hover:text-[#B8651E] transition-colors">Privātuma politika</Link></li>
              <li><Link href="/contact" className="hover:text-[#B8651E] transition-colors">Kontakti</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E8E6DF] pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#9C9A92]">© {year} bazaar.lv. Visas tiesības aizsargātas.</p>
          <p className="text-xs text-[#9C9A92]">Latvija 🇱🇻</p>
        </div>
      </div>
    </footer>
  );
}
