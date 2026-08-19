import "server-only";

const API = "https://api.airtable.com/v0";

export type Produit = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  photos: string[];
  dimensions: string;
  disponible: boolean;
};

export type FraisLivraison = {
  wilaya: string;
  domicile: number;
  bureau: number;
};

export type NouvelleCommande = {
  produits: string;
  total: number;
  fraisLivraison: number;
  nom: string;
  telephone: string;
  wilaya: string;
  commune: string;
  adresse: string;
  modeLivraison: "Domicile" | "Bureau";
};

type AirtableAttachment = { url: string; thumbnails?: { large?: { url: string } } };
type AirtableRecord = { id: string; fields: Record<string, unknown> };

function env(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Variable d'environnement manquante : ${name}`);
  return value;
}

function endpoint(table: string) {
  return `${API}/${env("AIRTABLE_BASE_ID")}/${encodeURIComponent(table)}`;
}

function authHeaders() {
  return { Authorization: `Bearer ${env("AIRTABLE_API_KEY")}` };
}

async function listRecords(
  table: string,
  params: URLSearchParams,
  revalidate: number,
): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const query = new URLSearchParams(params);
    if (offset) query.set("offset", offset);

    const res = await fetch(`${endpoint(table)}?${query}`, {
      headers: authHeaders(),
      next: { revalidate },
    });
    if (!res.ok) {
      throw new Error(`Airtable ${table} : ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as { records: AirtableRecord[]; offset?: string };
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

function toProduit(record: AirtableRecord): Produit {
  const f = record.fields;
  const photos = (f.Photos as AirtableAttachment[] | undefined) ?? [];
  return {
    id: record.id,
    nom: (f.Nom as string) ?? "",
    description: (f.Description as string) ?? "",
    prix: (f.Prix as number) ?? 0,
    photos: photos.map((p) => p.thumbnails?.large?.url ?? p.url),
    dimensions: (f.Dimensions as string) ?? "",
    disponible: Boolean(f.Disponible),
  };
}

export async function getProduits(): Promise<Produit[]> {
  const params = new URLSearchParams({
    "sort[0][field]": "Ordre",
    "sort[0][direction]": "asc",
  });
  const records = await listRecords(env("AIRTABLE_TABLE_PRODUITS", "Produits"), params, 60);
  return records.map(toProduit);
}

export async function getProduit(id: string): Promise<Produit | null> {
  const table = env("AIRTABLE_TABLE_PRODUITS", "Produits");
  const res = await fetch(`${endpoint(table)}/${id}`, {
    headers: authHeaders(),
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Airtable ${table}/${id} : ${res.status}`);
  return toProduit((await res.json()) as AirtableRecord);
}

export async function getFraisLivraison(): Promise<FraisLivraison[]> {
  const records = await listRecords(
    env("AIRTABLE_TABLE_FRAIS", "FraisLivraison"),
    new URLSearchParams(),
    300,
  );
  return records.map((r) => ({
    wilaya: (r.fields.Wilaya as string) ?? "",
    domicile: (r.fields.TarifDomicile as number) ?? 0,
    bureau: (r.fields.TarifBureau as number) ?? 0,
  }));
}

export async function createCommande(commande: NouvelleCommande): Promise<string> {
  const table = env("AIRTABLE_TABLE_COMMANDES", "Commandes");
  const res = await fetch(endpoint(table), {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      fields: {
        Produits: commande.produits,
        Total: commande.total,
        FraisLivraison: commande.fraisLivraison,
        Nom: commande.nom,
        Telephone: commande.telephone,
        Wilaya: commande.wilaya,
        Commune: commande.commune,
        Adresse: commande.adresse,
        ModeLivraison: commande.modeLivraison,
        Statut: "Nouvelle",
      },
      typecast: true,
    }),
  });

  if (!res.ok) {
    throw new Error(`Airtable ${table} : ${res.status} ${await res.text()}`);
  }

  const record = (await res.json()) as AirtableRecord;
  return String(record.fields.Numero ?? record.id);
}
