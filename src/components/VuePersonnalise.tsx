"use client";

import { useT } from "@/lib/langue";
import FormulairePersonnalise from "./FormulairePersonnalise";

export default function VuePersonnalise({ instagram }: { instagram: string }) {
  const t = useT();

  return (
    <div className="mx-auto max-w-[100rem] px-5 pb-32 pt-32 sm:px-8 sm:pt-40">
      <p className="tag flex items-center gap-3 text-heat">
        <span className="h-px w-10 bg-heat" aria-hidden="true" />
        QYRON
      </p>

      <h1 className="display mt-6 text-[clamp(2.5rem,11vw,8rem)]">{t.persoTitre}</h1>
      <p className="mt-4 max-w-xl text-dim">{t.persoSous}</p>

      <FormulairePersonnalise instagram={instagram} />
    </div>
  );
}
