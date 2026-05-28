import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, ShieldCheck, CreditCard, Check, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/_components/common/SiteHeader";
import { SiteFooter } from "@/_components/common/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@/_components/ecommerce/store";
import { formatBRL } from "@/lib/dunamis-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — DUNAMIS" }, { name: "description", content: "Finalize sua compra com segurança." }] }),
  component: CheckoutPage,
});

const checkoutSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(120),
  fullName: z.string().trim().min(3, "Informe seu nome completo").max(80),
  cpf: z.string().trim().min(11, "CPF inválido").max(14),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  zip: z.string().trim().min(8, "CEP inválido").max(9),
  street: z.string().trim().min(3).max(120),
  number: z.string().trim().min(1).max(10),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(2),
  payment: z.enum(["pix", "credit", "boleto"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

function CheckoutPage() {
  const { cart, subtotal } = useStore();
  const [done, setDone] = useState(false);
  const shipping = subtotal > 0 && subtotal < 299 ? 29.9 : 0;
  const total = subtotal + shipping;

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { payment: "pix" },
  });
  const payment = watch("payment");

  const onSubmit = async (_data: CheckoutForm) => {
    await new Promise(r => setTimeout(r, 900));
    setDone(true);
  };

  if (done) {
    return (
      <>
        <SiteHeader />
        <section className="container-1440 py-20 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-success/15 text-success grid place-items-center mb-4"><Check className="w-8 h-8" /></div>
          <h1 className="font-display text-3xl font-semibold">Pedido confirmado!</h1>
          <p className="text-muted-foreground mt-2">Enviamos os detalhes e o código de rastreio para seu e-mail.</p>
          <Link to="/" className="inline-flex mt-6 h-11 px-6 items-center rounded-md bg-primary text-primary-foreground hover:bg-primary-hover">Voltar para a home</Link>
        </section>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <section className="container-1440 py-10">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Trilha">
          <Link to="/cart" className="hover:text-foreground">Carrinho</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Checkout</span>
        </nav>
        <h1 className="font-display text-3xl font-semibold mb-8">Finalizar compra</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-8">
            <Section title="1. Contato">
              <Field label="E-mail" id="email" error={errors.email?.message}><Input id="email" type="email" {...register("email")} /></Field>
              <Field label="Telefone" id="phone" error={errors.phone?.message}><Input id="phone" {...register("phone")} placeholder="(11) 99999-9999" /></Field>
            </Section>

            <Section title="2. Endereço de entrega">
              <Field label="Nome completo" id="fullName" error={errors.fullName?.message}><Input id="fullName" {...register("fullName")} /></Field>
              <Field label="CPF" id="cpf" error={errors.cpf?.message}><Input id="cpf" {...register("cpf")} placeholder="000.000.000-00" /></Field>
              <Field label="CEP" id="zip" error={errors.zip?.message}><Input id="zip" {...register("zip")} placeholder="00000-000" /></Field>
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <Field label="Rua" id="street" error={errors.street?.message}><Input id="street" {...register("street")} /></Field>
                <Field label="Número" id="number" error={errors.number?.message}><Input id="number" {...register("number")} /></Field>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <Field label="Cidade" id="city" error={errors.city?.message}><Input id="city" {...register("city")} /></Field>
                <Field label="UF" id="state" error={errors.state?.message}><Input id="state" maxLength={2} {...register("state")} /></Field>
              </div>
            </Section>

            <Section title="3. Pagamento">
              <RadioGroup defaultValue="pix" onValueChange={v => (document.getElementById("payment-hidden") as HTMLInputElement).value = v} className="space-y-2">
                {[
                  { v: "pix", t: "Pix", s: "5% de desconto à vista", badge: "MAIS USADO" },
                  { v: "credit", t: "Cartão de crédito", s: "Em até 10x sem juros", badge: "" },
                  { v: "boleto", t: "Boleto bancário", s: "Vencimento em 3 dias úteis", badge: "" },
                ].map(o => (
                  <label key={o.v} htmlFor={`pay-${o.v}`} className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${payment === o.v ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"}`}>
                    <RadioGroupItem id={`pay-${o.v}`} value={o.v} {...register("payment")} />
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{o.t}</p>
                      <p className="text-xs text-muted-foreground">{o.s}</p>
                    </div>
                    {o.badge && <span className="text-[10px] font-bold px-2 py-1 rounded bg-success text-success-foreground">{o.badge}</span>}
                  </label>
                ))}
              </RadioGroup>
              <input id="payment-hidden" type="hidden" />
            </Section>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-32 space-y-4">
            <h2 className="font-display text-lg font-semibold">Resumo do pedido</h2>
            <ul className="space-y-3 max-h-72 overflow-y-auto">
              {cart.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 text-sm">
                  <div className="relative shrink-0">
                    <img src={product.image} alt="" className="w-14 h-14 rounded-md object-cover bg-secondary" />
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-foreground text-background text-[10px] font-semibold">{qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                  <span className="font-medium text-success whitespace-nowrap">{formatBRL(product.price * qty)}</span>
                </li>
              ))}
              {cart.length === 0 && <li className="text-sm text-muted-foreground">Carrinho vazio.</li>}
            </ul>

            <div className="space-y-1.5 text-sm border-t border-border pt-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatBRL(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>{shipping === 0 ? <span className="text-success">Grátis</span> : formatBRL(shipping)}</span></div>
            </div>
            <div className="flex justify-between items-baseline border-t border-border pt-4">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-semibold text-success">{formatBRL(total)}</span>
            </div>

            <Button type="submit" disabled={isSubmitting || cart.length === 0} className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground shadow-cta font-medium">
              <Lock className="w-4 h-4" /> {isSubmitting ? "Processando…" : "Pagar com segurança"}
            </Button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-success" /> Pagamento processado pelo Mercado Pago. Seus dados são criptografados.
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["MERCADO PAGO", "PIX", "VISA", "MASTER", "AMEX"].map(b => (
                <span key={b} className="h-7 px-2 inline-flex items-center rounded border border-border bg-background text-[10px] font-semibold text-muted-foreground">{b}</span>
              ))}
            </div>
          </aside>
        </form>
      </section>
      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
