import { getProduits, type Produit } from "@/lib/airtable";
import HeroProduit from "@/components/HeroProduit";
import ProductCard from "@/components/ProductCard";

// Rendu à la demande : le catalogue n'est jamais lu pendant le build, donc un
// déploiement aboutit même si Airtable est indisponible ou mal configuré.
// Les réponses restent mises en cache 60 s (voir lib/airtable.ts).
export const dynamic = "force-dynamic";

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="tag py-32 text-center text-dim">
      <p>{children}</p>
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

  // Le produit coché « Vedette » dans Airtable ouvre la page. Sans coche, le
  // premier de la liste prend sa place pour que le hero ne soit jamais vide.
  const vedette = produits.find((p) => p.vedette) ?? produits[0];
  const autres = produits.filter((p) => p.id !== vedette.id);

  return (
    <>
      <HeroProduit produit={vedette} />

      {autres.length > 0 && (
        <section className="mt-16">
          <div className="flex items-baseline justify-between gap-4 border-b border-line/50 pb-4">
            <h2 className="display text-3xl sm:text-4xl">Le reste</h2>
            <p className="chiffres tag text-dim">
              [ {String(autres.length).padStart(2, "0")} pièces ]
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4">
            {autres.map((produit) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-24 border-t border-line/50 pt-10">
        <p className="display text-[clamp(1.75rem,6vw,3rem)]">
          Conçu ici.
          <br />
          Imprimé ici.
          <br />
          Livré partout.
        </p>
        <p className="tag mt-6 text-dim">[ QYRON — Algérie ]</p>
      </section>
    </>
  );
}
