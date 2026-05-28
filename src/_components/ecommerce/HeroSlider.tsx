import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/dunamis-data";
import { Button } from "@/components/ui/button";

export function HeroSlider() {
  const [i, setI] = useState(0);
  const n = heroSlides.length;

  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);

  const go = (d: number) => setI(p => (p + d + n) % n);

  return (
    <section className="container-1440 pt-6" aria-label="Destaques">
      <div className="relative rounded-2xl overflow-hidden bg-card shadow-card aspect-[16/7] min-h-[380px]">
        {heroSlides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-hidden={idx !== i}
          >
            <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading={idx === 0 ? "eager" : "lazy"} />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
            <div className="relative h-full flex items-center">
              <div className="px-10 md:px-16 max-w-2xl text-background">
                <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase opacity-90 mb-4">{s.eyebrow}</span>
                <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">{s.title}</h1>
                <p className="text-base md:text-lg opacity-90 mb-7 max-w-md">{s.subtitle}</p>
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-cta h-12 px-6 text-base">
                  {s.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={() => go(-1)} aria-label="Slide anterior" className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 grid place-items-center rounded-full bg-card/85 hover:bg-card text-foreground transition shadow-card">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(1)} aria-label="Próximo slide" className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 grid place-items-center rounded-full bg-card/85 hover:bg-card text-foreground transition shadow-card">
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-background" : "w-2 bg-background/50 hover:bg-background/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
