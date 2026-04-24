"use client";
import { signUp, signIn } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router                  = useRouter();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("Parolei jābūt vismaz 8 simbolus garai."); return; }
    setLoading(true); setError(null);
    const { error } = await signUp.email({ name, email, password, callbackURL: "/" });
    setLoading(false);
    if (error) setError(error.message ?? "Reģistrācija neizdevās.");
    else router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7] px-4">
      <Link href="/public" className="text-2xl font-semibold tracking-tight mb-8">
        bazaar<span className="text-[#B8651E]">.</span>lv
      </Link>

      <div className="w-full max-w-sm bg-white border border-[#E8E6DF] rounded-2xl p-8">
        <h1 className="text-xl font-semibold mb-6">Izveidot kontu</h1>

        <button
          onClick={() => signIn.social({ provider: "google", callbackURL: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-[#E8E6DF] rounded-xl py-2.5 text-sm font-medium hover:bg-[#F3F2EE] transition-colors mb-5"
        >
          <GoogleIcon /> Turpināt ar Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 border-t border-[#E8E6DF]" />
          <span className="text-xs text-[#9C9A92]">vai</span>
          <div className="flex-1 border-t border-[#E8E6DF]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Vārds">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jānis Bērziņš" autoComplete="name"
              className="w-full border border-[#E8E6DF] rounded-xl px-4 py-2.5 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none" />
          </Field>
          <Field label="E-pasts" required>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tavs@epasts.lv" autoComplete="email"
              className="w-full border border-[#E8E6DF] rounded-xl px-4 py-2.5 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none" />
          </Field>
          <Field label="Parole" required>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="vismaz 8 simboli" autoComplete="new-password"
              className="w-full border border-[#E8E6DF] rounded-xl px-4 py-2.5 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none" />
          </Field>

          {error && <p className="text-sm text-[#E24B4A] bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-[#0A0A0A] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#3A3A37] transition-colors disabled:opacity-50">
            {loading ? "Reģistrējas…" : "Izveidot kontu"}
          </button>
        </form>

        <p className="text-xs text-[#9C9A92] text-center mt-4 leading-relaxed">
          Reģistrējoties, Tu piekrīti mūsu{" "}
          <Link href="/terms" className="underline">Noteikumiem</Link> un{" "}
          <Link href="/privacy" className="underline">Privātuma politikai</Link>.
        </p>
      </div>

      <p className="text-sm text-[#6B6B68] mt-6">
        Jau ir konts?{" "}
        <Link href="/login" className="text-[#B8651E] font-medium hover:underline">Ienākt</Link>
      </p>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-[#E24B4A] ml-0.5">*</span>}</label>
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
