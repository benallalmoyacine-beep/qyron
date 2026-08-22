"use client";

import type { Bloc } from "@/lib/airtable";
import { useT } from "@/lib/langue";

export default function VueAPropos({ blocs }: { blocs: Bloc[] }) {
  const t = useT();

  return (
    <article className="mx-auto max-w-[90rem] px-5 pb-28 pt-12 sm:px-8 sm:pt-20">
      <p className="tag text-dim">QYRON</p>
      <h1 className="display mt-5 text-[clamp(2.5rem,7vw,5rem)]">{t.aPropos}</h1>

      {blocs.length === 0 ? (
        <p className="mt-16 max-w-2xl text-dim">
          Le contenu de cette page se rédige depuis la table « Contenu » d&apos;Airtable.
        </p>
      ) : (
        <div className="mt-20 space-y-16 border-t border-line pt-12">
          {blocs.map((bloc) => (
            <section
              key={bloc.titre + bloc.ordre}
              className="monte grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12"
            >
              {bloc.titre && <h2 className="display text-2xl sm:text-3xl">{bloc.titre}</h2>}
              <p className="max-w-prose whitespace-pre-line leading-relaxed text-dim">{bloc.texte}</p>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
