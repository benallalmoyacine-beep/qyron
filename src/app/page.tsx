"use client";

import CarteChoix from "@/components/CarteChoix";
import { useT } from "@/lib/langue";

export default function Accueil() {
  const t = useT();

  return (
    // Hauteur calée sur l'écran moins l'en-tête et les onglets : les deux
    // cartes tiennent ensemble dans la vue, sans défilement.
    <div className="mx-auto flex h-[calc(100dvh-3.5rem-4rem)] max-w-[100rem] flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 md:flex-row">
      <CarteChoix
        href="/personnalise"
        image="/accueil/personnalise.jpg"
        alt={t.carte1Titre}
        titre={t.carte1Titre}
        sous={t.carte1Sous}
        bouton={t.carte1Bouton}
        prioritaire
      />
      <CarteChoix
        href="/boutique"
        image="/accueil/figurines.jpg"
        alt={t.carte2Titre}
        titre={t.carte2Titre}
        sous={t.carte2Sous}
        bouton={t.carte2Bouton}
        prioritaire
      />
    </div>
  );
}
