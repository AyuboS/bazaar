"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Upload, X, Check } from "lucide-react";
import { CITIES } from "@/lib/constants";
import { ExchangeSpinner } from "@/components/ui/ExchangeSpinner";
import type { CategoryGrouped } from "@/db/queries";

type SubCat = CategoryGrouped["children"][number];

type Step = 1 | 2 | 3;

export function PostForm({ categories }: { categories: CategoryGrouped[] }) {
  const router = useRouter();

  const [step, setStep]                   = useState<Step>(1);
  const [selectedParent, setSelectedParent] = useState<CategoryGrouped | null>(null);
  const [selectedSub, setSelectedSub]     = useState<SubCat | null>(null);
  const [title, setTitle]                 = useState("");
  const [description, setDescription]     = useState("");
  const [price, setPrice]                 = useState("");
  const [negotiable, setNegotiable]       = useState(false);
  const [city, setCity]                   = useState<string>(CITIES[0]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles]       = useState<File[]>([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);

  const selectedCat = selectedSub ?? (selectedParent?.children.length === 0 ? selectedParent : null);

  function addImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 12 - imageFiles.length);
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  }

  function removeImage(i: number) {
    URL.revokeObjectURL(imagePreviews[i]);
    setImageFiles((prev) => prev.filter((_, j) => j !== i));
    setImagePreviews((prev) => prev.filter((_, j) => j !== i));
  }

  function pickParent(cat: CategoryGrouped) {
    setSelectedParent(cat);
    setSelectedSub(null);
    if (cat.children.length === 0) setStep(2);
  }

  function pickSub(sub: SubCat) {
    setSelectedSub(sub);
    setStep(2);
  }

  async function handlePublish() {
    if (!selectedCat || !title.trim()) { setError("Nosaukums ir obligāts."); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId:  selectedCat.id,
          title:       title.trim(),
          description: description.trim(),
          priceCents:  price ? Math.round(parseFloat(price) * 100) : null,
          negotiable,
          city,
          images:      [],
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Kļūda.");
      const { id } = await res.json();
      router.push(`/listing/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nezināma kļūda.");
    } finally { setLoading(false); }
  }

  const catLabel = selectedSub
    ? `${selectedParent?.nameLv} › ${selectedSub.nameLv}`
    : selectedParent?.nameLv ?? "";

  const steps = ["Kategorija", "Informācija", "Publicēt"];

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {([1, 2, 3] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${s <= step ? "bg-[#0A0A0A] text-white" : "bg-[#E8E6DF] text-[#9C9A92]"}`}>{s}</div>
            <span className={`text-xs hidden sm:inline ${s <= step ? "text-[#0A0A0A]" : "text-[#9C9A92]"}`}>{steps[i]}</span>
            {s < 3 && <div className={`flex-1 h-0.5 rounded ${s < step ? "bg-[#0A0A0A]" : "bg-[#E8E6DF]"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — Category picker */}
      {step === 1 && (
        <div>
          {!selectedParent ? (
            <>
              <h1 className="text-xl font-semibold mb-1">Izvēlies kategoriju</h1>
              <p className="text-sm text-[#6B6B68] mb-6">Kādā kategorijā vēlies ievietot sludinājumu?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => pickParent(cat)}
                    className="flex items-center justify-between px-4 py-3 bg-white border border-[#E8E6DF] rounded-xl text-sm font-medium hover:border-[#C9C6BC] hover:bg-[#FAFAF7] transition-all text-left">
                    <span className="truncate">{cat.nameLv}</span>
                    <ChevronRight size={14} className="text-[#9C9A92] shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setSelectedParent(null)} className="text-sm text-[#6B6B68] mb-4 hover:text-[#0A0A0A] transition-colors">
                ← Atpakaļ
              </button>
              <h1 className="text-xl font-semibold mb-1">{selectedParent.nameLv}</h1>
              <p className="text-sm text-[#6B6B68] mb-5">Izvēlies apakškategoriju</p>
              <div className="space-y-1.5">
                {selectedParent.children.map((sub) => (
                  <button key={sub.id} onClick={() => pickSub(sub)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E8E6DF] rounded-xl text-sm font-medium hover:border-[#B8651E] hover:bg-[#FAEEDA]/40 transition-all text-left group">
                    {sub.nameLv}
                    <ChevronRight size={14} className="text-[#9C9A92] group-hover:text-[#B8651E] shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 2 — Details */}
      {step === 2 && selectedCat && (
        <div>
          <button onClick={() => { setStep(1); if (selectedSub) setSelectedSub(null); }}
            className="text-sm text-[#6B6B68] mb-4 hover:text-[#0A0A0A] transition-colors">
            ← Mainīt kategoriju
          </button>
          <div className="inline-flex items-center gap-1.5 bg-[#FAEEDA] text-[#9A5219] text-xs font-medium px-3 py-1 rounded-full mb-5">
            <Check size={11} /> {catLabel}
          </div>
          <h1 className="text-xl font-semibold mb-6">Sludinājuma informācija</h1>
          <div className="space-y-5">
            <Field label="Nosaukums" required>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="piem. BMW 320d, 2019" maxLength={120}
                className="w-full border border-[#E8E6DF] rounded-xl px-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white" />
              <p className="text-xs text-[#9C9A92] mt-1">{title.length}/120</p>
            </Field>

            <Field label="Apraksts">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} maxLength={3000}
                placeholder="Apraksti preci vai pakalpojumu…"
                className="w-full border border-[#E8E6DF] rounded-xl px-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white resize-none" />
            </Field>

            <Field label="Cena (€)">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6B6B68]">€</span>
                  <input type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00"
                    className="w-full border border-[#E8E6DF] rounded-xl pl-8 pr-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white" />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer shrink-0">
                  <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="w-4 h-4 accent-[#B8651E]" />
                  Sarunājama
                </label>
              </div>
            </Field>

            <Field label="Pilsēta" required>
              <select value={city} onChange={(e) => setCity(e.target.value)}
                className="w-full border border-[#E8E6DF] rounded-xl px-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none bg-white appearance-none">
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <Field label="Fotoattēli (līdz 12)">
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-[#F3F2EE]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center">
                        <X size={10} />
                      </button>
                      {i === 0 && <div className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1 rounded">Galvenā</div>}
                    </div>
                  ))}
                </div>
              )}
              {imagePreviews.length < 12 && (
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E8E6DF] rounded-xl py-8 cursor-pointer hover:border-[#B8651E] hover:bg-[#FAEEDA]/30 transition-colors">
                  <Upload size={20} className="text-[#9C9A92]" />
                  <span className="text-sm text-[#6B6B68]">Augšupielādēt fotoattēlus</span>
                  <span className="text-xs text-[#9C9A92]">JPG, PNG līdz 4MB</span>
                  <input type="file" accept="image/*" multiple onChange={addImages} className="sr-only" />
                </label>
              )}
            </Field>
          </div>

          <button onClick={() => { if (!title.trim()) { setError("Nosaukums ir obligāts."); return; } setError(null); setStep(3); }}
            className="w-full mt-8 bg-[#0A0A0A] text-white py-3.5 rounded-xl text-sm font-medium hover:bg-[#3A3A37] transition-colors">
            Turpināt
          </button>
          {error && <p className="text-sm text-[#E24B4A] mt-3">{error}</p>}
        </div>
      )}

      {/* Step 3 — Review & publish */}
      {step === 3 && (
        <div>
          <button onClick={() => setStep(2)} className="text-sm text-[#6B6B68] mb-4 hover:text-[#0A0A0A] transition-colors">
            ← Labot informāciju
          </button>
          <h1 className="text-xl font-semibold mb-6">Pārskatīt un publicēt</h1>
          <div className="bg-white border border-[#E8E6DF] rounded-xl p-5 space-y-3 mb-6 text-sm">
            <Row label="Kategorija" value={catLabel} />
            <Row label="Nosaukums"  value={title} />
            <Row label="Cena"       value={price ? `€${price}${negotiable ? " (sarunājama)" : ""}` : "Nav norādīta"} />
            <Row label="Pilsēta"    value={city} />
            <Row label="Foto"       value={`${imagePreviews.length} pievienoti`} />
          </div>
          <div className="bg-[#FAEEDA] rounded-xl px-5 py-4 text-sm text-[#9A5219] mb-6">
            Sludinājums būs aktīvs 30 dienas.
          </div>
          {error && <p className="text-sm text-[#E24B4A] mb-4">{error}</p>}
          <button onClick={handlePublish} disabled={loading}
            className="w-full bg-[#B8651E] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#9A5219] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <ExchangeSpinner size={16} />}
            {loading ? "Publicē…" : "Publicēt sludinājumu"}
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}{required && <span className="text-[#E24B4A] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#6B6B68] shrink-0">{label}</span>
      <span className="font-medium text-right truncate">{value}</span>
    </div>
  );
}
