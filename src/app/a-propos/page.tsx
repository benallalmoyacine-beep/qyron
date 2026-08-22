import { getContenu, type Bloc } from "@/lib/airtable";
import VueAPropos from "@/components/VueAPropos";

// Voir app/boutique/page.tsx : pas de lecture Airtable pendant le build.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "À propos — QYRON",
};

export default async function APropos() {
  let blocs: Bloc[] = [];
  try {
    blocs = await getContenu("a-propos");
  } catch (erreur) {
    console.error("Lecture du contenu impossible", erreur);
  }

  return <VueAPropos blocs={blocs} />;
}
