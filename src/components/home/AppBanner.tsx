import { ExchangeIcon } from "@/components/ui/ExchangeIcon";

export function AppBanner() {
  return (
    <section style={{ background: "#0A0A0A" }}>
      <div className="max-w-[1200px] mx-auto px-5 py-10 flex items-center justify-between flex-wrap gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <ExchangeIcon size={28} color="#B8651E" strokeWidth={2.8} />
            <span
              className="text-white"
              style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px" }}
            >
              maiņa<span className="text-[#B8651E]">.lv</span>
            </span>
          </div>
          <div
            className="text-white leading-[1.15] mb-2"
            style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.8px" }}
          >
            Pērc. Pārdod.<br />
            <span style={{ color: "#B8651E" }}>Mainies.</span>
          </div>
          <p className="max-w-[380px]" style={{ fontSize: 14, color: "#555" }}>
            Lejupielādē lietotni un iekļūsti 200 000+ sludinājumos. Paziņojumi par jauniem piedāvājumiem.
          </p>
        </div>

        <div className="flex gap-3">
          {["App Store", "Google Play"].map((store) => (
            <button
              key={store}
              className="text-left px-[22px] py-3 rounded-[10px] cursor-pointer"
              style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
            >
              <div className="mb-0.5" style={{ fontSize: 10, color: "#555" }}>
                Lejupielādēt no
              </div>
              <div className="text-white font-bold" style={{ fontSize: 14 }}>
                {store}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
