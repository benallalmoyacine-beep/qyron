"use client";

import { useEffect, useRef } from "react";

// Cubes flottants en arrière-plan. Positions figées plutôt que tirées au
// hasard, pour que le serveur et le navigateur rendent la même chose.
//
// Les dix premiers s'affichent partout ; les dix suivants sont réservés aux
// écrans larges, où il y a la place de les répartir sans encombrer.

type Cube = {
  gauche: number; // % de la largeur
  haut: number; // % de la hauteur
  taille: number; // px, entre 16 et 48
  opacite: number; // blancs 0.07 a 0.12, rouges jusqu'a 0.24 : le rouge
  //                    compose plus sombre, il gene moins la lecture
  amplitude: number; // px de montée/descente, entre 20 et 40
  duree: number; // s, entre 11 et 21
  retard: number; // s, décalage de départ
  rotation: number; // s, tour complet sur lui-même
  teinte: "blanc" | "rouge";
};

const CUBES: Cube[] = [
  // Visibles sur tous les écrans.
  { gauche: 7, haut: 12, taille: 34, opacite: 0.1, amplitude: 28, duree: 13, retard: 0, rotation: 31, teinte: "blanc" },
  { gauche: 82, haut: 7, taille: 22, opacite: 0.09, amplitude: 34, duree: 18, retard: -7, rotation: 40, teinte: "blanc" },
  { gauche: 46, haut: 19, taille: 44, opacite: 0.17, amplitude: 22, duree: 16, retard: -13, rotation: 48, teinte: "rouge" },
  { gauche: 19, haut: 34, taille: 18, opacite: 0.11, amplitude: 38, duree: 12, retard: -4, rotation: 27, teinte: "blanc" },
  { gauche: 91, haut: 29, taille: 30, opacite: 0.09, amplitude: 25, duree: 20, retard: -19, rotation: 43, teinte: "blanc" },
  { gauche: 63, haut: 43, taille: 26, opacite: 0.24, amplitude: 31, duree: 15, retard: -9, rotation: 35, teinte: "rouge" },
  { gauche: 11, haut: 57, taille: 40, opacite: 0.07, amplitude: 20, duree: 21, retard: -22, rotation: 51, teinte: "blanc" },
  { gauche: 74, haut: 63, taille: 16, opacite: 0.12, amplitude: 36, duree: 11, retard: -2, rotation: 24, teinte: "blanc" },
  { gauche: 34, haut: 76, taille: 32, opacite: 0.09, amplitude: 27, duree: 18, retard: -16, rotation: 38, teinte: "blanc" },
  { gauche: 88, haut: 84, taille: 24, opacite: 0.24, amplitude: 33, duree: 14, retard: -11, rotation: 33, teinte: "rouge" },

  // Ajoutés à partir de 640 px de large.
  { gauche: 28, haut: 4, taille: 20, opacite: 0.09, amplitude: 30, duree: 17, retard: -6, rotation: 36, teinte: "blanc" },
  { gauche: 57, haut: 9, taille: 28, opacite: 0.08, amplitude: 24, duree: 19, retard: -17, rotation: 45, teinte: "blanc" },
  { gauche: 3, haut: 26, taille: 46, opacite: 0.07, amplitude: 21, duree: 20, retard: -25, rotation: 50, teinte: "blanc" },
  { gauche: 70, haut: 24, taille: 19, opacite: 0.24, amplitude: 37, duree: 13, retard: -3, rotation: 29, teinte: "rouge" },
  { gauche: 39, haut: 38, taille: 36, opacite: 0.07, amplitude: 23, duree: 15, retard: -14, rotation: 41, teinte: "blanc" },
  { gauche: 96, haut: 48, taille: 21, opacite: 0.1, amplitude: 35, duree: 18, retard: -20, rotation: 32, teinte: "blanc" },
  { gauche: 25, haut: 51, taille: 27, opacite: 0.1, amplitude: 26, duree: 13, retard: -8, rotation: 46, teinte: "blanc" },
  { gauche: 51, haut: 68, taille: 48, opacite: 0.17, amplitude: 20, duree: 21, retard: -27, rotation: 52, teinte: "rouge" },
  { gauche: 6, haut: 82, taille: 23, opacite: 0.11, amplitude: 32, duree: 15, retard: -12, rotation: 30, teinte: "blanc" },
  { gauche: 66, haut: 91, taille: 38, opacite: 0.08, amplitude: 29, duree: 20, retard: -23, rotation: 43, teinte: "blanc" },
];

const VISIBLES_MOBILE = 10;

/** Décalage du plus gros cube, en px. Les autres suivent au prorata. */
const DECALAGE_MAX = 48;

/** Inclinaison, en degrés, au-delà de laquelle le décalage sature. */
const ANGLE_MAX = 25;

/** Part du chemin parcourue à chaque image : plus haut, plus sec. */
const AMORTISSEMENT = 0.16;

const TAILLE_MAX = Math.max(...CUBES.map((c) => c.taille));

type DeviceOrientationAvecPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState | "granted" | "denied">;
};

