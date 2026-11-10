"use client";

import { AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { GoogleButton } from "./GoogleButton";

export function LoginCard({ configured, initialError }: { configured: boolean; initialError?: string }) {
  const [error, setError] = useState<string | undefined>(initialError);

  return (
    <div className="w-full max-w-md rounded-3xl border border-deep/10 bg-white p-7 shadow-lift sm:p-10">
      <Link href="/" aria-label="Voltar para a página inicial" className="inline-block">
        <Logo markClassName="h-10 w-auto" />
      </Link>
      <h1 className="mt-8 text-2xl font-extrabold text-deep sm:text-3xl">Entre na sua conta</h1>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:text-base">
        Acesse a área do aluno com sua conta Google para acompanhar os pedidos feitos no site.
      </p>

      {!configured && (
        <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>
            <strong>Login ainda não configurado.</strong> Defina <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> e ative o provedor Google no
            Supabase (veja o README).
          </p>
        </div>
      )}

      {error && (
        <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
          <p className="break-words">{error}</p>
        </div>
      )}

      <GoogleButton className="mt-7 w-full" onError={setError} />

      <p className="mt-5 flex items-start gap-2 font-caption text-xs leading-relaxed text-charcoal/60">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-skill" aria-hidden />
        Usamos apenas nome, e-mail e foto da sua conta Google. O site continua totalmente acessível sem login.
      </p>

      <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-skill hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao site
      </Link>
    </div>
  );
}
