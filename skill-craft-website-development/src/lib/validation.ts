import { serviceIds } from "@/data/services";

export const contactMethods = [
  { value: "email", label: "E-mail", placeholder: "voce@exemplo.com" },
  { value: "whatsapp", label: "WhatsApp", placeholder: "(11) 99999-9999" },
  { value: "telefone", label: "Telefone", placeholder: "(11) 99999-9999" },
] as const;

export type ContactMethod = (typeof contactMethods)[number]["value"];

export type RequestInput = {
  name: string;
  service: string;
  description: string;
  contactMethod: string;
  contactValue: string;
};

export type FieldErrors = Partial<Record<keyof RequestInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: keyof RequestInput, data: RequestInput): string | undefined {
  const v = data[field].trim();
  switch (field) {
    case "name":
      if (!v) return "Informe seu nome.";
      if (v.length < 2) return "O nome precisa ter ao menos 2 caracteres.";
      if (v.length > 120) return "O nome é muito longo.";
      return;
    case "service":
      if (!v) return "Escolha o serviço desejado.";
      if (!(serviceIds as string[]).includes(v)) return "Serviço inválido.";
      return;
    case "description":
      if (!v) return "Descreva o seu pedido.";
      if (v.length < 15) return "Conte um pouco mais (mínimo de 15 caracteres).";
      if (v.length > 1500) return "A descrição pode ter no máximo 1500 caracteres.";
      return;
    case "contactMethod":
      if (!contactMethods.some((m) => m.value === v)) return "Escolha um meio de contato.";
      return;
    case "contactValue":
      if (!v) return "Informe como podemos falar com você.";
      if (data.contactMethod === "email") {
        if (!EMAIL_RE.test(v)) return "Digite um e-mail válido.";
      } else {
        const digits = v.replace(/\D/g, "");
        if (digits.length < 10 || digits.length > 13) return "Digite um número com DDD válido.";
      }
      if (v.length > 160) return "Valor muito longo.";
      return;
  }
}

export function validateRequest(data: RequestInput): FieldErrors {
  const errors: FieldErrors = {};
  (Object.keys(data) as (keyof RequestInput)[]).forEach((f) => {
    const e = validateField(f, data);
    if (e) errors[f] = e;
  });
  return errors;
}
