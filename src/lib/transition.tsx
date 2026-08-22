"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * Transition d'element partage entre la vignette du catalogue et la photo de
 * la fiche produit.
 *
 * React 19.1 n'expose pas encore ViewTransition et l'API native du navigateur
 * ne sait pas attendre qu'une navigation Next soit peinte. On fait donc voler
 * une copie de l'image au-dessus de la page : elle survit au changement de
 * route parce qu'elle est rendue depuis le gabarit, pas depuis la page.
 */

type Vol = {
  id: string;
  src: string;
  depart: DOMRect;
};

type Contexte = {
  envoler: (image: HTMLImageElement, id: string, href: string) => void;
};

const TransitionContext = createContext<Contexte | null>(null);

const DUREE = 420;
const COURBE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

/** Nombre d'images d'attente avant d'abandonner la recherche de la cible. */
const PATIENCE = 40;

function rectVersStyle(r: DOMRect) {
  return {
    transform: `translate(${r.left}px, ${r.top}px)`,
    width: `${r.width}px`,
    height: `${r.height}px`,
  };
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [vol, setVol] = useState<Vol | null>(null);
  const overlay = useRef<HTMLImageElement>(null);
  const chemin = usePathname();
  const router = useRouter();

  const envoler = useCallback(
    (image: HTMLImageElement, id: string, href: string) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      // currentSrc et non src : c'est le fichier reellement affiche par
      // next/image, donc la copie est au pixel pres la meme image.
      setVol({ id, src: image.currentSrc || image.src, depart: image.getBoundingClientRect() });

      const contenu = document.getElementById("contenu");
      if (contenu) contenu.dataset.transition = "sortie";

      router.push(href);
    },
    [router],
  );

  // Une fois la nouvelle page montee, on cherche la photo d'arrivee puis on
  // fait voler la copie de l'une a l'autre.
  useEffect(() => {
    if (!vol) return;

    const contenu = document.getElementById("contenu");
    let image = 0;
    let restant = PATIENCE;
    let annule = false;
    let fini = false;
    // Retenue des la cible trouvee : le filet de securite doit pouvoir lui
    // rendre sa visibilite meme si l'animation ne s'acheve jamais.
    let cibleMasquee: HTMLElement | null = null;

    function terminer() {
      if (fini) return;
      fini = true;
      if (contenu) delete contenu.dataset.transition;
      if (cibleMasquee) cibleMasquee.style.visibility = "";
      setVol(null);
    }

    function chercher() {
      if (annule) return;

      const cible = document.querySelector<HTMLElement>(`[data-arrivee="${vol!.id}"]`);
      const noeud = overlay.current;

      if (!cible || !noeud) {
        if (--restant <= 0) {
          // La fiche n'a pas de photo, ou la page a mis trop longtemps :
          // on rend la main sans laisser d'artefact a l'ecran.
          terminer();
          return;
        }
        image = requestAnimationFrame(chercher);
        return;
      }

      const arrivee = cible.getBoundingClientRect();
      if (arrivee.width === 0) {
        if (--restant <= 0) {
          terminer();
          return;
        }
        image = requestAnimationFrame(chercher);
        return;
      }

      // La vraie photo reste invisible tant que la copie n'a pas atterri,
      // sans quoi les deux se superposeraient en fin de course.
      cible.style.visibility = "hidden";
      cibleMasquee = cible;
      if (contenu) delete contenu.dataset.transition;

      const animation = noeud.animate(
        [rectVersStyle(vol!.depart), rectVersStyle(arrivee)],
        { duration: DUREE, easing: COURBE, fill: "forwards" },
      );

      animation.finished
        .catch(() => {})
        .finally(() => {
          if (!annule) terminer();
        });
    }

    image = requestAnimationFrame(chercher);

    // Filet de securite inconditionnel. requestAnimationFrame et les
    // animations Web se mettent en pause quand l'onglet passe en
    // arriere-plan, et animation.finished peut alors ne jamais se resoudre :
    // sans ce delai, la photo du produit resterait masquee indefiniment.
    // setTimeout, lui, finit toujours par se declencher.
    const secours = window.setTimeout(() => {
      if (!annule) terminer();
    }, DUREE + 600);

    return () => {
      annule = true;
      if (image) cancelAnimationFrame(image);
      clearTimeout(secours);
    };
    // Le changement de chemin est ce qui declenche la recherche.
  }, [vol, chemin]);

  return (
    <TransitionContext.Provider value={{ envoler }}>
      {children}
      {vol && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={overlay}
          src={vol.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-50 rounded-[18px] object-cover"
          style={rectVersStyle(vol.depart)}
        />
      )}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
