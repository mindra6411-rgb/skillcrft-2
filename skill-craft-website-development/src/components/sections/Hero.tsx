"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Layers, PenTool, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";

const ease = [0.22, 1, 0.36, 1] as const;

const areas = [
  { icon: Layers, label: "Administração", pos: "left-0 top-[14%] sm:-left-4" },
  { icon: Code2, label: "Tecnologia da Informação", pos: "right-0 top-[44%] sm:-right-4" },
  { icon: PenTool, label: "Design Gráfico", pos: "bottom-[8%] left-[4%]" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      {/* fundo */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(70%_60%_at_65%_35%,black,transparent)]" />
      <div className="absolute -right-40 -top-40 -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(107,140,255,0.35),transparent_65%)] blur-2xl" />
      <div className="absolute -left-40 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(49,85,217,0.14),transparent_65%)] blur-2xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-skill/20 bg-white/70 px-4 py-2 font-caption text-[0.7rem] font-bold uppercase tracking-[0.16em] text-skill shadow-sm backdrop-blur sm:text-xs"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">Agência estudantil · Projeto Integrador 2026</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 text-[2.35rem] font-extrabold leading-[1.05] text-deep sm:text-5xl lg:text-[3.6rem]"
          >
            Aprenda, desenvolva e{" "}
            <span className="bg-gradient-to-r from-skill to-accent bg-clip-text text-transparent">
              prepare-se para o mercado.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg"
          >
            A <strong className="font-semibold text-deep">Skill Craft</strong> é uma agência estudantil de apoio
            acadêmico, tecnológico e criativo. Unimos Administração, Tecnologia da Informação e Design Gráfico
            para transformar ideias em trabalhos bem feitos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#contato"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-skill px-7 py-4 text-sm font-bold text-white shadow-[0_18px_36px_-14px_rgba(49,85,217,0.85)] transition hover:-translate-y-0.5 hover:bg-[#2745bd] active:translate-y-0 active:scale-[0.98]"
            >
              Solicitar serviço
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center rounded-xl border border-deep/20 bg-white/70 px-7 py-4 text-sm font-bold text-deep backdrop-blur transition hover:-translate-y-0.5 hover:border-skill/50 hover:text-skill active:translate-y-0 active:scale-[0.98]"
            >
              Conhecer serviços
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-deep/10 pt-6"
          >
            {[
              ["3", "áreas integradas"],
              ["5", "serviços"],
              ["5", "etapas claras"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-heading text-3xl font-extrabold text-deep">{n}</dt>
                <dd className="mt-1 font-caption text-xs uppercase tracking-wider text-charcoal/60">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* composição geométrica */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[30rem]"
          aria-hidden={false}
        >
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <path d="M200 20 L356 110 L356 290 L200 380 L44 290 L44 110 Z" stroke="#3155D9" strokeOpacity="0.25" strokeWidth="1.5" />
            <path d="M200 60 L322 130 L322 270 L200 340 L78 270 L78 130 Z" stroke="#6B8CFF" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 6" />
            <path d="M200 20 L200 380 M44 110 L356 290 M44 290 L356 110" stroke="#3155D9" strokeOpacity="0.1" />
          </svg>

          <div className="absolute inset-[16%] grid place-items-center rounded-[2rem] border border-white bg-gradient-to-br from-white to-skill/10 shadow-lift backdrop-blur">
            <LogoMark className="animate-float h-[68%] w-auto drop-shadow-[0_18px_24px_rgba(16,27,61,0.18)]" title="Símbolo Skill Craft" />
          </div>

          {areas.map(({ icon: Icon, label, pos }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + i * 0.15, ease }}
              className={`absolute ${pos} flex max-w-[11rem] items-center gap-2 rounded-2xl border border-deep/10 bg-white/90 px-3 py-2.5 shadow-card backdrop-blur sm:max-w-none sm:gap-3 sm:px-4 sm:py-3`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-skill/10 text-skill sm:h-9 sm:w-9">
                <Icon className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem]" aria-hidden />
              </span>
              <span className="text-xs font-semibold leading-tight text-deep sm:text-sm">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
