import { Star, BadgeCheck, ShieldCheck, RefreshCw, Headset, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
  name: string;
  role: string;
  avatarUrl: string;
  text: string;
  rating: number;
  serviceLabel: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Mariana Lopes",
    role: "Arquiteta · São Paulo",
    avatarUrl: "https://i.pravatar.cc/120?img=47",
    text: "A armação encaixou perfeitamente no meu rosto, sem apertar nas têmporas. As lentes antirreflexo ficaram impecáveis e o acabamento parece de outro nível — vale cada centavo.",
    rating: 5,
    serviceLabel: "Óculos de Grau Aviador Classic",
  },
  {
    name: "Rafael Andrade",
    role: "Empresário · Belo Horizonte",
    avatarUrl: "https://i.pravatar.cc/120?img=12",
    text: "Comprei o kit limpeza junto com meus solares novos. As flanelas são premium e a solução não risca a lente polarizada. Atendimento rápido e entrega em 3 dias úteis.",
    rating: 5,
    serviceLabel: "Kit Limpeza para Óculos",
  },
  {
    name: "Camila Ferreira",
    role: "Médica · Curitiba",
    avatarUrl: "https://i.pravatar.cc/120?img=32",
    text: "Trabalho horas em frente à tela e as lentes blue light reduziram muito o cansaço visual. A armação é leve, confortável e o caixete chegou caprichadíssimo.",
    rating: 5,
    serviceLabel: "Óculos de Grau Square Blue Light",
  },
  {
    name: "Lucas Pereira",
    role: "Designer · Florianópolis",
    avatarUrl: "https://i.pravatar.cc/120?img=15",
    text: "Pedi armação titânio e veio com ajuste perfeito. Em duas semanas já tinha esquecido que estava usando óculos novos — leveza absurda e visual minimalista.",
    rating: 5,
    serviceLabel: "Armação Titanium Round",
  },
  {
    name: "Beatriz Souza",
    role: "Publicitária · Rio de Janeiro",
    avatarUrl: "https://i.pravatar.cc/120?img=49",
    text: "As lentes de contato chegaram bem embaladas e a consultoria por WhatsApp foi um diferencial. Recomendo para quem nunca usou — o suporte tira todo o medo.",
    rating: 5,
    serviceLabel: "Lentes de Contato Mensais",
  },
  {
    name: "Diego Martins",
    role: "Engenheiro · Porto Alegre",
    avatarUrl: "https://i.pravatar.cc/120?img=68",
    text: "Solar polarizado impecável para dirigir. Reduziu o brilho do asfalto e o ajuste de nariz foi sob medida na loja. Vale demais o preço cobrado.",
    rating: 5,
    serviceLabel: "Solar Polarizado Wayfarer",
  },
];

const trustPillars = [
  { icon: ShieldCheck, label: "Garantia de Adaptação de Lentes (Até 30 dias)" },
  { icon: RefreshCw, label: "Troca e Devolução Grátis e Descomplicada" },
  { icon: Headset, label: "Suporte Especializado por Especialistas Oculares" },
];

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Avaliação ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-success text-success" : "fill-muted text-muted"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-16 md:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-sky-600">
              Prova social
            </span>
            <h2
              id="testimonials-heading"
              className="mt-3 font-[Outfit] text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 md:text-5xl"
            >
              Quem usa, aprova a<br className="hidden md:block" /> experiência DUNAMIS
            </h2>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <BadgeCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-[Outfit] text-2xl font-semibold text-slate-900">4.9/5</span>
                <Stars rating={5} size={14} />
              </div>
              <p className="text-xs text-slate-500">
                Baseado em <span className="font-semibold text-slate-700">1.450+</span> happy eyes
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_20px_48px_-20px_rgba(15,23,42,0.18)] md:p-7"
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <Stars rating={t.rating} size={18} />
                <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1">
                  <BadgeCheck className="h-3.5 w-3.5 text-green-600" strokeWidth={2.5} />
                  <span className="text-[11px] font-medium uppercase tracking-wide text-green-700">
                    Comprador Verificado
                  </span>
                </div>
              </div>

              {/* Quote text */}
              <div className="relative mt-5 flex-1">
                <Quote
                  className="absolute -left-1 -top-1 h-7 w-7 text-slate-100"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="relative pl-6 font-[Inter] text-[15px] leading-[1.7] text-slate-700">
                  {t.text}
                </p>
              </div>

              {/* Product tag */}
              <div className="mt-6">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                  {t.serviceLabel}
                </span>
              </div>

              {/* Footer profile */}
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <Avatar className="h-11 w-11 ring-2 ring-slate-100">
                  <AvatarImage src={t.avatarUrl} alt={t.name} />
                  <AvatarFallback className="bg-sky-50 text-sky-700">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-[Outfit] text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust ribbon */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
            {trustPillars.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-3 md:justify-center md:px-2 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-slate-100"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <p.icon className="h-4.5 w-4.5 text-green-600" strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-slate-700">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
