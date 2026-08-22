"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LANGUES, TEXTES, type Langue, type Textes } from "./traductions";

const CLE = "qyron-langue";

type Contexte = {
  langue: Langue;
  choisie: boolean;
  choisir: (l: Langue) => void;
  t: Textes;
};

const LangueContext = createContext<Contexte | null>(null);

export function LangueProvider({ children }: { children: React.ReactNode }) {
  // Le premier rendu est identique côté serveur et côté navigateur : français,
  // pas encore choisi. Le vrai choix arrive après le montage.
  const [langue, setLangue] = useState<Langue>("fr");
  const [choisie, setChoisie] = useState(false);
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    setMonte(true);
    const enregistree = window.localStorage.getItem(CLE);
    if (enregistree && (LANGUES as readonly string[]).includes(enregistree)) {
      setLangue(enregistree as Langue);
      setChoisie(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = langue;
  }, [langue]);

  function choisir(l: Langue) {
    setLangue(l);
    setChoisie(true);
    try {
      window.localStorage.setItem(CLE, l);
    } catch {
      // Navigation privée : la langue vaut pour la session, sans plus.
    }
  }

  return (
    <LangueContext.Provider
      value={{ langue, choisie: choisie || !monte, choisir, t: TEXTES[langue] }}
    >
      {children}
    </LangueContext.Provider>
  );
}

export function useLangue() {
  const ctx = useContext(LangueContext);
  if (!ctx) throw new Error("useLangue doit être utilisé dans LangueProvider");
  return ctx;
}

/** Raccourci quand seul le dictionnaire est nécessaire. */
export function useT() {
  return useLangue().t;
}
