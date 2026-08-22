// Cubes blancs flottants en arrière-plan. Positions figées plutôt que tirées
// au hasard, pour que le serveur et le navigateur rendent la même chose.
//
// Les dix premiers s'affichent partout ; les dix suivants sont réservés aux
// écrans larges, où il y a la place de les répartir sans encombrer.

type Cube = {
  gauche: number; // % de la largeur
  haut: number; // % de la hauteur
  taille: number; // px, entre 16 et 48
  opacite: number; // 0.07 a 0.12 : au-dela, le texte gris pose dessus
  //                    passe sous le seuil de lisibilite de 4,5:1
  amplitude: number; // px de montée/descente, entre 20 et 40
  duree: number; // s, entre 11 et 21
  retard: number; // s, décalage de départ
  rotation: number; // s, tour complet sur lui-même
};

const CUBES: Cube[] = [
  // Visibles sur tous les écrans.
  { gauche: 7, haut: 12, taille: 34, opacite: 0.10, amplitude: 28, duree: 13, retard: 0, rotation: 31 },
  { gauche: 82, haut: 7, taille: 22, opacite: 0.09, amplitude: 34, duree: 18, retard: -7, rotation: 40 },
  { gauche: 46, haut: 19, taille: 44, opacite: 0.07, amplitude: 22, duree: 16, retard: -13, rotation: 48 },
  { gauche: 19, haut: 34, taille: 18, opacite: 0.11, amplitude: 38, duree: 12, retard: -4, rotation: 27 },
  { gauche: 91, haut: 29, taille: 30, opacite: 0.09, amplitude: 25, duree: 20, retard: -19, rotation: 43 },
  { gauche: 63, haut: 43, taille: 26, opacite: 0.10, amplitude: 31, duree: 15, retard: -9, rotation: 35 },
  { gauche: 11, haut: 57, taille: 40, opacite: 0.07, amplitude: 20, duree: 21, retard: -22, rotation: 51 },
  { gauche: 74, haut: 63, taille: 16, opacite: 0.12, amplitude: 36, duree: 11, retard: -2, rotation: 24 },
  { gauche: 34, haut: 76, taille: 32, opacite: 0.09, amplitude: 27, duree: 18, retard: -16, rotation: 38 },
  { gauche: 88, haut: 84, taille: 24, opacite: 0.11, amplitude: 33, duree: 14, retard: -11, rotation: 33 },

  // Ajoutés à partir de 640 px de large.
  { gauche: 28, haut: 4, taille: 20, opacite: 0.09, amplitude: 30, duree: 17, retard: -6, rotation: 36 },
  { gauche: 57, haut: 9, taille: 28, opacite: 0.08, amplitude: 24, duree: 19, retard: -17, rotation: 45 },
  { gauche: 3, haut: 26, taille: 46, opacite: 0.07, amplitude: 21, duree: 20, retard: -25, rotation: 50 },
  { gauche: 70, haut: 24, taille: 19, opacite: 0.12, amplitude: 37, duree: 13, retard: -3, rotation: 29 },
  { gauche: 39, haut: 38, taille: 36, opacite: 0.07, amplitude: 23, duree: 15, retard: -14, rotation: 41 },
  { gauche: 96, haut: 48, taille: 21, opacite: 0.10, amplitude: 35, duree: 18, retard: -20, rotation: 32 },
  { gauche: 25, haut: 51, taille: 27, opacite: 0.10, amplitude: 26, duree: 13, retard: -8, rotation: 46 },
  { gauche: 51, haut: 68, taille: 48, opacite: 0.07, amplitude: 20, duree: 21, retard: -27, rotation: 52 },
  { gauche: 6, haut: 82, taille: 23, opacite: 0.11, amplitude: 32, duree: 15, retard: -12, rotation: 30 },
  { gauche: 66, haut: 91, taille: 38, opacite: 0.08, amplitude: 29, duree: 20, retard: -23, rotation: 43 },
];

const VISIBLES_MOBILE = 10;

export default function Fond() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: "800px" }}
    >
      {CUBES.map((c, i) => (
        <span
          key={i}
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
            className="cube block"
            style={{
              width: c.taille,
              height: c.taille,
              animationDuration: `${c.rotation}s`,
              animationDelay: `${c.retard}s`,
              ["--demi" as string]: `${c.taille / 2}px`,
            }}
          >
            <span className="dessus" />
            <span className="avant" />
            <span className="cote" />
          </span>
        </span>
      ))}
    </div>
  );
}
