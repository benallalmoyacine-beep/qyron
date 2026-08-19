"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function AddedToCartToast() {
  const { toast, dismissToast } = useCart();
  if (!toast) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-4 bg-ink px-4 py-3 text-white"
    >
      <span>Ajouté au panier</span>
      <Link
        href="/panier"
        onClick={dismissToast}
        className="shrink-0 bg-accent px-3 py-1.5 text-white"
      >
        Voir le panier
      </Link>
    </div>
  );
}
