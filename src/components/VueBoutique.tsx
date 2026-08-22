"use client";

import type { Produit } from "@/lib/airtable";
import { useT } from "@/lib/langue";
import Bandeau from "@/components/Bandeau";
import Catalogue from "@/components/Catalogue";

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="tag flex min-h-[60dvh] items-center justify-center text-dim">
      <p>{children}</p>
    </div>
  );
}

function Compteur({ valeur, libelle }: { valeur: string; libelle: string }) {
  return (
    <div className="monte">
      <p className="chiffres display text-[clamp(3rem,10vw,6rem)] text-heat">{valeur}</p>
      <p className="tag mt-2 text-dim">{libelle}</p>
    </div>
  );
}

export default function VueBoutique({
  produits,
  nbWilayas,
  erreur,
}: {
  produits: Produit[];
  nbWilayas: number;
  erreur: boolean;
}) {
  const t = useT();

  if (erreur) return <Message>{t.catalogueIndisponible}</Message>;
  if (produits.length === 0) return <Message>{t.aucunProduit}</Message>;

  return (
    <>
      <section className="mx-auto max-w-[100rem] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <p className="tag flex items-center gap-3 text-heat">
          <span className="h-px w-10 bg-heat" aria-hidden="true" />
          {t.impression3d}
        </p>
        <h1 className="display mt-6 text-[clamp(3rem,13vw,11rem)]">{t.catalogue}</h1>
      </section>

      <Bandeau />

      <section className="mx-auto max-w-[100rem] px-5 py-16 sm:px-8 sm:py-24">
        <Catalogue produits={produits} />
      </section>

      <section className="relative overflow-hidden border-t border-line bg-panel/70">
        <div className="mx-auto max-w-[100rem] px-5 py-24 sm:px-8 sm:py-32">
          <p className="monte display text-[clamp(2.5rem,11vw,9rem)]">
            {t.signature1}
            <br />
            <span className="evide">{t.signature2}</span>
            <br />
            {t.signature3}
          </p>

          <div className="mt-20 grid gap-12 border-t border-line pt-12 sm:grid-cols-3">
            <Compteur valeur={String(produits.length).padStart(2, "0")} libelle={t.piecesCatalogue} />
            <Compteur valeur={String(nbWilayas).padStart(2, "0")} libelle={t.wilayasLivrees} />
            <div className="monte">
              <p className="display text-[clamp(2rem,6vw,3.5rem)] text-heat">{t.aLaLivraison}</p>
              <p className="tag mt-2 text-dim">{t.paiement}</p>
            </div>
          </div>

          <p className="tag mt-20 text-dim">{t.marque}</p>
        </div>
      </section>
    </>
  );
}
