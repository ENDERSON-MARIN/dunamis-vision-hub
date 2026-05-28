import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`} aria-label="DUNAMIS - Home">
      <span className="relative grid place-items-center w-9 h-9 rounded-md bg-foreground text-background transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="7" cy="14" r="4" />
          <circle cx="17" cy="14" r="4" />
          <path d="M11 14h2M2 11l3-1M22 11l-3-1" />
        </svg>
      </span>
      <span className="font-display font-semibold tracking-tight text-xl">DUNAMIS</span>
    </Link>
  );
}
