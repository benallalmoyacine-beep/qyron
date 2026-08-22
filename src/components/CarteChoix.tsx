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
      className="carte group flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl bg-panel transition-transform duration-300 ease-out hover:-translate-y-1"
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

      <div className="shrink-0 p-5 sm:p-7">
        <h2 className="display text-[clamp(1.5rem,4.5vw,2.25rem)]">{titre}</h2>
        <p className="mt-2 text-sm leading-relaxed text-dim sm:text-base">{sous}</p>

        {/* Pastille blanche a ombre douce, comme sur la reference. */}
        <span className="mt-5 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 text-sm text-void transition-opacity duration-200 group-hover:opacity-80">
          {bouton}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
