import { Clock, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/dunamis-data";

export function BlogSection() {
  const [hero, ...rest] = blogPosts;
  return (
    <section className="container-1440 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Dicas e recomendações</h2>
          <p className="text-sm text-muted-foreground mt-1">Conteúdo cuidadosamente curado pela nossa equipe ótica.</p>
        </div>
        <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover inline-flex items-center gap-1">Ver o blog <ArrowUpRight className="w-4 h-4" /></a>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <article className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 shadow-card hover:shadow-card-hover transition-all">
          <div className="aspect-[16/11] overflow-hidden">
            <img src={hero.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-7">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">{hero.category}</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" /> {hero.readTime}</span>
            </div>
            <h3 className="font-display text-2xl font-semibold mt-3 leading-tight group-hover:text-primary transition">{hero.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{hero.excerpt}</p>
          </div>
        </article>

        <div className="grid gap-6">
          {rest.map(p => (
            <article key={p.id} className="group grid grid-cols-[180px_1fr] sm:grid-cols-[220px_1fr] gap-5 bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-card-hover transition">
              <div className="overflow-hidden">
                <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="py-5 pr-5">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground/80 font-medium">{p.category}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" /> {p.readTime}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mt-2 leading-tight group-hover:text-primary transition">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
