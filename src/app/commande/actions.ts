"use server";

import { createCommande, getFraisLivraison, getProduits } from "@/lib/airtable";

export type LigneCommande = { id: string; quantite: number };

export type ResultatCommande = { ok: true; numero: string } | { ok: false; erreur: string };

export async function passerCommande(
  lignes: LigneCommande[],
  form: {
    nom: string;
    telephone: string;
    wilaya: string;
    commune: string;
    adresse: string;
    modeLivraison: "Domicile" | "Bureau";
  },
): Promise<ResultatCommande> {
  if (lignes.length === 0) return { ok: false, erreur: "Votre panier est vide." };
  if (!form.nom.trim() || !form.telephone.trim() || !form.wilaya || !form.commune || !form.adresse.trim()) {
    return { ok: false, erreur: "Merci de remplir tous les champs." };
  }

  const produits = await getProduits();
  const resume: string[] = [];
  let sousTotal = 0;

  for (const ligne of lignes) {
    const produit = produits.find((p) => p.id === ligne.id);
    if (!produit) return { ok: false, erreur: "Un produit du panier n'existe plus." };
    if (!produit.disponible) {
      return { ok: false, erreur: `« ${produit.nom} » n'est plus disponible.` };
    }
    const quantite = Math.max(1, Math.floor(ligne.quantite));
    sousTotal += produit.prix * quantite;
    resume.push(`${produit.nom} x${quantite} — ${produit.prix} DA`);
  }

  const frais = await getFraisLivraison();
  const tarif = frais.find((f) => f.wilaya === form.wilaya);
  const fraisLivraison = form.modeLivraison === "Bureau" ? (tarif?.bureau ?? 0) : (tarif?.domicile ?? 0);

  try {
    const numero = await createCommande({
      produits: resume.join("\n"),
      total: sousTotal + fraisLivraison,
      fraisLivraison,
      nom: form.nom.trim(),
      telephone: form.telephone.trim(),
      wilaya: form.wilaya,
      commune: form.commune,
      adresse: form.adresse.trim(),
      modeLivraison: form.modeLivraison,
    });
    return { ok: true, numero };
  } catch {
    return { ok: false, erreur: "La commande n'a pas pu être enregistrée. Réessayez." };
  }
}
