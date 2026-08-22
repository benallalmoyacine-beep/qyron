import Image from "next/image";
import Link from "next/link";

export default function CarteChoix({
  href,
  image,
  alt,
  titre,
  sous,
  bouton,
  prioritaire = false,
}: {
  href: string;
  image: string;
  alt: string;
  titre: string;
  sous: string;
  bouton: string;
  prioritaire?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-panel/60"
    >
      <div className="relative min-h-0 flex-1 bg-tile">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={prioritaire}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="shrink-0 p-4 sm:p-6">
        <h2 className="display text-[clamp(1.5rem,5vw,2.5rem)]">{titre}</h2>
        <p className="mt-1.5 text-sm text-dim sm:text-base">{sous}</p>

        <span className="tag mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-void transition-colors duration-200 group-hover:bg-heat group-hover:text-ink">
          {bouton}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
