"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense, useRef, useEffect } from "react";
import { Plus, User, LogOut, ChevronDown, MessageSquare, Bell, MapPin, Search } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { ExchangeIcon } from "@/components/ui/ExchangeIcon";
import { CITIES } from "@/lib/constants";

const ALL_CITIES = ["Visa Latvija", ...CITIES];

const NAV_LINKS = [
  { slug: "transports",          label: "Transports"  },
  { slug: "nekustamais-ipasums", label: "Nekustamais" },
  { slug: "darbs",               label: "Darbs"       },
];

function SearchBar() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ]    = useState(searchParams.get("q") ?? "");
  const [city, setCity]     = useState("Visa Latvija");
  const [cityOpen, setCityOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (q.trim()) params.set("q", q.trim()); else params.delete("q");
    if (city && city !== "Visa Latvija") params.set("city", city); else params.delete("city");
    router.push(`/browse?${params.toString()}`);
    setCityOpen(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-[580px]">
      <div
        className="flex items-center overflow-hidden bg-[#FAFAF7]"
        style={{ border: "1.5px solid #E8E6DF", borderRadius: 9, height: 40 }}
      >
        {/* City selector */}
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setCityOpen((o) => !o)}
            className="flex items-center gap-1.5 h-10 px-3 bg-transparent text-[12px] font-medium whitespace-nowrap hover:bg-[#F3F2EE] transition-colors"
            style={{ borderRight: "1px solid #E8E6DF", color: "#0A0A0A" }}
          >
            <MapPin size={13} color="#6B6B68" />
            <span style={{ color: city !== "Visa Latvija" ? "#B8651E" : "#0A0A0A" }}>{city}</span>
            <ChevronDown size={11} color="#6B6B68" />
          </button>

          {cityOpen && (
            <div
              className="absolute top-full left-0 mt-1 bg-white py-1 min-w-[160px] z-[200]"
              style={{
                border: "1px solid #E8E6DF",
                borderRadius: 8,
                boxShadow: "0 8px 24px rgba(10,10,10,0.12)",
              }}
            >
              {ALL_CITIES.map((c) => (
                <div
                  key={c}
                  onClick={() => { setCity(c); setCityOpen(false); }}
                  className="px-4 py-[9px] text-[13px] cursor-pointer"
                  style={{
                    color:      city === c ? "#B8651E" : "#0A0A0A",
                    fontWeight: city === c ? 600 : 400,
                    background: city === c ? "#FEF3E7" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (city !== c) (e.currentTarget as HTMLDivElement).style.background = "#FAFAF7";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      city === c ? "#FEF3E7" : "transparent";
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Text input */}
        <input
          type="search"
          placeholder="Ko meklē?"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 min-w-0 bg-transparent border-none outline-none px-3 text-[13px] text-[#0A0A0A] placeholder:text-[#9C9A92]"
        />

        {/* Search submit */}
        <button
          type="submit"
          className="flex items-center justify-center flex-shrink-0 h-10 px-4 bg-[#0A0A0A] hover:bg-[#3A3A37] transition-colors"
        >
          <Search size={15} color="#FFFFFF" />
        </button>
      </div>
    </form>
  );
}

function AuthButton() {
  const { data: session }       = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [, startTransition]     = useTransition();
  const router                  = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    startTransition(() => router.refresh());
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-1.5 text-[13px] font-medium px-3 h-9 rounded-[7px] border border-[#E8E6DF] text-[#0A0A0A] hover:bg-[#F3F2EE] transition-colors whitespace-nowrap"
      >
        <User size={15} />
        <span>Ieiet</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg hover:bg-[#F3F2EE] transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-[#B8651E] text-white text-xs flex items-center justify-center font-semibold">
          {session.user.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <ChevronDown size={13} className="text-[#6B6B68]" />
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-[#E8E6DF] rounded-xl shadow-sm min-w-[160px] py-1 overflow-hidden">
            <div className="px-4 py-2 border-b border-[#E8E6DF]">
              <p className="text-sm font-medium truncate">{session.user.name ?? session.user.email}</p>
              <p className="text-xs text-[#6B6B68] truncate">{session.user.email}</p>
            </div>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#F3F2EE]">
              Mani sludinājumi
            </Link>
            <Link href="/messages" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#F3F2EE]">
              <MessageSquare size={14} /> Ziņojumi
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-[#F3F2EE] text-[#E24B4A]">
              <LogOut size={14} /> Iziet
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-30 bg-white border-b border-[#E8E6DF]"
      style={{ boxShadow: "0 1px 8px rgba(10,10,10,0.06)" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 h-[60px] flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <ExchangeIcon size={24} color="#B8651E" strokeWidth={2.5} />
          <span
            className="leading-none text-[#0A0A0A]"
            style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.7px" }}
          >
            maiņa<span className="text-[#B8651E]">.lv</span>
          </span>
        </Link>

        {/* Search bar */}
        <Suspense fallback={
          <div className="flex-1 max-w-[580px] h-10 bg-[#F3F2EE] rounded-[9px] animate-pulse" />
        }>
          <SearchBar />
        </Suspense>

        {/* Nav links — desktop only */}
        <nav className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.slug}
              href={`/browse?cat=${l.slug}`}
              className="text-[13px] font-medium text-[#6B6B68] hover:text-[#0A0A0A] whitespace-nowrap transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <button
            className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-[#F3F2EE] transition-colors"
            aria-label="Paziņojumi"
          >
            <Bell size={18} className="text-[#6B6B68]" />
          </button>

          <Suspense fallback={null}>
            <AuthButton />
          </Suspense>

          <Link
            href="/post"
            className="flex items-center gap-1.5 text-white text-[13px] px-4 h-9 rounded-[7px] whitespace-nowrap hover:opacity-90 transition-opacity"
            style={{ background: "#B8651E", fontWeight: 700 }}
          >
            <Plus size={14} strokeWidth={2.5} />
            <span>Ievietot</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
