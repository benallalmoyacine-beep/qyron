import type { Metadata } from "next";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import AddedToCartToast from "@/components/AddedToCartToast";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "QYRON",
  description: "Produits imprimés en 3D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <AddedToCartToast />
          <Header />
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
