import { useEffect, useState } from "react";
import { z } from "zod";
import { Sparkles, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo").max(80),
  email: z.string().trim().email("E-mail inválido").max(120),
  phone: z.string().trim().min(10, "Telefone inválido").max(20).regex(/^[\d\s()+-]+$/, "Apenas números e símbolos"),
});

export function FirstVisitModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      if (!localStorage.getItem("dunamis_modal_seen")) {
        const t = setTimeout(() => setOpen(true), 1800);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const close = () => { try { localStorage.setItem("dunamis_modal_seen", "1"); } catch {}; setOpen(false); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const fe: Record<string, string> = {};
      r.error.issues.forEach(i => { fe[String(i.path[0])] = i.message; });
      setErrors(fe); return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(close, 2200);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
        <div className="relative bg-gradient-to-br from-primary to-[oklch(0.45_0.18_265)] text-primary-foreground px-7 py-8">
          <button onClick={close} aria-label="Fechar" className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full hover:bg-background/15 transition">
            <X className="w-4 h-4" />
          </button>
          <Sparkles className="w-7 h-7 mb-3" />
          <h2 className="font-display text-2xl font-semibold leading-tight">Ganhe 5% na sua primeira compra</h2>
          <p className="text-sm opacity-90 mt-2">Cadastre-se e receba seu cupom exclusivo + novidades em primeira mão.</p>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 grid place-items-center rounded-full bg-success/15 text-success mb-3">✓</div>
            <h3 className="font-display text-lg font-semibold">Cupom enviado!</h3>
            <p className="text-sm text-muted-foreground mt-1">Confira seu e-mail para resgatar os 5% de desconto.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-7 space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="fv-name">Nome completo</Label>
              <Input id="fv-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Maria da Silva" aria-invalid={!!errors.name} />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fv-email">E-mail</Label>
              <Input id="fv-email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="voce@email.com" aria-invalid={!!errors.email} />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fv-phone">Telefone</Label>
              <Input id="fv-phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(11) 99999-9999" aria-invalid={!!errors.phone} />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground shadow-cta font-medium">
              Get My 5% Off
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">Ao continuar você concorda em receber comunicações da DUNAMIS.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
