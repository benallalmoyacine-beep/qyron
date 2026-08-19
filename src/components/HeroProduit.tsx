import Image from "next/image";
import Link from "next/link";
import type { Produit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";

export default function HeroProduit({ produit }: { produit: Produit }) {
  return (
    <section className="overflow-hidden rounded-lg bg-panel">
      <div className="grid md:grid-cols-[1fr_1.15fr]">
        <div className="order-2 flex flex-col justify-between gap-8 p-6 sm:p-8 md:order-1">
          <div>
            <p className="tag text-dim">[ Dernier modèle ]</p>

            <h1 className="display mt-4 text-[clamp(2.5rem,9vw,4.5rem)]">{produit.nom}</h1>

            {produit.dimensions && (
              <dl className="mt-6 flex gap-8 border-t border-line/50 pt-4">
                <div>
                  <dt className="tag text-dim">Dimensions</dt>
                  <dd className="chiffres mt-1">{produit.dimensions} cm</dd>
                </div>
                <div>
                  <dt className="tag text-dim">Couleurs</dt>
                  <dd className="mt-1">Toutes</dd>
                </div>
              </dl>
            )}
          </div>

          <Link
            href={`/produit/${produit.id}`}
            className="group inline-flex items-center gap-4 self-start"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/60 transition-colors duration-200 group-hover:bg-ink group-hover:text-deep">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
            <span>
              <span className="tag block text-dim">Voir le produit</span>
              <span className="chiffres display block text-2xl">{formatPrix(produit.prix)}</span>
            </span>
          </Link>
        </div>

        <div className="relative order-1 aspect-square bg-tile md:order-2 md:aspect-auto md:min-h-[26rem]">
          {produit.photos[0] && (
            <Image
              src={produit.photos[0]}
              alt={produit.nom}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
              className="object-cover"
            />
          )}
          {!produit.disponible && (
            <span className="tag absolute left-4 top-4 bg-deep/85 px-2.5 py-1.5 text-ink">
              Indisponible
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
