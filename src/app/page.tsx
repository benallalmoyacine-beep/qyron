import { getProduits } from "@/lib/airtable";
import ProductCard from "@/components/ProductCard";

export default async function Accueil() {
  const produits = await getProduits();

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
      {produits.map((produit) => (
        <ProductCard key={produit.id} produit={produit} />
      ))}
    </div>
  );
}
