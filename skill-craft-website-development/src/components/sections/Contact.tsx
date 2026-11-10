import { CheckCircle2, Mail, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { email, whatsapp, location } = siteConfig.contact;
  const channels = [
    email && { icon: Mail, label: "E-mail", value: email, href: `mailto:${email}` },
    whatsapp && { icon: MessageCircle, label: "WhatsApp", value: `+${whatsapp}`, href: `https://wa.me/${whatsapp.replace(/\D/g, "")}` },
    location && { icon: MapPin, label: "Local", value: location, href: undefined },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <section id="contato" className="relative py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-skill/[0.05] to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Contato" title="Conte o que você precisa.">
              Preencha o formulário com os detalhes do seu pedido. Ele é registrado em nosso sistema e a equipe
              retorna com o orçamento.
            </SectionHeading>

            <Reveal delay={0.1} className="mt-8">
              <ul className="space-y-3 text-sm text-charcoal/80">
                {["Sem cadastro obrigatório", "Valores de referência visíveis antes do envio", "Retorno pelo meio de contato escolhido"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-skill" aria-hidden /> {t}
                  </li>
                ))}
              </ul>

              {channels.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {channels.map(({ icon: Icon, label, value, href }) => (
                    <li key={label}>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-deep/10 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-skill/30">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-skill/10 text-skill"><Icon className="h-5 w-5" aria-hidden /></span>
                          <span className="min-w-0">
                            <span className="block font-caption text-xs font-bold uppercase tracking-wider text-charcoal/55">{label}</span>
                            <span className="block truncate font-semibold text-deep group-hover:text-skill">{value}</span>
                          </span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 rounded-2xl border border-deep/10 bg-white p-4 shadow-card">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-skill/10 text-skill"><Icon className="h-5 w-5" aria-hidden /></span>
                          <span className="min-w-0">
                            <span className="block font-caption text-xs font-bold uppercase tracking-wider text-charcoal/55">{label}</span>
                            <span className="block font-semibold text-deep">{value}</span>
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-deep/10 bg-white p-5 shadow-lift sm:p-8 lg:p-10">
              <h3 className="mb-6 text-xl font-bold text-deep">Solicitar serviço</h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
