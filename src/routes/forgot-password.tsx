import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, MailCheck } from "lucide-react";
import { AuthLayout } from "@/_components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — DUNAMIS" },
      { name: "description", content: "Receba um link seguro para redefinir a senha da sua conta DUNAMIS." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout
      quote="“Segurança e simplicidade andam juntas. Redefina sua senha em menos de um minuto.”"
      quoteAuthor="Time de Segurança DUNAMIS"
    >
      {sent ? (
        <div className="text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-green-50 text-green-600">
            <MailCheck className="h-8 w-8" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">Link enviado!</h1>
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <p className="inline-flex items-start gap-2 text-left">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Verifique seu e-mail <span className="font-semibold">{email || "voce@exemplo.com"}</span> para cadastrar uma nova senha. O link expira em 30 minutos.
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-5 text-sm font-medium text-primary hover:text-primary-hover"
          >
            Usar outro e-mail
          </button>

          <Link to="/login" className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para o Login
          </Link>
        </div>
      ) : (
        <>
          <header className="mb-7 space-y-2">
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Recuperar Senha</h1>
            <p className="text-sm text-slate-500">
              Digite o e-mail associado à sua conta e enviaremos as instruções para redefinir sua senha.
            </p>
          </header>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setSent(true);
              }, 900);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-700">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                className="h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-primary"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar Link de Recuperação"}
            </Button>
          </form>

          <Link to="/login" className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para o Login
          </Link>
        </>
      )}
    </AuthLayout>
  );
}
