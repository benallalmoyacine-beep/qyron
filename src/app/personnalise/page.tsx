import VuePersonnalise from "@/components/VuePersonnalise";

export const metadata = {
  title: "Crée ta figurine — QYRON",
};

const INSTAGRAM_PAR_DEFAUT = "https://www.instagram.com/qyrondz/";

export default function Personnalise() {
  return (
    <VuePersonnalise instagram={process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? INSTAGRAM_PAR_DEFAUT} />
  );
}
