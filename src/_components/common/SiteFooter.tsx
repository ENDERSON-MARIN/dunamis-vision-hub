import { Logo } from "@/_components/common/Logo";
import { Instagram, Facebook, Youtube, ShieldCheck, Truck, RotateCcw, Lock } from "lucide-react";

const cols = [
  { title: "Sobre Nós", links: ["A DUNAMIS", "Nosso ateliê", "Sustentabilidade", "Trabalhe conosco", "Imprensa"] },
  { title: "Política de Privacidade", links: ["Privacidade", "Termos de uso", "Cookies", "LGPD", "Segurança"] },
  { title: "Sua Conta", links: ["Entrar", "Criar conta", "Meus pedidos", "Endereços", "Favoritos"] },
  { title: "Atendimento", links: ["Central de ajuda", "Trocas e devoluções", "Frete e prazos", "Receituário", "Fale conosco"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border/60 mt-8">
      <div className="container-1440 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-border/60">
          {cols.map(c => (
            <div key={c.title}>
              <h3 className="font-display text-sm font-semibold mb-4">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.links.map(l => (
                  <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-4 py-8 border-b border-border/60">
          {[
            { icon: Truck, t: "Frete grátis", s: "Acima de R$ 299" },
            { icon: RotateCcw, t: "30 dias de troca", s: "Direto da sua casa" },
            { icon: ShieldCheck, t: "Garantia oficial", s: "12 meses em armações" },
            { icon: Lock, t: "Compra segura", s: "Site protegido SSL" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t}</p>
                <p className="text-xs text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">Formas de Pagamento</p>
            <div className="flex flex-wrap items-center gap-2">
              {["VISA", "MASTER", "ELO", "AMEX", "HIPER", "MERCADO PAGO", "PIX", "BOLETO"].map(b => (
                <span key={b} className="h-9 px-3 inline-flex items-center rounded-md border border-border bg-background text-[11px] font-semibold tracking-wide text-foreground/80">
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">Selos de Segurança</p>
            <div className="flex items-center gap-2">
              {["SSL 256", "Site Blindado", "Reclame Aqui"].map(b => (
                <span key={b} className="h-9 px-3 inline-flex items-center rounded-md bg-success/10 text-success text-[11px] font-semibold">{b}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} DUNAMIS. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-2">
            {[Instagram, Facebook, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="Rede social" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-secondary transition">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
