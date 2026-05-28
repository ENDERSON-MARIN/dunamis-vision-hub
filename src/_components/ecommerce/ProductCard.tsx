import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/dunamis-data";
import { formatBRL } from "@/lib/dunamis-data";
import { useStore } from "@/_components/ecommerce/store";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFav } = useStore();
  const fav = isFav(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <article className="group relative bg-card rounded-xl border border-border/60 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <Link to="/product/$id" params={{ id: product.id }} className="block w-full h-full" aria-label={product.name}>
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>

        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-md bg-foreground text-background">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-12 text-[10px] font-bold px-2 py-1 rounded-md bg-success text-success-foreground">
            -{discount}%
          </span>
        )}

        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={fav}
          className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-card/90 hover:bg-card shadow-card transition"
        >
          <Heart className={`w-4 h-4 transition ${fav ? "fill-destructive text-destructive" : "text-foreground"}`} />
        </button>

        <button
          onClick={(e) => { e.preventDefault(); addToCart(product); }}
          className="absolute left-3 right-3 bottom-3 h-10 rounded-md bg-foreground text-background text-sm font-medium inline-flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <ShoppingBag className="w-4 h-4" /> Adição rápida
        </button>
      </div>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-[11px] tracking-wider uppercase text-muted-foreground">{product.brand}</span>
        <h3 className="font-display text-[15px] font-medium leading-tight line-clamp-1">
          <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>

        {product.colors && (
          <div className="flex items-center gap-1 mt-1" aria-label="Cores disponíveis">
            {product.colors.map(c => (
              <span key={c} className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}

        {product.rating && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-foreground text-foreground" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span>({product.reviews})</span>
          </div>
        )}

        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display text-lg font-semibold text-success">{formatBRL(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatBRL(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
