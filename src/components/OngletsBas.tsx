"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/langue";

const INSTAGRAM = "https://www.instagram.com/qyrondz/";
const TIKTOK = "https://www.tiktok.com/@qyron93";

function IconeAccueil() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function IconePersonnalise() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function IconeBoutique() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h16l-1 12H5z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function IconeReseaux() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

export default function OngletsBas() {
  const chemin = usePathname();
  const [reseaux, setReseaux] = useState(false);
  const boutonReseaux = useRef<HTMLButtonElement>(null);

  useEffect(() => setReseaux(false), [chemin]);

  useEffect(() => {
    if (!reseaux) return;
    function surTouche(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setReseaux(false);
        boutonReseaux.current?.focus();
      }
    }
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [reseaux]);

  const t = useT();

  const onglets = [
    { href: "/", libelle: t.accueil, Icone: IconeAccueil },
    { href: "/personnalise", libelle: t.personnalise, Icone: IconePersonnalise },
    { href: "/boutique", libelle: t.boutique, Icone: IconeBoutique },
  ];

  return (
    <>
      {reseaux && (
        <div
          className="fixed inset-x-0 bottom-[4.5rem] z-40 px-4 pb-2"
          id="panneau-reseaux"
        >
          <div className="mx-auto flex max-w-md flex-col gap-2 rounded-2xl border border-line bg-panel/95 p-2 backdrop-blur-xl">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="tag flex min-h-14 items-center gap-3 rounded-xl px-4 transition-colors duration-200 hover:text-heat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.17a4.67 4.67 0 1 0 0 9.34 4.67 4.67 0 0 0 0-9.34Zm0 7.7a3.03 3.03 0 1 1 0-6.06 3.03 3.03 0 0 1 0 6.06Zm5.95-7.88a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0Z" />
              </svg>
              Instagram
            </a>
            <a
              href={TIKTOK}
              target="_blank"
              rel="noopener noreferrer"
              className="tag flex min-h-14 items-center gap-3 rounded-xl px-4 transition-colors duration-200 hover:text-heat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.1a5.66 5.66 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
              </svg>
              TikTok
            </a>
          </div>
        </div>
      )}

      <nav
        aria-label={t.accueil}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line/60 bg-void/85 backdrop-blur-xl"
      >
        <ul className="mx-auto flex max-w-[100rem] items-stretch">
          {onglets.map(({ href, libelle, Icone }) => {
            const actif = chemin === href;
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  aria-current={actif ? "page" : undefined}
                  className={`flex min-h-16 flex-col items-center justify-center gap-1 pb-[env(safe-area-inset-bottom)] transition-colors duration-200 ${
                    actif ? "text-heat" : "text-dim hover:text-ink"
                  }`}
                >
                  <Icone />
                  <span className="tag text-[0.625rem]">{libelle}</span>
                </Link>
              </li>
            );
          })}

          <li className="flex-1">
            <button
              ref={boutonReseaux}
              type="button"
              onClick={() => setReseaux((r) => !r)}
              aria-expanded={reseaux}
              aria-controls="panneau-reseaux"
              className={`flex min-h-16 w-full flex-col items-center justify-center gap-1 pb-[env(safe-area-inset-bottom)] transition-colors duration-200 ${
                reseaux ? "text-heat" : "text-dim hover:text-ink"
              }`}
            >
              <IconeReseaux />
              <span className="tag text-[0.625rem]">{t.reseaux}</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
