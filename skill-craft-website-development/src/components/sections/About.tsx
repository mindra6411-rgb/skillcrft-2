import { Code2, Layers, PenTool } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const areas = [
  {
    icon: Layers,
    title: "Administração",
    text: "Planejamento, organização e atendimento. Cuidamos do orçamento, dos prazos e do acompanhamento de cada pedido, do primeiro contato ao pós-venda.",
  },
  {
    icon: Code2,
    title: "Tecnologia da Informação",
    text: "Estrutura digital e desenvolvimento. Aplicamos tecnologia para criar sites simples, organizar conteúdos e dar suporte técnico aos projetos.",
  },
  {
    icon: PenTool,
    title: "Design Gráfico",
    text: "Identidade visual e comunicação. Transformamos conteúdo em apresentações, artes e logotipos com clareza, estética e coerência.",
  },
];

export function About() {
  return (
    <section id="sobre" className="relative py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Sobre nós" title={<>Uma agência feita por estudantes, para estudantes.</>}>
              Nossa missão é apoiar a vida acadêmica e criativa com soluções práticas, unindo três áreas do
              conhecimento para que cada aluno aprenda, desenvolva suas habilidades e se prepare para o mercado.
            </SectionHeading>

            <Reveal delay={0.15} className="mt-8 rounded-2xl border border-skill/15 bg-gradient-to-br from-white to-skill/5 p-6 shadow-card">
              <p className="font-caption text-xs font-bold uppercase tracking-[0.2em] text-skill">Missão</p>
              <p className="mt-3 font-heading text-lg font-semibold leading-snug text-deep sm:text-xl">
                “Aprenda, desenvolva e prepare-se para o mercado.”
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-4">
            {areas.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.1}>
                  <article className="group flex gap-5 rounded-2xl border border-deep/10 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-skill/30 hover:shadow-lift sm:p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-deep text-accent transition group-hover:bg-skill group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-deep">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/75 sm:text-base">{text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
