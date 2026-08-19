import Link from "next/link";

export default async function Confirmation({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-xl font-semibold">Commande confirmée</h1>
      <p className="mt-4">
        Votre numéro de commande : <span className="text-accent">{decodeURIComponent(numero)}</span>
      </p>
      <p className="mt-2 text-muted">
        Nous vous contacterons par téléphone pour confirmer la livraison. Paiement à la livraison.
      </p>
      <Link href="/" className="mt-6 inline-block text-accent">
        Retour à la boutique
      </Link>
    </div>
  );
}
