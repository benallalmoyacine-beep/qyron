import Image from "next/image";
import Link from "next/link";
import type { Produit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";

export default function ProductCard({ produit }: { produit: Produit }) {
  return (
    <Link href={`/produit/${produit.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        {produit.photos[0] ? (
          <Image
            src={produit.photos[0]}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] group-active:scale-[0.99]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Photo à venir
          </div>
        )}

        {!produit.disponible && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-xs font-medium text-white">
            Indisponible
          </span>
        )}
      </div>

      <h2 className="mt-3 text-[15px] font-medium leading-snug">{produit.nom}</h2>
      <p className="chiffres mt-0.5 text-[15px] text-muted">{formatPrix(produit.prix)}</p>
    </Link>
  );
}
