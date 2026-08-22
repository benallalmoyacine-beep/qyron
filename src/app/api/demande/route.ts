import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { createDemande } from "@/lib/airtable";

export const runtime = "nodejs";

const TAILLE_MAX = 6 * 1024 * 1024; // après compression côté client
const TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Empêche qu'un nom saisi devienne un chemin ou un fragment d'URL. */
function nettoyer(valeur: string) {
  return valeur.replace(/[\r\n\t]/g, " ").trim().slice(0, 80);
}

function segmentFichier(valeur: string) {
  return (
    valeur
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase()
      .slice(0, 40) || "sans-nom"
  );
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ erreur: "requete-invalide" }, { status: 400 });
  }

  const photo = form.get("photo");
  const prenom = nettoyer(String(form.get("prenom") ?? ""));
  const nom = nettoyer(String(form.get("nom") ?? ""));

  if (!prenom || !nom) {
    return NextResponse.json({ erreur: "champs-manquants" }, { status: 400 });
  }
  if (!(photo instanceof File)) {
    return NextResponse.json({ erreur: "photo-manquante" }, { status: 400 });
  }
  if (!TYPES.includes(photo.type)) {
    return NextResponse.json({ erreur: "format-refuse" }, { status: 415 });
  }
  if (photo.size > TAILLE_MAX) {
    return NextResponse.json({ erreur: "trop-lourd" }, { status: 413 });
  }

  try {
    // Stockage privé : le fichier n'est jamais lisible depuis son URL brute.
    const blob = await put(
      `demandes/${segmentFichier(prenom)}-${segmentFichier(nom)}.jpg`,
      photo,
      { access: "private", addRandomSuffix: true, contentType: "image/jpeg" },
    );

    // Airtable reçoit un lien vers notre route de lecture, seule capable de
    // servir le fichier. La clé se change pour révoquer tous les liens.
    const base = process.env.SITE_URL ?? new URL(request.url).origin;
    const cle = process.env.PHOTO_ACCESS_KEY ?? "";
    const lien = `${base}/api/photo?p=${encodeURIComponent(blob.pathname)}&k=${encodeURIComponent(cle)}`;

    await createDemande({ prenom, nom, urlPhoto: lien });

    return NextResponse.json({ ok: true });
  } catch (erreur) {
    console.error("Demande personnalisée : échec", erreur);
    return NextResponse.json({ erreur: "envoi-echoue" }, { status: 502 });
  }
}
