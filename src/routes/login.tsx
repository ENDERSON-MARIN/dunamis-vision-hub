import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/_components/auth/AuthLayout";
import { GoogleIcon } from "@/_components/auth/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — DUNAMIS" },
      { name: "description", content: "Acesse sua conta DUNAMIS para gerenciar pedidos, favoritos e endereços." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout>
      <header className="mb-7 space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Bem-vindo de volta</h1>
        <p className="text-sm text-slate-500">Acesse sua conta para gerenciar seus pedidos e favoritos.</p>
      </header>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full border-slate-200 bg-slate-50 font-medium text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-primary"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Entrar com o Google</span>
      </Button>

      <div className="my-6 flex items-center gap-3" role="separator">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs uppercase tracking-wider text-slate-400">ou entre com seu e-mail</span>
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
          <Label htmlFor="email" className="text-slate-700">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            className="h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-primary"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-slate-700">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="h-11 border-slate-200 pr-11 focus-visible:ring-2 focus-visible:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:text-primary"
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <Checkbox id="remember" className="border-slate-300" />
            <span>Lembrar de mim</span>
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-hover">
            Esqueceu sua senha?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-primary text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar na Minha Conta"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Não tem uma conta?{" "}
        <Link to="/register" className="font-semibold text-primary hover:text-primary-hover">
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  );
}
