import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

/** Comparaison à durée constante : ne révèle pas la clé caractère par caractère. */
function cleValide(fournie: string) {
  const attendue = process.env.PHOTO_ACCESS_KEY ?? "";
  if (!attendue) return false;

  const a = Buffer.from(fournie);
  const b = Buffer.from(attendue);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Sert une photo stockée en privé sur Vercel Blob. C'est le seul chemin de
 * lecture : l'URL brute du blob n'est accessible à personne. Changer
 * PHOTO_ACCESS_KEY invalide d'un coup tous les liens déjà envoyés.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const pathname = params.get("p") ?? "";
  const cle = params.get("k") ?? "";

  if (!pathname || !cleValide(cle)) {
    return new NextResponse("Accès refusé", { status: 403 });
  }

  try {
    const resultat = await get(pathname, { access: "private" });
    if (!resultat || resultat.statusCode !== 200) {
      return new NextResponse("Introuvable", { status: 404 });
    }

    return new NextResponse(resultat.stream, {
      headers: {
        "Content-Type": resultat.blob.contentType || "image/jpeg",
        "Content-Length": String(resultat.blob.size),
        // Jamais mis en cache par un intermédiaire : ce sont des photos de
        // personnes, servies derrière une clé.
        "Cache-Control": "private, no-store",
        "Content-Disposition": "inline",
      },
    });
  } catch (erreur) {
    console.error("Lecture photo impossible", erreur);
    return new NextResponse("Introuvable", { status: 404 });
  }
}
