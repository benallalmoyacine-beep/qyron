import { getFraisLivraison, getProduits, type Produit } from "@/lib/airtable";
import Bandeau from "@/components/Bandeau";
import HeroProduit from "@/components/HeroProduit";
import ProductCard from "@/components/ProductCard";

// Rendu à la demande : le catalogue n'est jamais lu pendant le build, donc un
// déploiement aboutit même si Airtable est indisponible ou mal configuré.
// Les réponses restent mises en cache 60 s (voir lib/airtable.ts).
export const dynamic = "force-dynamic";

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="tag flex min-h-[100dvh] items-center justify-center text-dim">
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

  // Le produit coché « Vedette » dans Airtable ouvre la page. Sans coche, le
  // premier de la liste prend sa place pour que le hero ne soit jamais vide.
  const vedette = produits.find((p) => p.vedette) ?? produits[0];
  const autres = produits.filter((p) => p.id !== vedette.id);

  return (
    <>
      <HeroProduit produit={vedette} />
      <Bandeau />

      {autres.length > 0 && (
        <section className="mx-auto max-w-[100rem] px-5 py-24 sm:px-8 sm:py-32">
          <div className="monte flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
            <h2 className="display text-[clamp(2.5rem,9vw,7rem)]">Le catalogue</h2>
            <p className="chiffres tag text-dim">
              {String(autres.length).padStart(2, "0")} pièces
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {autres.map((produit, i) => (
              <ProductCard key={produit.id} produit={produit} index={i + 1} />
            ))}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden border-t border-line bg-panel">
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

          <p className="tag mt-20 text-dim">
            QYRON — Impression 3D — Algérie
          </p>
        </div>
      </section>
    </>
  );
}
