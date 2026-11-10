export type ServiceId =
  | "apresentacoes"
  | "sites"
  | "revisao"
  | "resumos"
  | "artes-logotipos";

export type Service = {
  id: ServiceId;
  title: string;
  price: number;
  area: "Design Gráfico" | "Tecnologia da Informação" | "Administração";
  description: string;
};

/** Serviços e valores oficiais da Skill Craft. Não alterar sem aprovação da equipe. */
export const services: Service[] = [
  {
    id: "apresentacoes",
    title: "Criação de apresentações",
    price: 15,
    area: "Design Gráfico",
    description:
      "Slides organizados, com hierarquia visual clara e identidade consistente para apresentar seu trabalho com segurança.",
  },
  {
    id: "sites",
    title: "Criação de sites simples",
    price: 30,
    area: "Tecnologia da Informação",
    description:
      "Páginas web simples, responsivas e bem estruturadas para projetos escolares, portfólios e pequenas ideias.",
  },
  {
    id: "revisao",
    title: "Revisão de trabalhos",
    price: 10,
    area: "Administração",
    description:
      "Revisão de texto, estrutura e formatação para deixar o seu trabalho acadêmico claro, correto e padronizado.",
  },
  {
    id: "resumos",
    title: "Resumos técnicos",
    price: 10,
    area: "Administração",
    description:
      "Síntese objetiva de conteúdos técnicos, destacando os pontos principais de forma organizada e fácil de estudar.",
  },
  {
    id: "artes-logotipos",
    title: "Criação de artes e logotipos",
    price: 15,
    area: "Design Gráfico",
    description:
      "Artes e logotipos com conceito visual, cores e tipografia pensados para dar identidade ao seu projeto.",
  },
];

export const serviceMap = Object.fromEntries(services.map((s) => [s.id, s])) as Record<
  ServiceId,
  Service
>;

export const serviceIds = services.map((s) => s.id) as ServiceId[];

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
