import Image from "next/image";
import Link from "next/link";
import type { Produit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";
import CommanderButton from "./CommanderButton";

export default function ProductCard({ produit }: { produit: Produit }) {
  return (
    <div>
      <Link href={`/produit/${produit.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-white">
          {produit.photos[0] && (
            <Image
              src={produit.photos[0]}
              alt={produit.nom}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          )}
        </div>
        <p className="mt-3">{produit.nom}</p>
        <p className="mt-1 text-accent">{formatPrix(produit.prix)}</p>
      </Link>
      <CommanderButton produit={produit} className="mt-3" />
    </div>
  );
}
