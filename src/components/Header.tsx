"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/langue";

export default function Header() {
  const t = useT();
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();
  const bouton = useRef<HTMLButtonElement>(null);

  // Le menu se referme au changement de page.
  useEffect(() => setOuvert(false), [chemin]);

  // Échap referme et rend le focus au bouton, comme n'importe quel panneau.
  useEffect(() => {
    if (!ouvert) return;
    function surTouche(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOuvert(false);
        bouton.current?.focus();
      }
    }
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [ouvert]);

  const LIENS = [
    { href: "/", libelle: t.accueil },
    { href: "/a-propos", libelle: t.aPropos },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[100rem] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="display inline-flex h-full items-center pr-4 text-xl leading-none tracking-[0.12em] transition-colors duration-200 hover:text-heat"
        >
          QYRON
        </Link>

        <button
          ref={bouton}
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-controls="menu-principal"
          aria-label={ouvert ? t.fermerMenu : t.ouvrirMenu}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] px-2"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-200 ease-out ${
              ouvert ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-opacity duration-200 ease-out ${
              ouvert ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-200 ease-out ${
              ouvert ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {ouvert && (
        <nav
          id="menu-principal"
          className="border-t border-line/60 bg-void/95 backdrop-blur-xl"
        >
          <ul className="mx-auto max-w-[100rem] px-5 py-4 sm:px-8">
            {LIENS.map((lien) => {
              const actif = chemin === lien.href;
              return (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    aria-current={actif ? "page" : undefined}
                    className={`display flex min-h-14 items-center text-3xl transition-colors duration-200 hover:text-heat sm:text-4xl ${
                      actif ? "text-heat" : ""
                    }`}
                  >
                    {lien.libelle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
