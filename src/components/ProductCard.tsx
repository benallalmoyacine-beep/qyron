"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { Produit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";
import Statut from "./Statut";
import { useT } from "@/lib/langue";
import { useTransition } from "@/lib/transition";

export default function ProductCard({ produit }: { produit: Produit }) {
  const t = useT();
  const transition = useTransition();
  const router = useRouter();
  const cadre = useRef<HTMLDivElement>(null);
  const prechargee = useRef(false);

  const href = `/produit/${produit.id}`;

  // La fiche produit est rendue a la demande : sans ce prechargement, l'image
  // reste figee le temps de l'aller-retour serveur avant de pouvoir s'envoler.
  // Au survol sur ordinateur, des le contact du doigt sur mobile.
  function precharger() {
    if (prechargee.current) return;
    prechargee.current = true;
    router.prefetch(href);
  }

  function surClic(e: React.MouseEvent<HTMLAnchorElement>) {
    // Clic milieu, Ctrl/Cmd, nouvel onglet : on laisse le navigateur faire.
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    const image = cadre.current?.querySelector("img");
    if (!transition || !image) return;

    e.preventDefault();
    transition.envoler(image, produit.id, href);
  }

  return (
    <Link
      href={href}
      onClick={surClic}
      onPointerEnter={precharger}
      onTouchStart={precharger}
      className="monte group block"
    >
      {/* Le produit est pose sur une tuile claire, nom et prix centres en
          dessous : c'est la disposition des references fournies. */}
      <div
        ref={cadre}
        className="relative aspect-square overflow-hidden rounded-[18px] bg-tile"
      >
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
