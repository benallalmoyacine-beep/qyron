# QYRON

Boutique en ligne pour produits imprimés en 3D. Next.js + Airtable, paiement à la livraison.

## Mise en route

1. Créer la base Airtable avec les trois tables décrites ci-dessous.
2. Copier `.env.example` vers `.env.local` et remplir les valeurs.
3. `npm install` puis `npm run dev`.

## Tables Airtable

**Produits** — `Nom` (texte), `Description` (texte long), `Prix` (nombre), `Photos` (pièces jointes),
`Dimensions` (texte, ex. `10 x 8 x 6`), `Disponible` (case à cocher), `Ordre` (nombre).

Décocher `Disponible` grise le bouton « Commander » sur le site ; la carte produit reste visible.

**Commandes** — `Numero` (numéro auto), `Produits` (texte long), `Total` (nombre),
`FraisLivraison` (nombre), `Nom`, `Telephone`, `Wilaya`, `Commune` (textes), `Adresse` (texte long),
`ModeLivraison` (liste : Domicile, Bureau), `Statut` (liste, valeur `Nouvelle` créée automatiquement).

**FraisLivraison** — `Wilaya` (texte), `TarifDomicile` (nombre), `TarifBureau` (nombre).

Importer `airtable-frais-livraison.csv` pour créer les 69 lignes, puis saisir les tarifs.

## Données wilayas/communes

`src/data/wilayas.json` contient les 69 wilayas et 1541 communes (découpage administratif
issu de la loi 26-06 d'avril 2026). Généré depuis le jeu de données `geoalgeria` (MIT).

## Déploiement

Vercel. Renseigner les mêmes variables d'environnement dans les réglages du projet.
Le catalogue est mis en cache 60 s et les frais de livraison 300 s, ce qui garde les appels
sous la limite Airtable de 5 requêtes/seconde.
