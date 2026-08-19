import Image from "next/image";
import Link from "next/link";
import type { Produit } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";

export default function HeroProduit({ produit }: { produit: Produit }) {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-14">
      {/* La photo occupe tout l'ecran, un voile la fait passer derriere le texte. */}
      <div className="absolute inset-0">
        {produit.photos[0] && (
          <Image
            src={produit.photos[0]}
            alt={produit.nom}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/75 to-void/40" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[100rem] flex-col justify-end px-5 pb-12 sm:px-8 sm:pb-16">
        <p className="tag flex items-center gap-3 text-heat">
          <span className="h-px w-10 bg-heat" aria-hidden="true" />
          Dernier modèle
        </p>

        <h1 className="display mt-5 text-[clamp(3.5rem,17vw,15rem)]">{produit.nom}</h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8 border-t border-line pt-6">
          <dl className="flex flex-wrap gap-x-12 gap-y-4">
            {produit.dimensions && (
              <div>
                <dt className="tag text-dim">Dimensions</dt>
                <dd className="chiffres mt-1.5 text-lg">{produit.dimensions} cm</dd>
              </div>
            )}
            <div>
              <dt className="tag text-dim">Couleurs</dt>
              <dd className="mt-1.5 text-lg">Toutes</dd>
            </div>
            <div>
              <dt className="tag text-dim">Prix</dt>
              <dd className="chiffres mt-1.5 text-lg text-heat">{formatPrix(produit.prix)}</dd>
            </div>
          </dl>

          <Link
            href={`/produit/${produit.id}`}
            className="group inline-flex min-h-14 items-center gap-4 rounded-full bg-ink py-3 pl-6 pr-3 text-void transition-colors duration-200 hover:bg-heat hover:text-ink"
          >
            <span className="tag">Découvrir</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-void/10 transition-transform duration-200 group-hover:translate-x-0.5">
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
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
