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
      {/* Le produit est pose sur une tuile claire, nom et prix centres en
          dessous : c'est la disposition des references fournies. */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-tile">
        {produit.photos[0] ? (
          <Image
            src={produit.photos[0]}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-[0.98]"
          />
        ) : (
          <div className="tag flex h-full items-center justify-center text-dim">
            {t.photoAVenir}
          </div>
        )}

        <span className="absolute left-2 top-2">
          <Statut disponible={produit.disponible} compact />
        </span>
      </div>

      <div className="mt-4 text-center">
        <h3 className="truncate text-[15px] font-medium">{produit.nom}</h3>
        <p className="chiffres mt-1 text-sm text-dim">{formatPrix(produit.prix)}</p>
        {produit.dimensions && (
          <p className="chiffres mt-0.5 text-xs text-dim">{produit.dimensions} cm</p>
        )}
      </div>
    </Link>
  );
}
