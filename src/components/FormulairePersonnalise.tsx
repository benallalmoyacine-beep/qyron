"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/langue";
import { compresser, FORMATS, TAILLE_MAX_ENTREE, type Compressee } from "@/lib/compression";
import IconeInstagram from "./IconeInstagram";

type Etat = "saisie" | "envoi" | "envoye";

export default function FormulairePersonnalise({ instagram }: { instagram: string }) {
  const t = useT();

  const [photo, setPhoto] = useState<Compressee | null>(null);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [etat, setEtat] = useState<Etat>("saisie");
  const [erreur, setErreur] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const champFichier = useRef<HTMLInputElement>(null);
  const boutonOui = useRef<HTMLButtonElement>(null);
  const boutonCreer = useRef<HTMLButtonElement>(null);

  const complet = Boolean(photo && prenom.trim() && nom.trim());

  // Échap ferme la confirmation et rend le focus au bouton d'origine.
  useEffect(() => {
    if (!confirmation) return;
    boutonOui.current?.focus();

    function surTouche(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setConfirmation(false);
        boutonCreer.current?.focus();
      }
    }
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [confirmation]);

  async function choisirFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    e.target.value = "";
    if (!fichier) return;

    setErreur("");

    if (!fichier.type.startsWith("image/") || !FORMATS.includes(fichier.type)) {
      setErreur(t.erreurFormat);
      return;
    }
    if (fichier.size > TAILLE_MAX_ENTREE) {
      setErreur(t.erreurTaille);
      return;
    }

    try {
      setPhoto(await compresser(fichier));
    } catch {
      setErreur(t.erreurLecture);
    }
  }

  async function envoyer() {
    if (!photo || etat === "envoi") return;

    setConfirmation(false);
    setEtat("envoi");
    setErreur("");

    const corps = new FormData();
    corps.append("photo", photo.blob, "photo.jpg");
    corps.append("prenom", prenom.trim());
    corps.append("nom", nom.trim());

    try {
      const res = await fetch("/api/demande", { method: "POST", body: corps });
      if (!res.ok) throw new Error(String(res.status));
      setEtat("envoye");
    } catch {
      // La photo et les champs restent en place : rien à ressaisir.
      setErreur(t.erreurEnvoi);
      setEtat("saisie");
    }
  }

  function recommencer() {
    setPhoto(null);
    setPrenom("");
    setNom("");
    setErreur("");
    setEtat("saisie");
  }

  if (etat === "envoye") {
    return (
      <div className="mt-12 max-w-xl">
        <p className="text-lg">
          {t.merciDebut} {prenom} {nom}
          {t.merciSuite}
        </p>

        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="tag mt-8 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-heat px-6 text-void transition-transform duration-200 hover:scale-105"
        >
          <IconeInstagram />
          {t.ouvrirInstagram}
        </a>

        <p>
          <button
            type="button"
            onClick={recommencer}
            className="tag mt-8 min-h-11 text-dim underline underline-offset-4 transition-colors duration-200 hover:text-ink"
          >
            {t.autrePhoto}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 max-w-xl">
      <input
        ref={champFichier}
        id="photo"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        onChange={choisirFichier}
        className="sr-only"
      />

      <button
        type="button"
        onClick={() => champFichier.current?.click()}
        className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-panel/50 transition-colors duration-200 hover:border-heat sm:aspect-[3/2]"
      >
        {photo ? (
          <Image src={photo.apercu} alt={t.apercuPhoto} fill unoptimized className="object-contain" />
        ) : (
          <span className="tag flex flex-col items-center gap-3 text-dim">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            {t.ajouteTaPhoto}
          </span>
        )}
      </button>

      {photo && (
        <button
          type="button"
          onClick={() => champFichier.current?.click()}
          className="tag mt-3 min-h-11 text-dim underline underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          {t.changerPhoto}
        </button>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="prenom" className="tag block text-dim">
            {t.prenom}
          </label>
          <input
            id="prenom"
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            autoComplete="given-name"
            maxLength={80}
            className="mt-2 h-14 w-full rounded-xl border border-line bg-panel/60 px-4 text-base focus:border-heat focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="nom" className="tag block text-dim">
            {t.nom}
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            autoComplete="family-name"
            maxLength={80}
            className="mt-2 h-14 w-full rounded-xl border border-line bg-panel/60 px-4 text-base focus:border-heat focus:outline-none"
          />
        </div>
      </div>

      {erreur && (
        <p role="alert" className="mt-6 rounded-xl border border-ko/60 px-4 py-3 text-sm">
          {erreur}
        </p>
      )}

      <button
        ref={boutonCreer}
        type="button"
        disabled={!complet || etat === "envoi"}
        onClick={() => setConfirmation(true)}
        className="tag mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-heat px-8 text-void transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {etat === "envoi" && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-void/30 border-t-void"
          />
        )}
        {etat === "envoi" ? t.envoiEnCours : t.creerFigurine}
      </button>

      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 px-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titre-confirmation"
            className="w-full max-w-md rounded-2xl border border-line bg-panel p-6"
          >
            <h2 id="titre-confirmation" className="text-lg">
              {t.confirmerTitre}
            </h2>

            <div className="mt-8 flex gap-3">
              <button
                ref={boutonOui}
                type="button"
                onClick={envoyer}
                className="tag min-h-14 flex-1 rounded-full bg-heat text-void"
              >
                {t.oui}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmation(false);
                  boutonCreer.current?.focus();
                }}
                className="tag min-h-14 flex-1 rounded-full border border-line transition-colors duration-200 hover:border-ink"
              >
                {t.annuler}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
