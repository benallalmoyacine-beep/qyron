import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";
import CommanderButton from "@/components/CommanderButton";

export default async function FicheProduit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produit = await getProduit(id);
  if (!produit) notFound();

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
      {produit.description && <p className="mt-2 whitespace-pre-line">{produit.description}</p>}

      <CommanderButton produit={produit} className="mt-6" />
    </div>
  );
}
