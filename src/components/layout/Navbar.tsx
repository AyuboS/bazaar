"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense } from "react";
import { Search, Plus, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const CATEGORY_PILLS = [
  { slug: "",                    label: "Visas"               },
  { slug: "nekustamais-ipasums", label: "Nekustamais īpašums" },
  { slug: "transports",          label: "Transports"          },
  { slug: "darbs",               label: "Darbs"               },
  { slug: "elektronika",         label: "Elektronika"         },
  { slug: "pakalpojumi",         label: "Pakalpojumi"         },
];

function SearchBar() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ]   = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (q.trim()) params.set("q", q.trim()); else params.delete("q");
    router.push(`/browse?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
      <div className="flex items-center gap-2 bg-white border border-[#E8E6DF] rounded-lg px-3 py-2 hover:border-[#C9C6BC] focus-within:border-[#B8651E] focus-within:ring-1 focus-within:ring-[#B8651E] transition-all">
        <Search size={16} className="text-[#6B6B68] shrink-0" />
        <input
          type="search"
          placeholder="Meklēt sludinājumus…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#9C9A92]"
        />
      </div>
    </form>
  );
}

function AuthButton() {
  const { data: session }         = authClient.useSession();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [, startTransition]       = useTransition();
  const router                    = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    startTransition(() => router.refresh());
  }

  if (!session) {
    return (
      <Link href="/login" className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-[#F3F2EE] transition-colors">
        <User size={16} /> Ienākt
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg hover:bg-[#F3F2EE] transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-[#B8651E] text-white text-xs flex items-center justify-center font-medium">
          {session.user.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <ChevronDown size={14} className="text-[#6B6B68]" />
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
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-[#F3F2EE] text-[#E24B4A]">
              <LogOut size={14} /> Iziet
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CategoryPills() {
  const searchParams = useSearchParams();
  const currentCat   = searchParams.get("cat") ?? "";
  const pathname     = usePathname();
  const isBrowse     = pathname === "/browse";

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
      {CATEGORY_PILLS.map((pill) => {
        const active = isBrowse && currentCat === pill.slug;
        return (
          <Link
            key={pill.slug}
            href={pill.slug ? `/browse?cat=${pill.slug}` : "/browse"}
            className={cn(
              "shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
              active
                ? "bg-[#0A0A0A] text-[#FAFAF7]"
                : "bg-white border border-[#E8E6DF] text-[#3A3A37] hover:border-[#C9C6BC]",
            )}
          >
            {pill.label}
          </Link>
        );
      })}
    </div>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-[#E8E6DF]">
      <div className="flex items-center gap-3 px-4 md:px-6 h-14">
        <Link href="/public" className="shrink-0">
          <span className="text-xl font-semibold tracking-tight">
            bazaar<span className="text-[#B8651E]">.</span>lv
          </span>
        </Link>

        <Suspense fallback={<div className="flex-1 max-w-xl h-9 bg-[#F3F2EE] rounded-lg animate-pulse" />}>
          <SearchBar />
        </Suspense>

        <div className="flex items-center gap-1 shrink-0">
          <Suspense fallback={null}><AuthButton /></Suspense>
          <Link href="/post" className="flex items-center gap-1.5 bg-[#0A0A0A] text-[#FAFAF7] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#3A3A37] transition-colors">
            <Plus size={15} strokeWidth={2.5} /> Ievietot
          </Link>
        </div>
      </div>

      <div className="px-4 md:px-6 pb-2">
        <Suspense fallback={null}><CategoryPills /></Suspense>
      </div>
    </header>
  );
}
