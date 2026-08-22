export const TAILLE_MAX_ENTREE = 15 * 1024 * 1024; // 15 Mo avant compression
export const FORMATS = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const COTE_MAX = 1600; // px sur le plus grand côté
const QUALITE = 0.82;

export type Compressee = { blob: Blob; apercu: string; largeur: number; hauteur: number };

/**
 * Redimensionne et réencode l'image en JPEG dans le navigateur. Une photo de
 * téléphone de 6 Mo descend autour de 300 Ko, ce qui change tout sur une
 * connexion mobile lente.
 */
export async function compresser(fichier: File): Promise<Compressee> {
  const bitmap = await chargerBitmap(fichier);

  const echelle = Math.min(1, COTE_MAX / Math.max(bitmap.width, bitmap.height));
  const largeur = Math.round(bitmap.width * echelle);
  const hauteur = Math.round(bitmap.height * echelle);

  const canvas = document.createElement("canvas");
  canvas.width = largeur;
  canvas.height = hauteur;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas indisponible");
  ctx.drawImage(bitmap, 0, 0, largeur, hauteur);
  if ("close" in bitmap) bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITE),
  );
  if (!blob) throw new Error("compression impossible");

  return { blob, apercu: canvas.toDataURL("image/jpeg", 0.6), largeur, hauteur };
}

async function chargerBitmap(fichier: File): Promise<ImageBitmap | HTMLImageElement> {
  // createImageBitmap applique l'orientation EXIF et évite de charger l'image
  // deux fois. Safari ancien ne le propose pas : on retombe sur <img>.
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(fichier, { imageOrientation: "from-image" });
    } catch {
      // HEIC non décodable par ce navigateur : on tente la voie <img>.
    }
  }

  const url = URL.createObjectURL(fichier);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("image illisible"));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
