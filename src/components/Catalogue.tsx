"use client";

import { useMemo, useState } from "react";
import type { Produit } from "@/lib/airtable";
import ProductCard from "./ProductCard";

/** Retire accents et casse : « Vase » trouve « vasé », « VASE », « vase ». */
function normalise(texte: string) {
  return texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export default function Catalogue({ produits }: { produits: Produit[] }) {
  const [recherche, setRecherche] = useState("");

  const resultats = useMemo(() => {
    const terme = normalise(recherche.trim());
    if (!terme) return produits;
    return produits.filter(
      (p) => normalise(p.nom).includes(terme) || normalise(p.description).includes(terme),
    );
  }, [produits, recherche]);

  return (
    <>
      <div className="relative">
        <label htmlFor="recherche" className="tag block text-dim">
          Rechercher
        </label>

        <div className="relative mt-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dim"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>

          <input
            id="recherche"
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Nom d'un produit…"
            autoComplete="off"
            className="h-14 w-full rounded-full border border-line bg-panel/60 pl-12 pr-12 text-base placeholder:text-dim focus:border-heat focus:outline-none"
          />

          {recherche && (
            <button
              type="button"
              onClick={() => setRecherche("")}
              aria-label="Effacer la recherche"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-dim transition-colors duration-200 hover:text-ink"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Annonce le nombre de resultats aux lecteurs d'ecran. */}
        <p aria-live="polite" className="tag mt-3 text-dim">
          {recherche
            ? `${String(resultats.length).padStart(2, "0")} résultat${resultats.length > 1 ? "s" : ""}`
            : `${String(produits.length).padStart(2, "0")} pièces`}
        </p>
      </div>

      {resultats.length === 0 ? (
        <p className="tag py-24 text-center text-dim">Aucun produit ne correspond</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {resultats.map((produit, i) => (
            <ProductCard key={produit.id} produit={produit} index={i + 1} />
          ))}
        </div>
      )}
    </>
  );
}
