import type { FraisLivraison } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";

export default function DetailsLivraison({ frais }: { frais: FraisLivraison[] }) {
  if (frais.length === 0) return null;

  return (
    <details className="mt-10 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
      <summary className="flex min-h-14 cursor-pointer items-center justify-between px-5 py-4 font-medium">
        Frais de livraison
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="chevron shrink-0 text-muted"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="max-h-96 overflow-y-auto border-t border-line">
        <table className="w-full text-left text-[15px]">
          <thead className="sticky top-0 bg-surface text-sm text-muted">
            <tr>
              <th scope="col" className="px-5 py-2.5 font-normal">
                Wilaya
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-normal">
                Domicile
              </th>
              <th scope="col" className="px-5 py-2.5 text-right font-normal">
                Bureau
              </th>
            </tr>
          </thead>
          <tbody>
            {frais.map((f) => (
              <tr key={f.wilaya} className="border-t border-line">
                <td className="px-5 py-2.5">{f.wilaya}</td>
                <td className="chiffres px-3 py-2.5 text-right">{formatPrix(f.domicile)}</td>
                <td className="chiffres px-5 py-2.5 text-right">{formatPrix(f.bureau)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
