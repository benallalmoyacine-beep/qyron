export const LANGUES = ["fr", "en"] as const;
export type Langue = (typeof LANGUES)[number];

/**
 * Toutes les chaînes de l'interface. Le contenu saisi dans Airtable
 * (noms de produits, descriptions, page À propos) n'est pas traduit :
 * il s'affiche tel qu'il a été écrit.
 */
const fr = {
  // Choix de la langue
  choisirLangue: "Choisis ta langue",
  francais: "Français",
  anglais: "English",

  // Navigation
  allerAuContenu: "Aller au contenu",
  ouvrirMenu: "Ouvrir le menu",
  fermerMenu: "Fermer le menu",
  accueil: "Accueil",
  aPropos: "À propos",
  personnalise: "Personnalisé",
  boutique: "Boutique",
  reseaux: "Nos réseaux",
  fermer: "Fermer",

  // Accueil
  carte1Titre: "Crée ta figurine",
  carte1Sous: "Envoie tes photos, on te transforme en figurine.",
  carte1Bouton: "Commencer",
  carte2Titre: "Nos figurines",
  carte2Sous: "Modèles déjà prêts, livrés rapidement.",
  carte2Bouton: "Voir la boutique",

  // Boutique
  catalogue: "Le catalogue",
  rechercher: "Rechercher",
  rechercherPlaceholder: "Nom d'un produit…",
  effacerRecherche: "Effacer la recherche",
  resultat: "résultat",
  resultats: "résultats",
  pieces: "pièces",
  aucunResultat: "Aucun produit ne correspond",
  aucunProduit: "Aucun produit pour le moment",
  catalogueIndisponible: "Catalogue momentanément indisponible",

  // Produit
  retourCatalogue: "Catalogue",
  dimensions: "Dimensions",
  couleurs: "Couleurs",
  toutesCouleurs: "Toutes les couleurs",
  statut: "Statut",
  disponible: "Disponible",
  indisponible: "Indisponible",
  paiement: "Paiement",
  aLaLivraison: "À la livraison",
  fraisLivraison: "Frais de livraison",
  wilaya: "Wilaya",
  domicile: "Domicile",
  bureau: "Bureau",
  photoAVenir: "Photo à venir",

  // Bandeau et pied de page
  bandeau: [
    "Impression 3D",
    "Fabriqué en Algérie",
    "Toutes les couleurs",
    "Paiement à la livraison",
    "Sur commande",
  ],
  signature1: "Conçu ici.",
  signature2: "Imprimé ici.",
  signature3: "Livré partout.",
  piecesCatalogue: "Pièces au catalogue",
  wilayasLivrees: "Wilayas livrées",
  marque: "QYRON — Impression 3D — Algérie",
  impression3d: "Impression 3D — Algérie",

  // WhatsApp
  commander: "Commander",
  commanderWhatsApp: "Commander par WhatsApp (nouvel onglet)",

  // Personnalisé
  persoTitre: "Crée ta figurine",
  persoSous: "Envoie ta photo, on s'occupe du reste.",
  ajouteTaPhoto: "Ajoute ta photo",
  changerPhoto: "Changer la photo",
  prenom: "Prénom",
  nom: "Nom",
  creerFigurine: "Créer ma figurine",
  envoiEnCours: "Envoi en cours…",
  confirmerTitre: "Voulez-vous créer une figurine à partir de cette photo ?",
  oui: "Oui",
  annuler: "Annuler",
  merciDebut: "Merci",
  merciSuite:
    ", votre photo a bien été enregistrée. Contactez-nous maintenant sur Instagram pour confirmer votre commande.",
  ouvrirInstagram: "Ouvrir Instagram",
  autrePhoto: "Envoyer une autre photo",
  erreurEnvoi: "L'envoi a échoué. Vérifie ta connexion et réessaie.",
  erreurFormat: "Choisis une image (JPEG, PNG, WebP ou HEIC).",
  erreurTaille: "Cette image dépasse 15 Mo. Choisis-en une plus légère.",
  erreurLecture: "Impossible de lire cette image. Essaie une autre photo.",
  apercuPhoto: "Aperçu de la photo envoyée",
};


export type Textes = typeof fr;

const en: Textes = {
  choisirLangue: "Choose your language",
  francais: "Français",
  anglais: "English",

  allerAuContenu: "Skip to content",
  ouvrirMenu: "Open menu",
  fermerMenu: "Close menu",
  accueil: "Home",
  aPropos: "About",
  personnalise: "Custom",
  boutique: "Shop",
  reseaux: "Our socials",
  fermer: "Close",

  carte1Titre: "Create your figurine",
  carte1Sous: "Send your photos, we turn you into a figurine.",
  carte1Bouton: "Start",
  carte2Titre: "Our figurines",
  carte2Sous: "Ready-made models, delivered fast.",
  carte2Bouton: "View the shop",

  catalogue: "The catalogue",
  rechercher: "Search",
  rechercherPlaceholder: "Product name…",
  effacerRecherche: "Clear search",
  resultat: "result",
  resultats: "results",
  pieces: "items",
  aucunResultat: "No product matches",
  aucunProduit: "No products yet",
  catalogueIndisponible: "Catalogue temporarily unavailable",

  retourCatalogue: "Catalogue",
  dimensions: "Dimensions",
  couleurs: "Colours",
  toutesCouleurs: "All colours",
  statut: "Status",
  disponible: "Available",
  indisponible: "Unavailable",
  paiement: "Payment",
  aLaLivraison: "On delivery",
  fraisLivraison: "Delivery fees",
  wilaya: "Wilaya",
  domicile: "Home",
  bureau: "Office",
  photoAVenir: "Photo coming",

  bandeau: [
    "3D printing",
    "Made in Algeria",
    "All colours",
    "Cash on delivery",
    "Made to order",
  ],
  signature1: "Designed here.",
  signature2: "Printed here.",
  signature3: "Delivered everywhere.",
  piecesCatalogue: "Items in catalogue",
  wilayasLivrees: "Wilayas delivered",
  marque: "QYRON — 3D printing — Algeria",
  impression3d: "3D printing — Algeria",

  commander: "Order",
  commanderWhatsApp: "Order on WhatsApp (new tab)",

  persoTitre: "Create your figurine",
  persoSous: "Send your photo, we handle the rest.",
  ajouteTaPhoto: "Add your photo",
  changerPhoto: "Change photo",
  prenom: "First name",
  nom: "Last name",
  creerFigurine: "Create my figurine",
  envoiEnCours: "Sending…",
  confirmerTitre: "Create a figurine from this photo?",
  oui: "Yes",
  annuler: "Cancel",
  merciDebut: "Thank you",
  merciSuite:
    ", your photo has been saved. Contact us on Instagram now to confirm your order.",
  ouvrirInstagram: "Open Instagram",
  autrePhoto: "Send another photo",
  erreurEnvoi: "Sending failed. Check your connection and try again.",
  erreurFormat: "Please choose an image (JPEG, PNG, WebP or HEIC).",
  erreurTaille: "This image is over 15 MB. Please choose a smaller one.",
  erreurLecture: "Could not read this image. Try another photo.",
  apercuPhoto: "Preview of the uploaded photo",
};

export const TEXTES: Record<Langue, Textes> = { fr, en };
