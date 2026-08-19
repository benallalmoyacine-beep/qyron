import Image from "next/image";
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
    <div className="mx-auto max-w-xl">
      <div className="space-y-3">
        {produit.photos.map((photo, i) => (
          <div key={photo} className="relative aspect-square overflow-hidden bg-white">
            <Image
              src={photo}
              alt={produit.nom}
              fill
              sizes="(max-width: 768px) 100vw, 576px"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <h1 className="mt-6 text-xl font-semibold">{produit.nom}</h1>
      <p className="mt-1 text-accent">{formatPrix(produit.prix)}</p>

      {produit.dimensions && <p className="mt-4 text-muted">{produit.dimensions} cm</p>}
      <p className="mt-1 text-muted">Toutes les couleurs sont disponibles.</p>
      {!produit.disponible && <p className="mt-1 text-muted">Indisponible</p>}

      {produit.description && <p className="mt-4 whitespace-pre-line">{produit.description}</p>}

      <DetailsLivraison frais={frais} />
    </div>
  );
}
