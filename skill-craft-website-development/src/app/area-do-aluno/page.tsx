import { desc, eq } from "drizzle-orm";
import { ArrowLeft, CalendarClock, Inbox, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Logo } from "@/components/brand/Logo";
import { formatBRL, serviceMap, type ServiceId } from "@/data/services";
import type { ServiceRequest } from "@/db/schema";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Área do aluno | Skill Craft" };
export const dynamic = "force-dynamic";

async function loadRequests(userId: string): Promise<{ rows: ServiceRequest[]; failed: boolean }> {
  try {
    const [{ db }, { serviceRequests }] = await Promise.all([import("@/db"), import("@/db/schema")]);
    const rows = await db
      .select()
      .from(serviceRequests)
      .where(eq(serviceRequests.userId, userId))
      .orderBy(desc(serviceRequests.createdAt))
      .limit(20);
    return { rows, failed: false };
  } catch {
    return { rows: [], failed: true };
  }
}

export default async function StudentAreaPage() {
  if (!isSupabaseConfigured) redirect("/login");
  const user = await getCurrentUser().catch(() => null);
  if (!user) redirect("/login");

  const meta = (user.user_metadata ?? {}) as { full_name?: string; name?: string; avatar_url?: string; picture?: string };
  const name = meta.full_name || meta.name || user.email?.split("@")[0] || "Aluno";
  const avatar = meta.avatar_url || meta.picture;
  const { rows, failed } = await loadRequests(user.id);

  return (
    <div className="min-h-screen">
      <header className="border-b border-deep/10 bg-offwhite/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="Skill Craft — página inicial"><Logo markClassName="h-8 w-auto" textClassName="text-lg" /></Link>
          <SignOutButton className="border border-deep/15 bg-white px-4 py-2.5 text-charcoal hover:bg-deep/5" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-skill hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao site
        </Link>

        <section className="mt-6 flex flex-col gap-5 rounded-3xl border border-deep/10 bg-gradient-to-br from-deep to-[#1b2b66] p-6 text-offwhite shadow-lift sm:flex-row sm:items-center sm:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" className="h-16 w-16 rounded-2xl border-2 border-white/20 object-cover" /> : (
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-skill font-heading text-2xl font-extrabold">{name.charAt(0).toUpperCase()}</span>
          )}
          <div className="min-w-0">
            <p className="font-caption text-xs font-bold uppercase tracking-[0.2em] text-accent">Área do aluno</p>
            <h1 className="mt-1 break-words text-2xl font-extrabold sm:text-3xl">Olá, {name}!</h1>
            {user.email && (
              <p className="mt-1 flex items-center gap-2 break-all text-sm text-offwhite/70"><Mail className="h-4 w-4 shrink-0" aria-hidden /> {user.email}</p>
            )}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="meus-pedidos">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="meus-pedidos" className="text-xl font-bold text-deep">Meus pedidos</h2>
            <Link href="/#contato" className="rounded-xl bg-skill px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2745bd] active:scale-[0.98]">Novo pedido</Link>
          </div>

          {failed ? (
            <p role="alert" className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              Não foi possível carregar seus pedidos agora. Tente novamente mais tarde.
            </p>
          ) : rows.length === 0 ? (
            <div className="mt-5 grid place-items-center rounded-2xl border border-dashed border-deep/20 bg-white/60 px-6 py-14 text-center">
              <Inbox className="h-9 w-9 text-skill/60" aria-hidden />
              <p className="mt-3 font-semibold text-deep">Você ainda não fez nenhum pedido logado.</p>
              <p className="mt-1 max-w-sm text-sm text-charcoal/65">Pedidos enviados enquanto você está conectado aparecem aqui.</p>
            </div>
          ) : (
            <ul className="mt-5 grid gap-4">
              {rows.map((r) => {
                const svc = serviceMap[r.service as ServiceId];
                return (
                  <li key={r.id} className="rounded-2xl border border-deep/10 bg-white p-5 shadow-card">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-caption text-xs font-bold uppercase tracking-wider text-charcoal/55">Pedido nº {r.id}</p>
                        <h3 className="mt-1 text-lg font-bold text-deep">{svc?.title ?? r.service}</h3>
                      </div>
                      <span className="rounded-full bg-skill/10 px-3 py-1 font-caption text-xs font-bold capitalize text-skill">{r.status}</span>
                    </div>
                    <p className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-charcoal/75">{r.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-caption text-xs text-charcoal/60">
                      <span className="inline-flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5" aria-hidden />{new Date(r.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span>
                      {svc && <span>Valor de referência: <strong className="text-skill">{formatBRL(svc.price)}</strong></span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
