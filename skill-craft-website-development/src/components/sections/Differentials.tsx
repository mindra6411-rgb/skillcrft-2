import { Compass, Gauge, GraduationCap, Network } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  { icon: Network, title: "Três áreas, uma equipe", text: "Administração, TI e Design trabalhando juntas em cada pedido, sem peças soltas." },
  { icon: Compass, title: "Processo organizado", text: "Etapas claras, do orçamento à entrega, com acompanhamento e pós-venda." },
  { icon: Gauge, title: "Valores de referência claros", text: "Você conhece o ponto de partida de cada serviço antes de solicitar." },
  { icon: GraduationCap, title: "Foco em aprendizagem", text: "Pensado por estudantes para apoiar o aprendizado e a preparação para o mercado." },
];

function Venn() {
  const circles = [
    { cx: 150, cy: 130, label: "Administração", lx: 112, ly: 108, color: "#3155D9" },
    { cx: 250, cy: 130, label: "TI", lx: 288, ly: 108, color: "#6B8CFF" },
    { cx: 200, cy: 215, label: "Design", lx: 200, ly: 268, color: "#101B3D" },
  ];
  return (
    <svg viewBox="0 0 400 340" className="mx-auto h-auto w-full max-w-md" role="img" aria-label="Integração entre Administração, Tecnologia da Informação e Design Gráfico">
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      {circles.map((c) => (
        <circle key={c.label} cx={c.cx} cy={c.cy} r={92} fill={c.color} fillOpacity={0.22} stroke={c.color} strokeOpacity={0.7} strokeWidth={1.5} />
      ))}
      {circles.map((c) => (
        <text key={c.label + "t"} x={c.lx} y={c.ly} textAnchor="middle" fontFamily="var(--font-montserrat)" fontWeight={700} fontSize={c.label.length > 6 ? 13 : 15} fill="#101B3D">
          {c.label}
        </text>
      ))}
      <circle cx={200} cy={158} r={30} fill="#F7F8FC" stroke="#3155D9" strokeWidth={1.5} />
      <text x={200} y={155} textAnchor="middle" fontFamily="var(--font-montserrat)" fontWeight={800} fontSize={10} fill="#3155D9">skill</text>
      <text x={200} y={168} textAnchor="middle" fontFamily="var(--font-montserrat)" fontWeight={800} fontSize={10} fill="#20232C">craft</text>
    </svg>
  );
}

export function Differentials() {
  return (
    <section id="diferenciais" className="relative py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Diferenciais" title="Quando gestão, tecnologia e design se encontram.">
              A Skill Craft nasce da integração de três áreas. É essa combinação que faz cada entrega ser
              organizada, funcional e visualmente coerente.
            </SectionHeading>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {items.map(({ icon: Icon, title, text }, i) => (
                <li key={title}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <article className="h-full rounded-2xl border border-deep/10 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-skill/30 hover:shadow-lift">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-skill/10 text-skill">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 text-base font-bold text-deep">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] border border-deep/10 bg-gradient-to-br from-white to-skill/10 p-6 shadow-lift sm:p-10">
              <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />
              <div className="relative">
                <Venn />
                <p className="mt-4 text-center font-caption text-xs font-bold uppercase tracking-[0.2em] text-skill">
                  Administração · TI · Design
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
