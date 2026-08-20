import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFraisLivraison, getProduit, type FraisLivraison } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";
import DetailsLivraison from "@/components/DetailsLivraison";
import Statut from "@/components/Statut";

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
    <article className="mx-auto max-w-[100rem] px-5 pb-32 pt-24 sm:px-8">
      <Link
        href="/"
        className="tag inline-flex min-h-11 items-center gap-2 text-dim transition-colors duration-200 hover:text-heat"
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
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Catalogue
      </Link>

      <h1 className="display mt-6 text-[clamp(3rem,13vw,11rem)]">{produit.nom}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="space-y-4">
          {produit.photos.map((photo, i) => (
            <div key={photo} className="relative aspect-[4/5] overflow-hidden rounded-sm bg-tile">
              <Image
                src={photo}
                alt={
                  produit.photos.length > 1
                    ? `${produit.nom} — vue ${i + 1} sur ${produit.photos.length}`
                    : produit.nom
                }
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="chiffres display text-[clamp(2.5rem,8vw,4.5rem)] text-heat">
            {formatPrix(produit.prix)}
          </p>

          {produit.description && (
            <p className="mt-6 whitespace-pre-line text-dim">{produit.description}</p>
          )}

          <dl className="mt-10 border-t border-line">
            {produit.dimensions && (
              <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="tag text-dim">Dimensions</dt>
                <dd className="chiffres">{produit.dimensions} cm</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="tag text-dim">Couleurs</dt>
              <dd className="text-right">Toutes les couleurs</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="tag text-dim">Statut</dt>
              <dd>
                <Statut disponible={produit.disponible} />
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="tag text-dim">Paiement</dt>
              <dd className="text-right">À la livraison</dd>
            </div>
          </dl>

          <DetailsLivraison frais={frais} />
        </div>
      </div>
    </article>
  );
}
