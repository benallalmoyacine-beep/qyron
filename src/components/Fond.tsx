// Decor de fond : carres flous qui derivent, plus des eclats qui scintillent.
// Positions figees plutot que tirees au hasard, pour que le serveur et le
// navigateur rendent exactement la meme chose.

type Carre = {
  gauche: number;
  haut: number;
  taille: number;
  rotation: number;
  flou: number;
  opacite: number;
  duree: number;
  retard: number;
  chaud?: boolean;
};

const CARRES: Carre[] = [
  { gauche: 6, haut: 8, taille: 220, rotation: 18, flou: 44, opacite: 0.16, duree: 34, retard: 0, chaud: true },
  { gauche: 72, haut: 4, taille: 160, rotation: -12, flou: 30, opacite: 0.1, duree: 42, retard: -6 },
  { gauche: 38, haut: 26, taille: 300, rotation: 32, flou: 70, opacite: 0.09, duree: 52, retard: -14 },
  { gauche: 84, haut: 34, taille: 130, rotation: 44, flou: 26, opacite: 0.14, duree: 38, retard: -22, chaud: true },
  { gauche: 12, haut: 48, taille: 190, rotation: -26, flou: 52, opacite: 0.08, duree: 46, retard: -9 },
  { gauche: 60, haut: 62, taille: 260, rotation: 8, flou: 60, opacite: 0.12, duree: 58, retard: -30, chaud: true },
  { gauche: 26, haut: 76, taille: 150, rotation: -38, flou: 34, opacite: 0.1, duree: 40, retard: -17 },
  { gauche: 88, haut: 84, taille: 200, rotation: 22, flou: 48, opacite: 0.09, duree: 50, retard: -25 },
];

const ECLATS = [
  { gauche: 14, haut: 12, taille: 3, duree: 3.2, retard: 0 },
  { gauche: 31, haut: 7, taille: 2, duree: 4.1, retard: -1.4 },
  { gauche: 47, haut: 19, taille: 4, duree: 2.8, retard: -0.6 },
  { gauche: 63, haut: 11, taille: 2, duree: 3.7, retard: -2.2 },
  { gauche: 79, haut: 23, taille: 3, duree: 4.6, retard: -3.1 },
  { gauche: 91, haut: 15, taille: 2, duree: 3.1, retard: -0.9 },
  { gauche: 8, haut: 34, taille: 2, duree: 4.3, retard: -2.7 },
  { gauche: 24, haut: 44, taille: 3, duree: 3.4, retard: -1.1 },
  { gauche: 41, haut: 38, taille: 2, duree: 5.0, retard: -3.6 },
  { gauche: 57, haut: 49, taille: 4, duree: 2.9, retard: -0.3 },
  { gauche: 73, haut: 41, taille: 2, duree: 4.4, retard: -2.0 },
  { gauche: 86, haut: 55, taille: 3, duree: 3.6, retard: -1.8 },
  { gauche: 17, haut: 63, taille: 2, duree: 4.8, retard: -3.9 },
  { gauche: 34, haut: 71, taille: 3, duree: 3.0, retard: -0.7 },
  { gauche: 52, haut: 66, taille: 2, duree: 4.2, retard: -2.5 },
  { gauche: 68, haut: 78, taille: 3, duree: 3.5, retard: -1.6 },
  { gauche: 82, haut: 88, taille: 2, duree: 4.7, retard: -3.3 },
  { gauche: 45, haut: 92, taille: 3, duree: 3.3, retard: -1.2 },
];

export default function Fond() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {CARRES.map((c, i) => (
        <span
          key={`carre-${i}`}
          // Les plus grands carres sont ecartes sur petit ecran : un flou de
          // 60 px sur 300 px coute cher a composer sur un telephone d'entree
          // de gamme.
          className={`derive absolute block rounded-2xl ${
            c.taille >= 260 ? "hidden sm:block" : ""
          }`}
          style={{
            left: `${c.gauche}%`,
            top: `${c.haut}%`,
            width: c.taille,
            height: c.taille,
            rotate: `${c.rotation}deg`,
            filter: `blur(${c.flou}px)`,
            opacity: c.opacite,
            background: c.chaud ? "var(--color-heat)" : "var(--color-ink)",
            animationDuration: `${c.duree}s`,
            animationDelay: `${c.retard}s`,
          }}
        />
      ))}

      {ECLATS.map((e, i) => (
        <span
          key={`eclat-${i}`}
          className="scintille absolute block rounded-full bg-ink"
          style={{
            left: `${e.gauche}%`,
            top: `${e.haut}%`,
            width: e.taille,
            height: e.taille,
            animationDuration: `${e.duree}s`,
            animationDelay: `${e.retard}s`,
          }}
        />
      ))}
    </div>
  );
}
