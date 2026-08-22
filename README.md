# QYRON

Vitrine en ligne de produits imprimés en 3D. Next.js + Airtable.
Pas de panier : les clients commandent par WhatsApp.

## Mise en route

1. Créer la base Airtable avec les quatre tables décrites ci-dessous.
2. Copier `.env.example` vers `.env.local` et remplir les valeurs.
3. `npm install` puis `npm run dev`.

## Tables Airtable

**Produits** — `Nom` (texte), `Description` (texte long), `Prix` (nombre), `Photos` (pièces jointes),
`Dimensions` (texte, ex. `10 x 8 x 6`), `Disponible` (case à cocher), `Ordre` (nombre).

Décocher `Disponible` affiche « Indisponible » sur le produit ; il reste visible dans la vitrine.
Sans champ `Ordre`, les produits s'affichent dans l'ordre d'Airtable.

**FraisLivraison** — `Wilaya` (texte), `TarifDomicile` (nombre), `TarifBureau` (nombre).
Alimente la section « Détails » de chaque fiche produit.
Importer `airtable-frais-livraison.csv` pour créer les 69 lignes, puis saisir les tarifs.
Les wilayas sans tarif saisi s'affichent à 0 DA.

**DemandesPersonnalisees** — `Prenom` (texte), `Nom` (texte), `Photo` (texte, URL),
`Date` (date), `Statut` (liste : Nouvelle demande, Contactee, Confirmee, Annulee),
`Notes` (texte long, usage interne).

Chaque demande envoyee depuis /personnalise cree une ligne. Le champ `Photo` contient un lien
vers /api/photo : cette route est le seul moyen de lire le fichier, stocke en prive sur Vercel
Blob. Changer `PHOTO_ACCESS_KEY` invalide tous les liens deja envoyes.

**Contenu** — `Page` (texte), `Titre` (texte), `Texte` (texte long), `Ordre` (nombre).

Alimente les pages de texte libre. Pour la page « À propos », saisir `a-propos` dans `Page` :
chaque ligne devient une section, affichée dans l'ordre du champ `Ordre`.


## Déploiement

Vercel, preset Next.js (forcé par `vercel.json`). Renseigner les mêmes variables
d'environnement dans les réglages du projet.

Les pages sont rendues à la demande : un déploiement aboutit même si Airtable est
indisponible. Les réponses sont mises en cache 60 s (produits) et 300 s (frais de
livraison), ce qui garde les appels sous la limite Airtable de 5 requêtes/seconde.
