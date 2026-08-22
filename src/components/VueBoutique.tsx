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
      <p className="chiffres display text-[clamp(2.5rem,7vw,4rem)]">{valeur}</p>
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
      <section className="mx-auto max-w-[90rem] px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-20">
        <p className="tag text-dim">{t.impression3d}</p>

        {/* Titre a deux tons : la seconde ligne en gris, comme sur la
            reference. Le contraste de ton porte la hierarchie. */}
        <h1 className="display mt-5 text-[clamp(2.75rem,8vw,6rem)]">
          {t.catalogue}
          <br />
          <span className="evide">{t.signature3}</span>
        </h1>
      </section>

      <Bandeau />

      <section className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20">
        <Catalogue produits={produits} />
      </section>

      {/* Bandeau large arrondi, avec les chiffres de la boutique. */}
      <section className="mx-auto max-w-[90rem] px-5 pb-24 sm:px-8">
        <div className="carte rounded-3xl bg-panel px-6 py-14 sm:px-12 sm:py-20">
          <p className="monte display text-[clamp(1.75rem,5vw,3.25rem)]">
            {t.signature1}
            <br />
            <span className="evide">{t.signature2}</span>
          </p>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
            <Compteur
              valeur={String(produits.length).padStart(2, "0")}
              libelle={t.piecesCatalogue}
            />
            <Compteur valeur={String(nbWilayas).padStart(2, "0")} libelle={t.wilayasLivrees} />
            <div className="monte">
              <p className="display text-[clamp(1.5rem,4vw,2.25rem)]">{t.aLaLivraison}</p>
              <p className="tag mt-2 text-dim">{t.paiement}</p>
            </div>
          </div>
        </div>

        <p className="tag mt-10 text-center text-dim">{t.marque}</p>
      </section>
    </>
  );
}
