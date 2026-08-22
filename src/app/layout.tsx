import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import ChoixLangue from "@/components/ChoixLangue";
import Fond from "@/components/Fond";
import Header from "@/components/Header";
import OngletsBas from "@/components/OngletsBas";
import LienEvitement from "@/components/LienEvitement";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LangueProvider } from "@/lib/langue";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-anton" });

export const metadata: Metadata = {
  title: "QYRON — Impression 3D",
  description: "Objets imprimés en 3D, fabriqués en Algérie.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080d1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${anton.variable}`}>
      {/* pb-16 : les onglets fixes du bas ne doivent jamais masquer le contenu. */}
      <body className="grain min-h-dvh pb-16">
        <LangueProvider>
          <ChoixLangue />
          <LienEvitement />
          <Fond />
          <Header />
          <main id="contenu">{children}</main>
          <WhatsAppButton />
          <OngletsBas />
        </LangueProvider>
      </body>
    </html>
  );
}
