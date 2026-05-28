import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, X } from "lucide-react";
import { SiteHeader } from "@/_components/common/SiteHeader";
import { SiteFooter } from "@/_components/common/SiteFooter";
import { Button } from "@/components/ui/button";
import { useStore } from "@/_components/ecommerce/store";
import { allProducts, formatBRL } from "@/lib/dunamis-data";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Favoritos — DUNAMIS" }, { name: "description", content: "Seus produtos salvos." }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const products = allProducts.filter(p => favorites.includes(p.id));

  return (
    <>
      <SiteHeader />
      <section className="container-1440 py-10">
        <h1 className="font-display text-3xl font-semibold mb-1">Favoritos</h1>
        <p className="text-sm text-muted-foreground mb-8">{products.length} {products.length === 1 ? "item salvo" : "itens salvos"}</p>

        {products.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-xl mb-2">Você ainda não favoritou nada</h2>
            <p className="text-muted-foreground mb-6">Toque no coração de qualquer produto para salvá-lo aqui.</p>
            <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition">Explorar produtos</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => (
              <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden group">
                <div className="relative aspect-square bg-secondary/40">
                  <Link to="/product/$id" params={{ id: p.id }}>
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </Link>
                  <button onClick={() => toggleFavorite(p.id)} aria-label="Remover" className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-card/90 shadow-card hover:bg-card">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.brand}</p>
                  <h3 className="font-display font-medium line-clamp-1">{p.name}</h3>
                  <p className="font-display font-semibold text-success mt-1">{formatBRL(p.price)}</p>
                  <Button onClick={() => addToCart(p)} className="w-full mt-3 h-10 bg-primary hover:bg-primary-hover">
                    <ShoppingBag className="w-4 h-4" /> Mover para o carrinho
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </>
  );
}
