/**
 * Pastille de disponibilite. Le texte accompagne toujours la couleur :
 * le rouge et le vert sont la paire que les daltoniens distinguent le moins.
 */
export default function Statut({
  disponible,
  compact = false,
}: {
  disponible: boolean;
  compact?: boolean;
}) {
  return (
    <span
      className={
        compact
          ? "tag inline-flex items-center gap-1.5 rounded-full bg-void/85 px-2 py-1"
          : "inline-flex items-center gap-2"
      }
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${disponible ? "bg-ok" : "bg-ko"}`}
      />
      {disponible ? "Disponible" : "Indisponible"}
    </span>
  );
}
