"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export type CartItem = {
  id: string;
  nom: string;
  prix: number;
  photo: string;
  quantite: number;
};

type CartValue = {
  items: CartItem[];
  count: number;
  total: number;
  ready: boolean;
  toast: boolean;
  add: (item: Omit<CartItem, "quantite">) => void;
  setQuantite: (id: string, quantite: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  dismissToast: () => void;
};

const STORAGE_KEY = "qyron.panier";
const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  function add(item: Omit<CartItem, "quantite">) {
    setItems((current) => {
      const existing = current.find((i) => i.id === item.id);
      if (existing) {
        return current.map((i) => (i.id === item.id ? { ...i, quantite: i.quantite + 1 } : i));
      }
      return [...current, { ...item, quantite: 1 }];
    });

    setToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(false), 4000);
  }

  function setQuantite(id: string, quantite: number) {
    if (quantite < 1) return;
    setItems((current) => current.map((i) => (i.id === id ? { ...i, quantite } : i)));
  }

  function remove(id: string) {
    setItems((current) => current.filter((i) => i.id !== id));
  }

  const value: CartValue = {
    items,
    count: items.reduce((n, i) => n + i.quantite, 0),
    total: items.reduce((n, i) => n + i.prix * i.quantite, 0),
    ready,
    toast,
    add,
    setQuantite,
    remove,
    clear: () => setItems([]),
    dismissToast: () => setToast(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart doit être utilisé dans un CartProvider");
  return value;
}
