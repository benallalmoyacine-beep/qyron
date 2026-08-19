import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], display: "swap", variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "QYRON — Impression 3D",
  description: "Objets imprimés en 3D, fabriqués en Algérie.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-dvh">
        <Header />
        <main className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
