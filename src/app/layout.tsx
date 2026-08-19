import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import Fond from "@/components/Fond";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  themeColor: "#08080b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${anton.variable}`}>
      <body className="grain min-h-dvh">
        <a href="#contenu" className="tag evitement bg-heat px-4 py-3 text-void">
          Aller au contenu
        </a>
        <Fond />
        <Header />
        <main id="contenu">{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
