"use client";

import { useT } from "@/lib/langue";
import FormulairePersonnalise from "./FormulairePersonnalise";

export default function VuePersonnalise({ instagram }: { instagram: string }) {
  const t = useT();

  return (
    <div className="mx-auto max-w-[90rem] px-5 pb-28 pt-6 sm:px-8 sm:pt-10">
      <p className="tag text-dim">QYRON</p>

      <h1 className="display mt-3 text-[clamp(1.75rem,5vw,3rem)]">{t.persoTitre}</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-dim sm:text-base">{t.persoSous}</p>

      <FormulairePersonnalise instagram={instagram} />
    </div>
  );
}
