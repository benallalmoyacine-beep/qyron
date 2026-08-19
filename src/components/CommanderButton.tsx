"use client";

import { useCart } from "@/lib/cart";
import type { Produit } from "@/lib/airtable";

export default function CommanderButton({
  produit,
  className = "",
}: {
  produit: Produit;
  className?: string;
}) {
  const { add } = useCart();

  if (!produit.disponible) {
    return (
      <button disabled className={`w-full bg-line py-2 text-muted ${className}`}>
        Indisponible
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        add({
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix,
          photo: produit.photos[0] ?? "",
        });
      }}
      className={`w-full bg-accent py-2 text-white ${className}`}
    >
      Commander
    </button>
  );
}