export default function Fond() {
  const conteneur = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = conteneur.current;
    if (!element) return;

    // Une personne qui demande moins d'animations ne veut pas non plus d'un
    // decor qui suit son poignet.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Capteur d'inclinaison : sur un ordinateur il n'y en a pas, et un
    // ecran tactile est le seul contexte ou incliner a du sens.
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const Capteur = window.DeviceOrientationEvent as
      | DeviceOrientationAvecPermission
      | undefined;
    if (!Capteur) return;

    const cubes = Array.from(
      element.querySelectorAll<HTMLElement>("[data-profondeur]"),
    ).map((noeud) => ({
      noeud,
      profondeur: Number(noeud.dataset.profondeur),
    }));

    // Position de repos : celle du premier relevé. Sans cette référence, un
    // téléphone tenu à plat ou incliné vers soi partirait déjà décalé.
    let repos: { beta: number; gamma: number } | null = null;
    let cibleX = 0;
    let cibleY = 0;
    let x = 0;
    let y = 0;
    let image = 0;
    let vivant = true;

    function borner(valeur: number) {
      return Math.max(-1, Math.min(1, valeur / ANGLE_MAX));
    }

    function dessiner() {
      x += (cibleX - x) * AMORTISSEMENT;
      y += (cibleY - y) * AMORTISSEMENT;

      for (const { noeud, profondeur } of cubes) {
        // La propriete translate se compose avec transform : l'animation de
        // flottement reste intacte, elle occupe deja transform.
        noeud.style.translate = `${(x * profondeur).toFixed(2)}px ${(y * profondeur).toFixed(2)}px`;
      }

      // La boucle s'arrete des que le mouvement est visuellement fini ;
      // elle repart au prochain relevé du capteur.
      if (vivant && (Math.abs(cibleX - x) > 0.05 || Math.abs(cibleY - y) > 0.05)) {
        image = requestAnimationFrame(dessiner);
      } else {
        image = 0;
      }
    }

    function surInclinaison(e: DeviceOrientationEvent) {
      if (e.beta === null || e.gamma === null) return;

      if (!repos) repos = { beta: e.beta, gamma: e.gamma };

      // Sens oppose a l'inclinaison : le decor donne l'impression de rester
      // en place pendant que le telephone bouge autour.
      cibleX = -borner(e.gamma - repos.gamma) * DECALAGE_MAX;
      cibleY = -borner(e.beta - repos.beta) * DECALAGE_MAX;

      if (!image) image = requestAnimationFrame(dessiner);
    }

    function activer() {
      window.addEventListener("deviceorientation", surInclinaison);
    }

    let retirerGeste: (() => void) | undefined;

    if (typeof Capteur.requestPermission === "function") {
      // iOS n'accorde le capteur que depuis un geste. On se greffe sur le
      // premier appui, celui que la personne allait faire de toute facon :
      // aucune banniere, aucune relance si c'est refuse.
      const demander = async () => {
        retirerGeste?.();
        try {
          if ((await Capteur.requestPermission!()) === "granted") activer();
        } catch {
          // Refus, ou page non servie en HTTPS : on garde le flottement seul.
        }
      };
      window.addEventListener("pointerdown", demander, { once: true });
      retirerGeste = () => window.removeEventListener("pointerdown", demander);
    } else {
      activer();
    }

    return () => {
      vivant = false;
      retirerGeste?.();
      window.removeEventListener("deviceorientation", surInclinaison);
      if (image) cancelAnimationFrame(image);
      for (const { noeud } of cubes) noeud.style.translate = "";
    };
  }, []);

  return (
    <div
      ref={conteneur}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: "800px" }}
    >
      {CUBES.map((c, i) => (
        <span
          key={i}
          // Les gros cubes se decalent davantage que les petits : c'est cet
          // ecart qui donne la profondeur, pas la taille seule.
          data-profondeur={(c.taille / TAILLE_MAX).toFixed(3)}
          className={`cube-flotte ${i >= VISIBLES_MOBILE ? "hidden sm:block" : ""}`}
          style={{
            left: `${c.gauche}%`,
            top: `${c.haut}%`,
            opacity: c.opacite,
            animationDuration: `${c.duree}s`,
            animationDelay: `${c.retard}s`,
            // Amplitude négative ou positive selon l'index : la moitié des
            // cubes descend pendant que l'autre monte.
            ["--amplitude" as string]: `${i % 2 === 0 ? -c.amplitude : c.amplitude}px`,
          }}
        >
          <span
            className={`cube block ${c.teinte}`}
            style={{
              width: c.taille,
              height: c.taille,
              animationDuration: `${c.rotation}s`,
              animationDelay: `${c.retard}s`,
              ["--demi" as string]: `${c.taille / 2}px`,
            }}
          >
            <span className="dessus" />
            <span className="dessous" />
            <span className="avant" />
            <span className="arriere" />
            <span className="droite" />
            <span className="gauche" />
          </span>
        </span>
      ))}
    </div>
  );
}
