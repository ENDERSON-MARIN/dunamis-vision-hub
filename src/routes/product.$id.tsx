import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/_components/common/SiteHeader";
import { SiteFooter } from "@/_components/common/SiteFooter";
import { Button } from "@/components/ui/button";
import { allProducts, formatBRL } from "@/lib/dunamis-data";
import { useStore } from "@/_components/ecommerce/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = allProducts.find(p => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Produto"} — DUNAMIS` },
      { name: "description", content: `${loaderData?.product.name} por ${loaderData ? formatBRL(loaderData.product.price) : ""}. Compre na DUNAMIS.` },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  notFoundComponent: () => (
    <>
      <SiteHeader />
      <div className="container-1440 py-24 text-center">
        <h1 className="font-display text-3xl">Produto não encontrado</h1>
        <Link to="/" className="text-primary hover:underline mt-3 inline-block">Voltar para a home</Link>
      </div>
      <SiteFooter />
    </>
  ),
  component: PDP,
});

function PDP() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleFavorite, isFav } = useStore();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0] ?? "#000");
  const [size, setSize] = useState<"S" | "M" | "L">("M");
  const fav = isFav(product.id);
  const images = [product.image, product.image, product.image, product.image];
  const [main, setMain] = useState(0);

  return (
    <>
      <SiteHeader />
      <div className="container-1440 py-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Trilha">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <section className="container-1440 grid lg:grid-cols-[1.2fr_1fr] gap-10 pb-16">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setMain(i)} className={`aspect-square rounded-md overflow-hidden border-2 transition ${main === i ? "border-primary" : "border-border hover:border-foreground/30"}`} aria-label={`Ver imagem ${i + 1}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border group">
            <img src={images[main]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start space-y-5">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold mt-1.5">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3 text-sm">
              <div className="flex items-center gap-0.5" aria-label={`Avaliação ${product.rating}`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating ?? 0) ? "fill-foreground text-foreground" : "text-border"}`} />
                ))}
              </div>
              <span className="font-medium">{product.rating?.toFixed(1)}</span>
              <span className="text-muted-foreground">({product.reviews} avaliações)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-success">{formatBRL(product.price)}</span>
            {product.originalPrice && <span className="text-base text-muted-foreground line-through">{formatBRL(product.originalPrice)}</span>}
          </div>
          <p className="text-sm text-muted-foreground">em até <strong className="text-foreground">10x de {formatBRL(product.price / 10)}</strong> sem juros</p>

          {product.colors && (
            <div>
              <p className="text-sm font-medium mb-2">Cor: <span className="text-muted-foreground font-normal">{color}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c: string) => (
                  <button key={c} onClick={() => setColor(c)} aria-label={`Cor ${c}`} className={`w-9 h-9 rounded-full border-2 transition ${color === c ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-foreground/40"}`} style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-medium mb-2">Tamanho</p>
            <div className="flex gap-2">
              {(["S", "M", "L"] as const).map(s => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-16 h-11 px-4 rounded-md border-2 text-sm font-medium transition ${size === s ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-foreground/40"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="inline-flex items-center border border-border rounded-md h-12">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-full grid place-items-center hover:bg-secondary transition" aria-label="Diminuir"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-medium" aria-live="polite">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-11 h-full grid place-items-center hover:bg-secondary transition" aria-label="Aumentar"><Plus className="w-4 h-4" /></button>
            </div>
            <Button onClick={() => addToCart(product, qty)} className="flex-1 h-12 bg-primary hover:bg-primary-hover text-primary-foreground shadow-cta text-base font-medium">
              <ShoppingBag className="w-5 h-5" /> Adicionar ao Carrinho
            </Button>
            <Button variant="outline" size="icon" onClick={() => toggleFavorite(product.id)} aria-label="Favoritar" className="h-12 w-12">
              <Heart className={`w-5 h-5 ${fav ? "fill-destructive text-destructive" : ""}`} />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
            {[
              { icon: Truck, t: "Frete grátis", s: "Acima de R$ 299" },
              { icon: RotateCcw, t: "30 dias", s: "Para trocar" },
              { icon: ShieldCheck, t: "Garantia", s: "12 meses" },
            ].map(({ icon: I, t, s }) => (
              <div key={t} className="text-center p-3 rounded-lg bg-secondary/50">
                <I className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-xs font-semibold">{t}</p>
                <p className="text-[11px] text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Material:</strong> acetato premium / metal hipoalergênico</p>
            <p><strong className="text-foreground">Cabe receituário:</strong> sim, multifocal e progressiva</p>
            <p><strong className="text-foreground">Acompanha:</strong> estojo rígido + flanela DUNAMIS</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
