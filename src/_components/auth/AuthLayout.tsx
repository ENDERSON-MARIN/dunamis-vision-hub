import { ShieldCheck } from "lucide-react";
import authHero from "@/assets/auth-hero.jpg";
import { Logo } from "@/_components/common/Logo";



interface AuthLayoutProps {
  children: React.ReactNode;
  eyebrow?: string;
  quote?: string;
  quoteAuthor?: string;
}

export function AuthLayout({
  children,
  eyebrow = "DUNAMIS Eyewear",
  quote = "“Veja o mundo com intenção. Armações que traduzem personalidade em cada detalhe.”",
  quoteAuthor = "Lookbook DUNAMIS — Coleção Atelier",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Left — brand gallery */}
      <aside className="relative hidden overflow-hidden lg:block">
        <img
          src={authHero}
          alt="Modelo usando armação DUNAMIS premium"
          width={1024}
          height={1536}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/20 to-slate-900/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <Logo />
          </Link>
          <div className="max-w-md space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> {eyebrow}
            </span>
            <p className="font-display text-2xl leading-snug">{quote}</p>
            <p className="text-sm text-white/70">{quoteAuthor}</p>
          </div>
        </div>
      </aside>

      {/* Right — form */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link to="/" aria-label="DUNAMIS — Home">
              <Logo />
            </Link>
          </div>
          <div className="rounded-[var(--radius)] border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.18)] sm:p-9">
            {children}
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="underline-offset-2 hover:underline">Termos</a> e{" "}
            <a href="#" className="underline-offset-2 hover:underline">Política de Privacidade</a>.
          </p>
        </div>
      </section>
    </div>
  );
}

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.3 0-6-2.74-6-6.1s2.7-6.1 6-6.1c1.88 0 3.14.8 3.86 1.48l2.64-2.55C16.83 3.36 14.66 2.4 12 2.4 6.92 2.4 2.8 6.52 2.8 11.6S6.92 20.8 12 20.8c6.92 0 9.5-4.86 9.5-9.36 0-.62-.06-1.1-.16-1.6H12z" />
      <path fill="#34A853" d="M3.88 7.5l3.2 2.35C7.92 7.96 9.78 6.5 12 6.5c1.88 0 3.14.8 3.86 1.48l2.64-2.55C16.83 3.36 14.66 2.4 12 2.4 8.36 2.4 5.2 4.46 3.88 7.5z" opacity="0" />
      <path fill="#4A90E2" d="" />
    </svg>
  );
}
