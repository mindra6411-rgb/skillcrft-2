/**
 * Informações de contato configuráveis via variáveis de ambiente (.env / painel da Vercel).
 * Nada aqui é fictício: se a variável não existir, o item simplesmente não é exibido.
 */
const clean = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : undefined);

export const siteConfig = {
  name: "skill craft",
  tagline: "Aprenda, desenvolva e prepare-se para o mercado.",
  description:
    "Agência estudantil de apoio acadêmico, tecnológico e criativo, que integra Administração, Tecnologia da Informação e Design Gráfico.",
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    whatsapp: clean(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP), // somente dígitos com DDI, ex.: 5511999999999
    instagram: clean(process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM), // URL completa do perfil
    location: clean(process.env.NEXT_PUBLIC_CONTACT_LOCATION),
  },
};

export const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];
