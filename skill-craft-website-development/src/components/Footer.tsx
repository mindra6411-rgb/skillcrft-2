import { Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { navLinks, siteConfig } from "@/config/site";

export function Footer() {
  const { email, whatsapp, instagram, location } = siteConfig.contact;
  const hasContact = Boolean(email || whatsapp || instagram || location);
  const item = "flex items-start gap-3 text-sm text-offwhite/70 transition hover:text-white";

  return (
    <footer className="relative isolate overflow-hidden bg-deep text-offwhite">
      <div className="absolute inset-0 -z-10 bg-grid-dark opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="inverse" markClassName="h-12 w-auto" textClassName="text-2xl" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-offwhite/70">{siteConfig.description}</p>
            <p className="mt-4 font-heading text-sm font-semibold text-accent">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Rodapé">
            <h3 className="font-caption text-xs font-bold uppercase tracking-[0.2em] text-accent">Navegação</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-offwhite/70 transition hover:text-white">{l.label}</a>
                </li>
              ))}
              <li>
                <Link href="/login" className="text-sm text-offwhite/70 transition hover:text-white">Entrar / Área do aluno</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="font-caption text-xs font-bold uppercase tracking-[0.2em] text-accent">Contato</h3>
            {hasContact ? (
              <ul className="mt-5 space-y-3">
                {email && (
                  <li><a href={`mailto:${email}`} className={item}><Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> <span className="break-all">{email}</span></a></li>
                )}
                {whatsapp && (
                  <li><a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={item}><MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> +{whatsapp}</a></li>
                )}
                {instagram && (
                  <li><a href={instagram} target="_blank" rel="noopener noreferrer" className={item}><span className="mt-0.5 h-4 w-4 shrink-0 text-center text-xs font-bold">@</span> Instagram</a></li>
                )}
                {location && (
                  <li className={item}><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {location}</li>
                )}
              </ul>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-offwhite/70">
                Os canais de atendimento serão divulgados em breve. Enquanto isso, use o{" "}
                <a href="#contato" className="font-semibold text-accent underline underline-offset-4 hover:text-white">formulário de contato</a>.
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 font-caption text-xs text-offwhite/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Skill Craft. Projeto Integrador 2026.</p>
          <p>Administração · Tecnologia da Informação · Design Gráfico</p>
        </div>
      </div>
    </footer>
  );
}
