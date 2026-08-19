const MOTS = [
  "Impression 3D",
  "Fabriqué en Algérie",
  "Toutes les couleurs",
  "Paiement à la livraison",
  "Sur commande",
];

export default function Bandeau() {
  return (
    <div
      className="overflow-hidden border-y border-line bg-panel py-4"
      role="presentation"
      aria-hidden="true"
    >
      {/* La liste est doublee pour que la boucle soit invisible. */}
      <div className="defile flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((copie) => (
          <ul key={copie} className="flex gap-10">
            {MOTS.map((mot) => (
              <li key={mot} className="tag flex items-center gap-10 text-dim">
                {mot}
                <span className="h-1 w-1 rounded-full bg-heat" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
