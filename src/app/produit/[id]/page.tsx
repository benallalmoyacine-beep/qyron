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
    <article className="mx-auto max-w-2xl">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-opacity duration-200 hover:opacity-60"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Tous les produits
      </Link>

      <div className="mt-2 space-y-3">
        {produit.photos.map((photo, i) => (
          <div
            key={photo}
            className="relative aspect-square overflow-hidden rounded-2xl bg-surface ring-1 ring-line"
          >
            <Image
              src={photo}
              alt={
                produit.photos.length > 1
                  ? `${produit.nom} — vue ${i + 1} sur ${produit.photos.length}`
                  : produit.nom
              }
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <header className="mt-8">
        <h1 className="text-2xl font-semibold leading-tight">{produit.nom}</h1>
        <p className="chiffres mt-1.5 text-xl text-accent">{formatPrix(produit.prix)}</p>
        {!produit.disponible && (
          <p className="mt-2 inline-block rounded-full bg-ink/85 px-2.5 py-1 text-xs font-medium text-white">
            Indisponible
          </p>
        )}
      </header>

      {produit.description && (
        <p className="mt-6 whitespace-pre-line text-muted">{produit.description}</p>
      )}

      <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
        {produit.dimensions && (
          <div className="flex justify-between gap-6 py-3">
            <dt className="text-muted">Dimensions</dt>
            <dd className="chiffres text-right">{produit.dimensions} cm</dd>
          </div>
        )}
        <div className="flex justify-between gap-6 py-3">
          <dt className="text-muted">Couleurs</dt>
          <dd className="text-right">Toutes les couleurs sont disponibles</dd>
        </div>
      </dl>

      <DetailsLivraison frais={frais} />
    </article>
  );
}
