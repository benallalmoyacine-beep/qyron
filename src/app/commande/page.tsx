import { getFraisLivraison, type FraisLivraison } from "@/lib/airtable";
import CommandeForm from "./CommandeForm";

// Voir app/page.tsx : pas de lecture Airtable pendant le build.
export const dynamic = "force-dynamic";

export default async function Commande() {
  let frais: FraisLivraison[];
  try {
    frais = await getFraisLivraison();
  } catch (erreur) {
    console.error("Lecture des frais de livraison impossible", erreur);
    frais = [];
  }
  return <CommandeForm frais={frais} />;
}
