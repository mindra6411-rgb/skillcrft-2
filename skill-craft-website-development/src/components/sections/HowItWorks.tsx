import { Box, ClipboardList, HeartHandshake, MousePointerClick, ReceiptText } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { icon: MousePointerClick, title: "Escolha do serviço", text: "Veja os serviços disponíveis e escolha o que combina com a sua necessidade." },
  { icon: ClipboardList, title: "Envio das informações", text: "Preencha o formulário descrevendo o seu pedido e como prefere ser contatado." },
  { icon: ReceiptText, title: "Recebimento do orçamento", text: "Analisamos o pedido e retornamos com o orçamento a partir do valor de referência." },
  { icon: Box, title: "Desenvolvimento do pedido", text: "Nossa equipe desenvolve o trabalho com organização e acompanhamento." },
  { icon: HeartHandshake, title: "Entrega e pós-venda", text: "Você recebe o material pronto e conta com nosso suporte após a entrega." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative isolate overflow-hidden bg-deep py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(80%_70%_at_50%_30%,black,transparent)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-[48rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(49,85,217,0.35),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Como funciona" title="Do primeiro contato à entrega, em cinco etapas." tone="dark" align="center">
          Um processo simples e transparente, inspirado na gestão de projetos.
        </SectionHeading>

        <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {/* linha de conexão (desktop) */}
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block"
            aria-hidden
          />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Reveal delay={i * 0.09} className="h-full">
                <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.07]">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                    <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-skill to-accent text-white shadow-[0_12px_30px_-8px_rgba(107,140,255,0.7)]">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="font-heading text-4xl font-extrabold text-white/15 transition group-hover:text-accent/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-offwhite">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/65">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
