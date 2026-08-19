import type { FraisLivraison } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";

export default function DetailsLivraison({ frais }: { frais: FraisLivraison[] }) {
  if (frais.length === 0) return null;

  return (
    <details className="mt-8 overflow-hidden rounded-sm bg-panel">
      <summary className="tag flex min-h-14 cursor-pointer items-center justify-between gap-4 px-4 py-4">
        Frais de livraison
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="chevron shrink-0 text-dim"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="max-h-80 overflow-y-auto border-t border-line/50">
        <table className="w-full text-left text-sm">
          <thead className="tag sticky top-0 bg-panel text-dim">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-normal">
                Wilaya
              </th>
              <th scope="col" className="px-2 py-2.5 text-right font-normal">
                Domicile
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-normal">
                Bureau
              </th>
            </tr>
          </thead>
          <tbody>
            {frais.map((f) => (
              <tr key={f.wilaya} className="border-t border-line/40">
                <td className="px-4 py-2.5">{f.wilaya}</td>
                <td className="chiffres px-2 py-2.5 text-right">{formatPrix(f.domicile)}</td>
                <td className="chiffres px-4 py-2.5 text-right">{formatPrix(f.bureau)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
