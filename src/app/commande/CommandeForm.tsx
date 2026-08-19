"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import wilayas from "@/data/wilayas.json";
import type { FraisLivraison } from "@/lib/airtable";
import { useCart } from "@/lib/cart";
import { formatPrix } from "@/lib/format";
import { passerCommande } from "./actions";

const champ = "mt-1 w-full border border-line bg-white px-3 py-2";

export default function CommandeForm({ frais }: { frais: FraisLivraison[] }) {
  const router = useRouter();
  const { items, total, ready, clear } = useCart();

  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [modeLivraison, setModeLivraison] = useState<"Domicile" | "Bureau">("Domicile");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  const communes = useMemo(
    () => wilayas.find((w) => w.nom === wilaya)?.communes ?? [],
    [wilaya],
  );

  const tarif = frais.find((f) => f.wilaya === wilaya);
  const fraisLivraison = modeLivraison === "Bureau" ? (tarif?.bureau ?? 0) : (tarif?.domicile ?? 0);

  if (!ready) return null;

  if (items.length === 0) {
    return <p className="text-muted">Votre panier est vide.</p>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur("");
    setEnvoi(true);

    const data = new FormData(e.currentTarget);
    const resultat = await passerCommande(
      items.map((i) => ({ id: i.id, quantite: i.quantite })),
      {
        nom: String(data.get("nom") ?? ""),
        telephone: String(data.get("telephone") ?? ""),
        wilaya,
        commune,
        adresse: String(data.get("adresse") ?? ""),
        modeLivraison,
      },
    );

    if (!resultat.ok) {
      setErreur(resultat.erreur);
      setEnvoi(false);
      return;
    }

    clear();
    router.push(`/commande/confirmation/${encodeURIComponent(resultat.numero)}`);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl">
      <label className="block">
        Nom
        <input name="nom" required autoComplete="name" className={champ} />
      </label>

      <label className="mt-4 block">
        Téléphone
        <input
          name="telephone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={champ}
        />
      </label>

      <label className="mt-4 block">
        Wilaya
        <select
          required
          value={wilaya}
          onChange={(e) => {
            setWilaya(e.target.value);
            setCommune("");
          }}
          className={champ}
        >
          <option value="">Choisir une wilaya</option>
          {wilayas.map((w) => (
            <option key={w.code} value={w.nom}>
              {w.code} — {w.nom}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        Commune
        <select
          required
          value={commune}
          disabled={!wilaya}
          onChange={(e) => setCommune(e.target.value)}
          className={champ}
        >
          <option value="">Choisir une commune</option>
          {communes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        Adresse
        <textarea name="adresse" required rows={2} className={champ} />
      </label>

      <fieldset className="mt-4">
        <legend>Livraison</legend>
        <label className="mt-1 flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            checked={modeLivraison === "Domicile"}
            onChange={() => setModeLivraison("Domicile")}
          />
          À domicile
        </label>
        <label className="mt-1 flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            checked={modeLivraison === "Bureau"}
            onChange={() => setModeLivraison("Bureau")}
          />
          Au bureau
        </label>
      </fieldset>

      <div className="mt-6 border-t border-line pt-4">
        <div className="flex justify-between">
          <span className="text-muted">Sous-total</span>
          <span>{formatPrix(total)}</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-muted">Livraison</span>
          <span>{wilaya ? formatPrix(fraisLivraison) : "—"}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span>Total</span>
          <span className="text-accent">{formatPrix(total + fraisLivraison)}</span>
        </div>
      </div>

      <p className="mt-4 text-muted">Paiement à la livraison.</p>

      {erreur && <p className="mt-4 text-accent">{erreur}</p>}

      <button
        type="submit"
        disabled={envoi}
        className="mt-6 w-full bg-accent py-2 text-white disabled:bg-line disabled:text-muted"
      >
        {envoi ? "Envoi…" : "Confirmer la commande"}
      </button>
    </form>
  );
}
