import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ProductCard } from "@/_components/ecommerce/ProductCard";
import type { Product } from "@/lib/dunamis-data";

export function ProductCarousel({
  title,
  subtitle,
  products,
  cta = "Ver tudo",
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  cta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current; if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="container-1440 py-12">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover">
            {cta} <ArrowRight className="w-4 h-4" />
          </a>
          <button onClick={() => scroll(-1)} aria-label="Anterior" className="h-10 w-10 grid place-items-center rounded-full border border-border hover:bg-secondary transition">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Próximo" className="h-10 w-10 grid place-items-center rounded-full border border-border hover:bg-secondary transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6 pb-2"
        style={{ scrollPaddingLeft: "1.5rem" }}
      >
        {products.map(p => (
          <div key={p.id} className="snap-start shrink-0 w-[calc((100%-3.75rem)/4)] min-w-[260px] max-w-[340px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
