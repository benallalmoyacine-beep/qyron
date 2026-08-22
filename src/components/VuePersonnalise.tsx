"use client";

import { useT } from "@/lib/langue";
import FormulairePersonnalise from "./FormulairePersonnalise";

export default function VuePersonnalise({ instagram }: { instagram: string }) {
  const t = useT();

  return (
    <div className="mx-auto max-w-[90rem] px-5 pb-28 pt-12 sm:px-8 sm:pt-20">
      <p className="tag text-dim">QYRON</p>

      <h1 className="display mt-5 text-[clamp(2.25rem,6.5vw,4.5rem)]">{t.persoTitre}</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-dim">{t.persoSous}</p>

      <FormulairePersonnalise instagram={instagram} />
    </div>
  );
}
