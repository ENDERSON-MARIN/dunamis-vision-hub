import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";
import { AuthLayout } from "@/_components/auth/AuthLayout";
import { GoogleIcon } from "@/_components/auth/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Criar conta — DUNAMIS" },
      { name: "description", content: "Crie sua conta DUNAMIS para garantir descontos exclusivos e favoritos salvos." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const rules = useMemo(
    () => [
      { label: "Mínimo de 8 caracteres", ok: pwd.length >= 8 },
      { label: "Uma letra maiúscula", ok: /[A-Z]/.test(pwd) },
      { label: "Um número", ok: /\d/.test(pwd) },
      { label: "Um caractere especial", ok: /[^A-Za-z0-9]/.test(pwd) },
    ],
    [pwd],
  );
  const score = rules.filter((r) => r.ok).length;

  return (
    <AuthLayout
      quote="“Cada par DUNAMIS é selecionado para durar — design, lentes e atendimento de quem entende.”"
      quoteAuthor="Curadoria DUNAMIS"
    >
      <header className="mb-7 space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Criar sua Conta DUNAMIS</h1>
        <p className="text-sm text-slate-500">Participe para garantir descontos exclusivos e salvar seus modelos favoritos.</p>
      </header>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full border-slate-200 bg-slate-50 font-medium text-slate-900 hover:bg-slate-100"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Cadastrar com o Google</span>
      </Button>

      <div className="my-6 flex items-center gap-3" role="separator">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs uppercase tracking-wider text-slate-400">ou com seu e-mail</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => setLoading(false), 900);
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-slate-700">Nome Completo</Label>
          <Input id="name" autoComplete="name" placeholder="Seu nome completo" className="h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-primary" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-slate-700">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" className="h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-primary" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-slate-700">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              autoComplete="new-password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Crie uma senha forte"
              className="h-11 border-slate-200 pr-11 focus-visible:ring-2 focus-visible:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-400 hover:text-slate-700"
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Strength meter */}
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < score
                    ? score <= 1
                      ? "bg-red-400"
                      : score === 2
                        ? "bg-amber-400"
                        : score === 3
                          ? "bg-sky-500"
                          : "bg-green-600"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
            {rules.map((r) => (
              <li key={r.label} className={`flex items-center gap-1.5 ${r.ok ? "text-green-700" : "text-slate-500"}`}>
                {r.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5 text-slate-300" />}
                <span>{r.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-sm text-slate-600">
          <Checkbox id="terms" required className="mt-0.5 border-slate-300" />
          <span>
            Li e concordo com os{" "}
            <a href="#" className="font-medium text-primary hover:underline">Termos de Uso</a> e a{" "}
            <a href="#" className="font-medium text-primary hover:underline">Política de Privacidade</a>.
          </span>
        </label>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar Minha Conta Segura"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Já possui uma conta?{" "}
        <Link to="/login" className="font-semibold text-primary hover:text-primary-hover">
          Fazer login
        </Link>
      </p>
    </AuthLayout>
  );
}
