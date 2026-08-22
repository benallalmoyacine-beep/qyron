/**
 * Diagnostique la table DemandesPersonnalisees et la crée si elle manque.
 *
 *   node scripts/airtable-demandes.mjs
 *
 * Le token est lu dans .env.local et n'est jamais affiché.
 * La création exige la permission « schema.bases:write » sur le token.
 */

import { readFileSync } from "node:fs";

function lireEnv() {
  let brut;
  try {
    brut = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  } catch {
    arreter("Fichier .env.local introuvable à la racine du projet.");
  }

  const env = {};
  for (const ligne of brut.split("\n")) {
    const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

function arreter(message) {
  console.error("\n  ✗ " + message + "\n");
  process.exit(1);
}

const env = lireEnv();
const TOKEN = env.AIRTABLE_API_KEY;
const BASE = env.AIRTABLE_BASE_ID;
const NOM_TABLE = env.AIRTABLE_TABLE_DEMANDES || "DemandesPersonnalisees";

if (!TOKEN) arreter("AIRTABLE_API_KEY est vide dans .env.local. Colle ton token puis relance.");
if (!BASE) arreter("AIRTABLE_BASE_ID est vide dans .env.local.");

const entetes = { Authorization: `Bearer ${TOKEN}` };

console.log(`\n  Base   : ${BASE}`);
console.log(`  Table  : ${NOM_TABLE}\n`);

// 1. Lister les tables : vérifie la permission schema.bases:read.
const resSchema = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE}/tables`, {
  headers: entetes,
});

if (resSchema.status === 401) arreter("Token refusé (401). Il est peut-être révoqué ou mal collé.");
if (resSchema.status === 403) {
  arreter(
    "Le token n'a pas la permission « schema.bases:read ».\n" +
      "    Ajoute-la sur https://airtable.com/create/tokens puis relance.",
  );
}
if (!resSchema.ok) arreter(`Lecture du schéma impossible : ${resSchema.status}`);

const { tables } = await resSchema.json();
console.log("  Tables présentes dans la base :");
for (const t of tables) console.log(`    · ${t.name}`);
console.log("");

const existante = tables.find((t) => t.name === NOM_TABLE);

if (existante) {
  const champs = existante.fields.map((f) => f.name);
  console.log(`  ✓ La table « ${NOM_TABLE} » existe.`);
  console.log(`    Champs : ${champs.join(", ")}\n`);

  const attendus = ["Prenom", "Nom", "Photo", "Date", "Statut"];
  const manquants = attendus.filter((c) => !champs.includes(c));

  if (manquants.length) {
    console.log(`  ✗ Champs manquants ou mal orthographiés : ${manquants.join(", ")}`);
    console.log("    Les noms doivent être écrits exactement ainsi, sans accent.\n");
  } else {
    console.log("  ✓ Tous les champs attendus sont présents.");
    console.log("    L'erreur 403 vient donc de la permission d'écriture :");
    console.log("    ajoute « data.records:write » au token sur");
    console.log("    https://airtable.com/create/tokens\n");
  }
  process.exit(0);
}

// 2. La table n'existe pas (ou reste invisible au token) : on la crée.
console.log(`  La table « ${NOM_TABLE} » est absente. Création…\n`);

const resCreation = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE}/tables`, {
  method: "POST",
  headers: { ...entetes, "Content-Type": "application/json" },
  body: JSON.stringify({
    name: NOM_TABLE,
    description: "Demandes de figurines personnalisées envoyées depuis le site.",
    fields: [
      { name: "Prenom", type: "singleLineText" },
      { name: "Nom", type: "singleLineText" },
      { name: "Photo", type: "singleLineText" },
      { name: "Date", type: "dateTime", options: {
        dateFormat: { name: "iso" },
        timeFormat: { name: "24hour" },
        timeZone: "Africa/Algiers",
      } },
      { name: "Statut", type: "singleSelect", options: {
        choices: [
          { name: "Nouvelle demande" },
          { name: "Contactee" },
          { name: "Confirmee" },
          { name: "Annulee" },
        ],
      } },
      { name: "Notes", type: "multilineText" },
    ],
  }),
});

if (resCreation.status === 403) {
  arreter(
    "Le token n'a pas la permission « schema.bases:write ».\n" +
      "    Ajoute-la sur https://airtable.com/create/tokens puis relance ce script.",
  );
}

if (!resCreation.ok) {
  arreter(`Création refusée (${resCreation.status}) : ${await resCreation.text()}`);
}

console.log(`  ✓ Table « ${NOM_TABLE} » créée avec tous ses champs.`);
console.log("    Vérifie que le token a aussi « data.records:write », puis réessaie");
console.log("    depuis le site.\n");
