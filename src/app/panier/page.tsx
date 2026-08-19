"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrix } from "@/lib/format";

export default function Panier() {
  const { items, total, ready, setQuantite, remove } = useCart();

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl">
        <p className="text-muted">Votre panier est vide.</p>
        <Link href="/" className="mt-4 inline-block text-accent">
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-white">
              {item.photo && (
                <Image src={item.photo} alt={item.nom} fill sizes="80px" className="object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p>{item.nom}</p>
              <p className="mt-1 text-accent">{formatPrix(item.prix)}</p>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center border border-line">
                  <button
                    onClick={() => setQuantite(item.id, item.quantite - 1)}
                    aria-label="Diminuer"
                    className="px-3 py-1"
                  >
                    −
                  </button>
                  <span className="px-2">{item.quantite}</span>
                  <button
                    onClick={() => setQuantite(item.id, item.quantite + 1)}
                    aria-label="Augmenter"
                    className="px-3 py-1"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => remove(item.id)} className="text-muted underline">
                  Supprimer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span>Total</span>
        <span className="text-accent">{formatPrix(total)}</span>
      </div>

      <Link href="/commande" className="mt-6 block bg-accent py-2 text-center text-white">
        Commander
      </Link>
    </div>
  );
}
