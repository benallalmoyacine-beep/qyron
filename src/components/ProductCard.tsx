"use client";

import Image from "next/image";
import Link from "next/link";
import type { Produit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";
import Statut from "./Statut";
import { useT } from "@/lib/langue";

export default function ProductCard({ produit }: { produit: Produit }) {
  const t = useT();

  return (
    <Link href={`/produit/${produit.id}`} className="monte group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-tile">
        {produit.photos[0] ? (
          <Image
            src={produit.photos[0]}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-[0.98]"
          />
        ) : (
          <div className="tag flex h-full items-center justify-center text-dim">Photo à venir</div>
        )}

        {/* Le prix se revele au survol. Masque aux lecteurs d'ecran : il est
            deja annonce par la ligne visible sous la vignette. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 translate-y-full bg-heat px-3 py-2.5 text-void transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          <span className="chiffres tag block">{formatPrix(produit.prix)}</span>
        </div>

        <span className="absolute right-2 top-2">
          <Statut disponible={produit.disponible} compact />
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="display truncate text-lg">{produit.nom}</h3>
        <p className="chiffres shrink-0 text-sm text-dim">{formatPrix(produit.prix)}</p>
      </div>
      {produit.dimensions && (
        <p className="chiffres mt-0.5 text-xs text-dim">{produit.dimensions} cm</p>
      )}
    </Link>
  );
}
