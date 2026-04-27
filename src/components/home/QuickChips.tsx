"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CHIPS = [
  "Automašīnas", "Dzīvokļi īrē", "iPhone", "Velosipēdi", "Mēbeles",
  "Suni", "Klēpjdatori", "Vakances Rīgā", "Bērnu ratiņi", "Elektroinstrumenti",
  "Apavi", "Mājas", "Planšetes", "Darba apģērbs", "Kaķi",
];

export function QuickChips() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  function handleChip(chip: string) {
    setActive(chip);
    router.push(`/browse?q=${encodeURIComponent(chip)}`);
  }

  return (
    <div className="bg-[#FAFAF7] border-b border-[#E8E6DF]">
      <div className="max-w-[1200px] mx-auto px-5 py-3">
        <div className="hscroll">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              className="flex-shrink-0 text-[12px] font-medium px-[14px] py-[7px] rounded-[20px] cursor-pointer transition-all duration-150 whitespace-nowrap"
              style={{
                background:   active === chip ? "#0A0A0A" : "#FFFFFF",
                border:       `1.5px solid ${active === chip ? "#0A0A0A" : "#E8E6DF"}`,
                color:        active === chip ? "#FFFFFF" : "#0A0A0A",
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
