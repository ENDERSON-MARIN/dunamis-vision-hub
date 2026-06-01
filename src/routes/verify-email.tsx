import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { AuthLayout } from "@/_components/auth/AuthLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verifique seu e-mail — DUNAMIS" },
      { name: "description", content: "Confirme seu e-mail para ativar sua conta DUNAMIS e liberar seu cupom de boas-vindas." },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout
      quote="“Sua jornada DUNAMIS começa com um clique. Confirme seu e-mail e veja o mundo com mais clareza.”"
      quoteAuthor="Atendimento DUNAMIS"
    >
      <div className="text-center">
        <div className="relative mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-sky-50">
          <Mail className="h-9 w-9 text-primary" />
          <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-green-600 text-white ring-4 ring-white">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Verifique seu e-mail</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Enviamos um link de confirmação para o seu e-mail. Por favor, verifique sua caixa de entrada e spam para ativar sua conta e liberar seu{" "}
          <span className="font-semibold text-slate-900">cupom de 5% de desconto</span>.
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs text-slate-600">
          <span className="font-medium text-slate-700">Enviado para:</span>{" "}
          <span className="font-mono text-slate-900">voce@exemplo.com</span>
        </div>

        <div className="mt-6 space-y-3">
          <Button asChild className="h-11 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary-hover">
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              Abrir meu e-mail
            </a>
          </Button>

          {resent ? (
            <p className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-green-700">
              <CheckCircle2 className="h-4 w-4" /> Link reenviado com sucesso
            </p>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setResent(true);
                }, 800);
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary focus-visible:outline-none focus-visible:text-primary"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Não recebeu o e-mail? Reenviar código
            </button>
          )}
        </div>

        <Link to="/login" className="mt-6 inline-block text-sm text-slate-500 hover:text-primary">
          ← Voltar para o Login
        </Link>
      </div>
    </AuthLayout>
  );
}
