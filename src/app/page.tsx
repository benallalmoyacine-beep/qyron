import { getFraisLivraison, getProduits, type Produit } from "@/lib/airtable";
import Bandeau from "@/components/Bandeau";
import ProductCard from "@/components/ProductCard";

// Rendu à la demande : le catalogue n'est jamais lu pendant le build, donc un
// déploiement aboutit même si Airtable est indisponible ou mal configuré.
// Les réponses restent mises en cache 60 s (voir lib/airtable.ts).
export const dynamic = "force-dynamic";

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

export default async function Accueil() {
  let produits: Produit[];
  try {
    produits = await getProduits();
  } catch (erreur) {
    console.error("Lecture du catalogue impossible", erreur);
    return <Message>Catalogue momentanément indisponible</Message>;
  }

  if (produits.length === 0) {
    return <Message>Aucun produit pour le moment</Message>;
  }

  let nbWilayas = 0;
  try {
    nbWilayas = (await getFraisLivraison()).length;
  } catch {
    nbWilayas = 0;
  }

  return (
    <>
      <section className="mx-auto max-w-[100rem] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <p className="tag flex items-center gap-3 text-heat">
          <span className="h-px w-10 bg-heat" aria-hidden="true" />
          Impression 3D — Algérie
        </p>
        <h1 className="display mt-6 text-[clamp(3rem,13vw,11rem)]">Le catalogue</h1>
        <p className="chiffres tag mt-6 text-dim">
          {String(produits.length).padStart(2, "0")} pièces disponibles à la commande
        </p>
      </section>

      <Bandeau />

      <section className="mx-auto max-w-[100rem] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {produits.map((produit, i) => (
            <ProductCard key={produit.id} produit={produit} index={i + 1} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-panel/70">
        <div className="mx-auto max-w-[100rem] px-5 py-24 sm:px-8 sm:py-32">
          <p className="monte display text-[clamp(2.5rem,11vw,9rem)]">
            Conçu ici.
            <br />
            <span className="evide">Imprimé ici.</span>
            <br />
            Livré partout.
          </p>

          <div className="mt-20 grid gap-12 border-t border-line pt-12 sm:grid-cols-3">
            <Compteur valeur={String(produits.length).padStart(2, "0")} libelle="Pièces au catalogue" />
            <Compteur valeur={String(nbWilayas).padStart(2, "0")} libelle="Wilayas livrées" />
            <div className="monte">
              <p className="display text-[clamp(2rem,6vw,3.5rem)] text-heat">À la livraison</p>
              <p className="tag mt-2 text-dim">Paiement</p>
            </div>
          </div>

          <p className="tag mt-20 text-dim">QYRON — Impression 3D — Algérie</p>
        </div>
      </section>
    </>
  );
}
