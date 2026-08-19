import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFraisLivraison, getProduit, type FraisLivraison } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";
import DetailsLivraison from "@/components/DetailsLivraison";

// Voir app/page.tsx : pas de lecture Airtable pendant le build.
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

  return (
    <article className="pt-4">
      <Link
        href="/"
        className="tag inline-flex min-h-11 items-center gap-2 text-dim transition-opacity duration-200 hover:opacity-70"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Retour
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
        <div className="space-y-3">
          {produit.photos.map((photo, i) => (
            <div key={photo} className="relative aspect-square overflow-hidden rounded-sm bg-tile">
              <Image
                src={photo}
                alt={
                  produit.photos.length > 1
                    ? `${produit.nom} — vue ${i + 1} sur ${produit.photos.length}`
                    : produit.nom
                }
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="md:sticky md:top-20 md:self-start">
          <h1 className="display text-[clamp(2rem,7vw,3.25rem)]">{produit.nom}</h1>
          <p className="chiffres display mt-3 text-2xl">{formatPrix(produit.prix)}</p>

          {!produit.disponible && (
            <p className="tag mt-4 inline-block bg-deep/85 px-2.5 py-1.5">Indisponible</p>
          )}

          {produit.description && (
            <p className="mt-6 whitespace-pre-line text-dim">{produit.description}</p>
          )}

          <dl className="mt-8 border-t border-line/50">
            {produit.dimensions && (
              <div className="flex items-baseline justify-between gap-6 border-b border-line/50 py-3">
                <dt className="tag text-dim">Dimensions</dt>
                <dd className="chiffres">{produit.dimensions} cm</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-6 border-b border-line/50 py-3">
              <dt className="tag text-dim">Couleurs</dt>
              <dd className="text-right">Toutes les couleurs</dd>
            </div>
          </dl>

          <DetailsLivraison frais={frais} />
        </div>
      </div>
    </article>
  );
}
