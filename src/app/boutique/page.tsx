import { getFraisLivraison, getProduits, type Produit } from "@/lib/airtable";
import VueBoutique from "@/components/VueBoutique";

// Rendu à la demande : le catalogue n'est jamais lu pendant le build, donc un
// déploiement aboutit même si Airtable est indisponible ou mal configuré.
// Les réponses restent mises en cache 60 s (voir lib/airtable.ts).
export const dynamic = "force-dynamic";

export default async function Boutique() {
  let produits: Produit[] = [];
  let erreur = false;
  try {
    produits = await getProduits();
  } catch (e) {
    console.error("Lecture du catalogue impossible", e);
    erreur = true;
  }

  let nbWilayas = 0;
  try {
    nbWilayas = (await getFraisLivraison()).length;
  } catch {
    nbWilayas = 0;
  }

  return <VueBoutique produits={produits} nbWilayas={nbWilayas} erreur={erreur} />;
}
