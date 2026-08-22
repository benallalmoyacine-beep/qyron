// Decor de fond : grandes formes arrondies blanches, facon tuiles, qui
// derivent tres lentement. Positions figees plutot que tirees au hasard,
// pour que le serveur et le navigateur rendent exactement la meme chose.

type Forme = {
  gauche: number;
  haut: number;
  taille: number;
  rotation: number;
  opacite: number;
  duree: number;
  retard: number;
};

const FORMES: Forme[] = [
  { gauche: -6, haut: 6, taille: 260, rotation: 12, opacite: 0.75, duree: 42, retard: 0 },
  { gauche: 74, haut: 2, taille: 200, rotation: -8, opacite: 0.6, duree: 48, retard: -8 },
  { gauche: 40, haut: 24, taille: 320, rotation: 18, opacite: 0.5, duree: 58, retard: -18 },
  { gauche: 86, haut: 38, taille: 170, rotation: 26, opacite: 0.7, duree: 40, retard: -25 },
  { gauche: 8, haut: 52, taille: 230, rotation: -16, opacite: 0.55, duree: 52, retard: -12 },
  { gauche: 62, haut: 66, taille: 280, rotation: 6, opacite: 0.5, duree: 62, retard: -33 },
  { gauche: 24, haut: 80, taille: 190, rotation: -22, opacite: 0.65, duree: 44, retard: -20 },
  { gauche: 90, haut: 86, taille: 240, rotation: 14, opacite: 0.5, duree: 54, retard: -28 },
];

export default function Fond() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {FORMES.map((f, i) => (
        <span
          key={i}
          // Les plus grandes formes sont ecartees sur petit ecran : elles
          // encombrent sans rien apporter sur 375 px de large.
          className={`derive absolute block bg-panel ${f.taille >= 280 ? "hidden sm:block" : ""}`}
          style={{
            left: `${f.gauche}%`,
            top: `${f.haut}%`,
            width: f.taille,
            height: f.taille,
            // Rayon proportionnel : la silhouette reste la meme a toute taille.
            borderRadius: `${Math.round(f.taille * 0.24)}px`,
            rotate: `${f.rotation}deg`,
            opacity: f.opacite,
            animationDuration: `${f.duree}s`,
            animationDelay: `${f.retard}s`,
          }}
        />
      ))}
    </div>
  );
}
