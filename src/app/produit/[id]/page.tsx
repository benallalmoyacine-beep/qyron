import { notFound } from "next/navigation";
import { getFraisLivraison, getProduit, type FraisLivraison } from "@/lib/airtable";
import VueProduit from "@/components/VueProduit";

// Voir app/boutique/page.tsx : pas de lecture Airtable pendant le build.
export const dynamic = "force-dynamic";

export default async function FicheProduit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const produit = await getProduit(id);
  if (!produit) notFound();

  let frais: FraisLivraison[];
  try {
    frais = await getFraisLivraison();
  } catch (erreur) {
    console.error("Lecture des frais de livraison impossible", erreur);
    frais = [];
  }

  return <VueProduit produit={produit} frais={frais} />;
}
