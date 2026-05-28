import { useState } from "react";
import { z } from "zod";
import { Mail, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const emailSchema = z.string().trim().email().max(120);

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(emailSchema.safeParse(email).success ? "ok" : "err");
  };

  return (
    <section className="container-1440 py-14">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-foreground to-[oklch(0.28_0.04_265)] text-background p-10 md:p-14">
        <div aria-hidden className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Mail className="w-7 h-7 mb-3 opacity-90" />
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">Inspiração ótica na sua caixa de entrada.</h2>
            <p className="opacity-80 mt-3 max-w-md">Lançamentos, guias de estilo e ofertas exclusivas. Sem spam — só o essencial.</p>
          </div>
          <form onSubmit={submit} className="space-y-3" noValidate>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setState("idle"); }}
                placeholder="seu@email.com"
                aria-label="E-mail"
                aria-invalid={state === "err"}
                className="h-12 bg-background/95 text-foreground border-transparent placeholder:text-muted-foreground"
              />
              <Button type="submit" className="h-12 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-cta">
                Quero receber
              </Button>
            </div>
            {state === "err" && <p className="text-sm text-[oklch(0.85_0.13_25)]">Informe um e-mail válido.</p>}
            {state === "ok" && (
              <p className="text-sm inline-flex items-center gap-1.5 text-[oklch(0.85_0.16_149)]"><Check className="w-4 h-4" /> Inscrição confirmada. Bem-vindo(a)!</p>
            )}
            <p className="text-xs opacity-70">Ao se inscrever você concorda com nossa Política de Privacidade.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
