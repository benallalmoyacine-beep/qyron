import type { FraisLivraison } from "@/lib/airtable";
import { formatPrix } from "@/lib/format";

export default function DetailsLivraison({ frais }: { frais: FraisLivraison[] }) {
  if (frais.length === 0) return null;

  return (
    <details className="mt-6 border-t border-line pt-4">
      <summary className="cursor-pointer">Détails — frais de livraison</summary>

      <table className="mt-4 w-full text-left">
        <thead className="text-muted">
          <tr>
            <th className="py-1 font-normal">Wilaya</th>
            <th className="py-1 font-normal">Domicile</th>
            <th className="py-1 font-normal">Bureau</th>
          </tr>
        </thead>
        <tbody>
          {frais.map((f) => (
            <tr key={f.wilaya} className="border-t border-line">
              <td className="py-1">{f.wilaya}</td>
              <td className="py-1">{formatPrix(f.domicile)}</td>
              <td className="py-1">{formatPrix(f.bureau)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
