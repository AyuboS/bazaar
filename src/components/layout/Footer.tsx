import Link from "next/link";
import { ExchangeIcon } from "@/components/ui/ExchangeIcon";

const COLS = [
  {
    title: "maiņa.lv",
    links: [
      { href: "/about",   label: "Par mums"          },
      { href: "#",        label: "Kā pārdot?"         },
      { href: "#",        label: "Kā pirkt?"          },
      { href: "#",        label: "Drošība"            },
      { href: "#",        label: "Karjera"            },
    ],
  },
  {
    title: "Palīdzība",
    links: [
      { href: "#",         label: "Palīdzības centrs"   },
      { href: "/contact",  label: "Kontakti"            },
      { href: "/terms",    label: "Lietošanas noteikumi" },
      { href: "/privacy",  label: "Privātuma politika"  },
      { href: "#",         label: "Sīkdatnes"           },
    ],
  },
  {
    title: "Populāras kategorijas",
    links: [
      { href: "/browse?cat=transports",          label: "Transports"  },
      { href: "/browse?cat=nekustamais-ipasums", label: "Nekustamais" },
      { href: "/browse?cat=elektronika",         label: "Elektronika" },
      { href: "/browse?cat=darbs",               label: "Darbs"       },
      { href: "/browse?cat=apgerbs-apavi",       label: "Apģērbs"     },
    ],
  },
  {
    title: "Biznesam",
    links: [
      { href: "#", label: "Reklāma"          },
      { href: "#", label: "TOP sludinājumi"  },
      { href: "#", label: "API"              },
      { href: "#", label: "Partneriem"       },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#111111", borderTop: "1px solid #1A1A1A" }}>
      <div className="max-w-[1200px] mx-auto px-5 pt-12 pb-7">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {COLS.map((col) => (
            <div key={col.title}>
              <p
                className="text-white mb-3.5"
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}
              >
                {col.title}
              </p>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block mb-2.5 transition-colors text-[#444444] hover:text-[#888888]"
                  style={{ fontSize: 12 }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex items-center justify-between flex-wrap gap-3"
          style={{ borderTop: "1px solid #1A1A1A" }}
        >
          <div className="flex items-center gap-2">
            <ExchangeIcon size={16} color="#B8651E" strokeWidth={2} />
            <span
              className="text-white"
              style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.4px" }}
            >
              maiņa<span className="text-[#B8651E]">.lv</span>
            </span>
          </div>
          <p style={{ fontSize: 11, color: "#2A2A2A" }}>
            © {year} maiņa.lv · Latvija · Sludinājumi bez komisijas
          </p>
        </div>
      </div>
    </footer>
  );
}
