"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function GridIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="11" y="3" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="3" y="11" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="11" y="11" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6" stroke={color} strokeWidth="1.7" fill="none"/>
      <line x1="14" y1="14" x2="19" y2="19" stroke={color} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <line x1="10" y1="3" x2="10" y2="17" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="17" y2="10" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function ChatIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path d="M3 6C3 4.3 4.3 3 6 3H14C15.7 3 17 4.3 17 6V11C17 12.7 15.7 14 14 14H9L5 17V14H6C4.3 14 3 12.7 3 11V6Z" stroke={color} strokeWidth="1.6" fill="none"/>
    </svg>
  );
}

function UserIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="4" stroke={color} strokeWidth="1.6" fill="none"/>
      <path d="M3 18C3 14.7 6.1 12 10 12C13.9 12 17 14.7 17 18" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

const LEFT_TABS  = [
  { href: "/",       label: "Sākums",  Icon: GridIcon   },
  { href: "/browse", label: "Meklēt", Icon: SearchIcon },
];
const RIGHT_TABS = [
  { href: "/messages",  label: "Ziņas",  Icon: ChatIcon },
  { href: "/dashboard", label: "Profils", Icon: UserIcon },
];

export function MobileNav() {
  const pathname = usePathname();

  function TabItem({ href, label, Icon }: { href: string; label: string; Icon: React.ComponentType<{ color: string }> }) {
    const active = pathname === href;
    const color  = active ? "#B8651E" : "#6B6B68";
    return (
      <Link href={href} className="flex flex-col items-center gap-0.5 px-2 py-1">
        <Icon color={color} />
        <span style={{ fontSize: 9.5, color, fontWeight: active ? 600 : 400 }}>{label}</span>
      </Link>
    );
  }

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E6DF] z-50 flex items-center justify-around"
      style={{ paddingTop: 8, paddingBottom: "max(8px, env(safe-area-inset-bottom, 12px))" }}
    >
      {LEFT_TABS.map((t) => (
        <TabItem key={t.href} {...t} />
      ))}

      {/* CTA */}
      <Link
        href="/post"
        className="flex items-center justify-center"
        style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "#B8651E",
          marginTop: -20,
          boxShadow: "0 4px 16px rgba(184,101,30,0.4)",
        }}
        aria-label="Ievietot sludinājumu"
      >
        <PlusIcon />
      </Link>

      {RIGHT_TABS.map((t) => (
        <TabItem key={t.href} {...t} />
      ))}
    </div>
  );
}
