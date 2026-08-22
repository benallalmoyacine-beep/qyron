"use client";

import { useT } from "@/lib/langue";

export default function Bandeau() {
  const mots = useT().bandeau;

  return (
    <div
      className="overflow-hidden border-y border-line bg-section py-4"
      role="presentation"
      aria-hidden="true"
    >
      {/* La liste est doublee pour que la boucle soit invisible. */}
      <div className="defile flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((copie) => (
          <ul key={copie} className="flex gap-10">
            {mots.map((mot) => (
              <li key={mot} className="tag flex items-center gap-10 text-dim">
                {mot}
                <span className="h-1 w-1 rounded-full bg-dim" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
