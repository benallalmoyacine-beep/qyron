import { getFraisLivraison } from "@/lib/airtable";
import CommandeForm from "./CommandeForm";

export default async function Commande() {
  const frais = await getFraisLivraison();
  return <CommandeForm frais={frais} />;
}
