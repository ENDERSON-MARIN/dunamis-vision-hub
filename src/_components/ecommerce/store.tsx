import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/lib/dunamis-data";

type CartLine = { product: Product; qty: number };

type StoreCtx = {
  cart: CartLine[];
  favorites: string[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleFavorite: (id: string) => void;
  isFav: (id: string) => boolean;
  cartCount: number;
  subtotal: number;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("dunamis_cart");
      const f = localStorage.getItem("dunamis_favs");
      if (c) setCart(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {}
  }, []);

  useEffect(() => { try { localStorage.setItem("dunamis_cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("dunamis_favs", JSON.stringify(favorites)); } catch {} }, [favorites]);

  const addToCart = (product: Product, qty = 1) =>
    setCart(prev => {
      const i = prev.findIndex(l => l.product.id === product.id);
      if (i >= 0) {
        const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + qty }; return next;
      }
      return [...prev, { product, qty }];
    });
  const removeFromCart = (id: string) => setCart(p => p.filter(l => l.product.id !== id));
  const setQty = (id: string, qty: number) =>
    setCart(p => p.map(l => l.product.id === id ? { ...l, qty: Math.max(1, qty) } : l));
  const toggleFavorite = (id: string) =>
    setFavorites(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const isFav = (id: string) => favorites.includes(id);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const subtotal = cart.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <Ctx.Provider value={{ cart, favorites, addToCart, removeFromCart, setQty, toggleFavorite, isFav, cartCount, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used inside StoreProvider");
  return c;
};
