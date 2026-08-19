import Image from "next/image";
import Link from "next/link";
import type { Produit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";

export default function ProductCard({ produit }: { produit: Produit }) {
  return (
    <Link href={`/produit/${produit.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-tile">
        {produit.photos[0] ? (
          <Image
            src={produit.photos[0]}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] group-active:scale-[0.99]"
          />
        ) : (
          <div className="tag flex h-full items-center justify-center text-deep/60">
            Photo à venir
          </div>
        )}

        {!produit.disponible && (
          <span className="tag absolute left-2 top-2 bg-deep/85 px-2 py-1 text-ink">
            Indisponible
          </span>
        )}
      </div>

      <h2 className="tag mt-3">{produit.nom}</h2>
      {produit.dimensions && (
        <p className="chiffres mt-1 text-sm text-dim">{produit.dimensions} cm</p>
      )}
      <p className="chiffres mt-1 text-sm">{formatPrix(produit.prix)}</p>
    </Link>
  );
}
