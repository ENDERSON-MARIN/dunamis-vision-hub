import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/_components/common/SiteHeader";
import { SiteFooter } from "@/_components/common/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/_components/ecommerce/store";
import { formatBRL } from "@/lib/dunamis-data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Carrinho — DUNAMIS" }, { name: "description", content: "Revise os itens do seu carrinho." }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeFromCart, subtotal } = useStore();
  const shipping = subtotal > 0 && subtotal < 299 ? 29.9 : 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <>
      <SiteHeader />
      <section className="container-1440 py-10">
        <h1 className="font-display text-3xl font-semibold mb-1">Seu carrinho</h1>
        <p className="text-sm text-muted-foreground mb-8">{cart.length} {cart.length === 1 ? "item" : "itens"}</p>

        {cart.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-xl mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">Descubra nossas armações e óculos selecionados.</p>
            <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition">Explorar produtos <ArrowRight className="w-4 h-4" /></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <ul className="space-y-3">
              {cart.map(({ product, qty }) => (
                <li key={product.id} className="bg-card border border-border rounded-xl p-4 flex gap-4 items-center">
                  <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-md object-cover bg-secondary" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
                    <Link to="/product/$id" params={{ id: product.id }} className="font-display font-medium hover:text-primary line-clamp-1">{product.name}</Link>
                    <p className="text-xs text-muted-foreground mt-1">Cor: Preto · Tamanho: M</p>
                  </div>
                  <div className="inline-flex items-center border border-border rounded-md h-10">
                    <button onClick={() => setQty(product.id, qty - 1)} className="w-9 h-full grid place-items-center hover:bg-secondary" aria-label="Diminuir"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="w-9 h-full grid place-items-center hover:bg-secondary" aria-label="Aumentar"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="text-right min-w-24">
                    <p className="font-display font-semibold text-success">{formatBRL(product.price * qty)}</p>
                    {qty > 1 && <p className="text-xs text-muted-foreground">{formatBRL(product.price)} un</p>}
                  </div>
                  <button onClick={() => removeFromCart(product.id)} aria-label="Remover" className="h-9 w-9 grid place-items-center rounded-md hover:bg-destructive/10 hover:text-destructive transition">
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>

            <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-32 space-y-4">
              <h2 className="font-display text-lg font-semibold">Resumo do pedido</h2>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Cupom de desconto" className="pl-9 h-10" />
                </div>
                <Button variant="outline" className="h-10">Aplicar</Button>
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatBRL(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>{shipping === 0 ? <span className="text-success font-medium">Grátis</span> : formatBRL(shipping)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Desconto</span><span>{formatBRL(discount)}</span></div>
              </div>
              <div className="flex justify-between items-baseline border-t border-border pt-4">
                <span className="font-semibold">Total</span>
                <span className="font-display text-2xl font-semibold text-success">{formatBRL(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">em até 10x de {formatBRL(total / 10)} sem juros</p>
              <Link to="/checkout" className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover shadow-cta font-medium transition">
                Finalizar compra <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">Continuar comprando</Link>
            </aside>
          </div>
        )}
      </section>
      <SiteFooter />
    </>
  );
}
