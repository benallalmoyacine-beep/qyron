import { getProduits, type Produit } from "@/lib/airtable";
import ProductCard from "@/components/ProductCard";

// Rendu à la demande : le catalogue n'est jamais lu pendant le build, donc un
// déploiement aboutit même si Airtable est indisponible ou mal configuré.
// Les réponses restent mises en cache 60 s (voir lib/airtable.ts).
export const dynamic = "force-dynamic";

export default async function Accueil() {
  let produits: Produit[];
  try {
    produits = await getProduits();
  } catch (erreur) {
    console.error("Lecture du catalogue impossible", erreur);
    return <p className="text-muted">Catalogue momentanément indisponible.</p>;
  }

  if (produits.length === 0) {
    return <p className="text-muted">Aucun produit pour le moment.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
      {produits.map((produit) => (
        <ProductCard key={produit.id} produit={produit} />
      ))}
    </div>
  );
}
