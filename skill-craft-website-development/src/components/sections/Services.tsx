"use client";

import { ArrowRight, FileCheck2, FileText, Globe, Presentation, Shapes, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatBRL, services, type ServiceId } from "@/data/services";
import { requestService } from "@/lib/request-service";

const icons: Record<ServiceId, LucideIcon> = {
  apresentacoes: Presentation,
  sites: Globe,
  revisao: FileCheck2,
  resumos: FileText,
  "artes-logotipos": Shapes,
};

export function Services() {
  return (
    <section id="servicos" className="relative bg-gradient-to-b from-transparent via-skill/[0.04] to-transparent py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Serviços" title="Soluções objetivas para o seu projeto.">
          Cada serviço tem um valor de referência. O orçamento final é confirmado após o envio das informações do
          seu pedido.
        </SectionHeading>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => {
            const Icon = icons[s.id];
            // 3 cards na primeira linha, 2 (mais largos) na segunda
            const span = i < 3 ? "lg:col-span-2" : i === 4 ? "sm:max-lg:col-span-2 lg:col-span-3" : "lg:col-span-3";
            return (
              <li key={s.id} className={span}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-deep/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-skill/30 hover:shadow-lift sm:p-7">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-accent/25 to-transparent opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-skill to-accent p-3.5 text-white shadow-[0_12px_24px_-10px_rgba(49,85,217,0.8)]">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="rounded-full bg-deep/5 px-3 py-1 font-caption text-[0.68rem] font-bold uppercase tracking-wider text-deep/70">
                        {s.area}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-deep">{s.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/75 sm:text-base">{s.description}</p>

                    <div className="mt-6 flex items-end justify-between gap-4 border-t border-deep/10 pt-5">
                      <div>
                        <p className="font-caption text-[0.68rem] font-bold uppercase tracking-wider text-charcoal/55">
                          Valor de referência
                        </p>
                        <p className="font-heading text-2xl font-extrabold text-skill">{formatBRL(s.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => requestService(s.id)}
                        aria-label={`Solicitar ${s.title}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-deep px-4 py-3 text-sm font-bold text-white transition hover:bg-skill active:scale-[0.97]"
                      >
                        Solicitar
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </button>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
