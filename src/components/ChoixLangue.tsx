"use client";

import { useLangue } from "@/lib/langue";
import { TEXTES } from "@/lib/traductions";

/** Écran affiché à la première visite, tant qu'aucune langue n'est choisie. */
export default function ChoixLangue() {
  const { choisie, choisir } = useLangue();
  if (choisie) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titre-langue"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10 bg-void px-6"
    >
      <p className="display text-3xl tracking-[0.18em]">QYRON</p>

      <h1 id="titre-langue" className="tag text-center text-dim">
        {TEXTES.fr.choisirLangue} / {TEXTES.en.choisirLangue}
      </h1>

      <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => choisir("fr")}
          className="display flex min-h-16 flex-1 items-center justify-center rounded-full border border-line text-2xl transition-colors duration-200 hover:border-heat hover:text-heat"
        >
          {TEXTES.fr.francais}
        </button>
        <button
          type="button"
          onClick={() => choisir("en")}
          className="display flex min-h-16 flex-1 items-center justify-center rounded-full border border-line text-2xl transition-colors duration-200 hover:border-heat hover:text-heat"
        >
          {TEXTES.en.anglais}
        </button>
      </div>
    </div>
  );
}
