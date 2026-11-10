"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useId, useState, type FormEvent } from "react";
import { formatBRL, services } from "@/data/services";
import { SELECT_SERVICE_EVENT } from "@/lib/request-service";
import { contactMethods, validateField, validateRequest, type FieldErrors, type RequestInput } from "@/lib/validation";

const empty: RequestInput = { name: "", service: "", description: "", contactMethod: "email", contactValue: "" };

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; id?: number }
  | { type: "error"; message: string };

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal shadow-sm outline-none transition placeholder:text-charcoal/40 focus:ring-4 disabled:opacity-60";

export function ContactForm() {
  const uid = useId();
  const [data, setData] = useState<RequestInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RequestInput, boolean>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setData((d) => ({ ...d, service: id }));
      setErrors((er) => ({ ...er, service: undefined }));
      setStatus((s) => (s.type === "success" ? { type: "idle" } : s));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, handler);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, handler);
  }, []);

  const loading = status.type === "loading";
  const method = contactMethods.find((m) => m.value === data.contactMethod) ?? contactMethods[0];
  const selected = services.find((s) => s.id === data.service);

  function update<K extends keyof RequestInput>(field: K, value: string) {
    const next = { ...data, [field]: value };
    setData(next);
    if (touched[field] || errors[field]) setErrors((e) => ({ ...e, [field]: validateField(field, next) }));
    if (field === "contactMethod" && touched.contactValue) {
      setErrors((e) => ({ ...e, contactValue: validateField("contactValue", next) }));
    }
    if (status.type !== "idle" && status.type !== "loading") setStatus({ type: "idle" });
  }

  function blur(field: keyof RequestInput) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, data) }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    const found = validateRequest(data);
    setErrors(found);
    setTouched({ name: true, service: true, description: true, contactMethod: true, contactValue: true });
    if (Object.keys(found).length > 0) {
      setStatus({ type: "error", message: "Revise os campos destacados antes de enviar." });
      const first = (Object.keys(found) as (keyof RequestInput)[])[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus({ type: "loading" });
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: boolean; message?: string; id?: number; errors?: FieldErrors }
        | null;
      if (res.ok && json?.ok) {
        setStatus({ type: "success", id: json.id });
        setData(empty);
        setErrors({});
        setTouched({});
      } else {
        if (json?.errors) setErrors(json.errors);
        setStatus({ type: "error", message: json?.message ?? "Não foi possível enviar o pedido. Tente novamente." });
      }
    } catch {
      setStatus({ type: "error", message: "Sem conexão com o servidor. Verifique sua internet e tente novamente." });
    }
  }

  const fieldClass = (f: keyof RequestInput) =>
    `${inputBase} ${
      errors[f]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
        : touched[f] && !errors[f] && data[f]
          ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/15"
          : "border-deep/15 focus:border-skill focus:ring-skill/15"
    }`;

  const a11y = (f: keyof RequestInput) => ({
    id: `${uid}-${f}`,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined,
  });

  const Err = ({ f }: { f: keyof RequestInput }) =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {errors[f]}
      </p>
    ) : null;

  const labelClass = "mb-2 block text-sm font-semibold text-deep";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={loading}>
      <div>
        <label htmlFor={`${uid}-name`} className={labelClass}>Nome</label>
        <input
          {...a11y("name")}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          value={data.name}
          disabled={loading}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => blur("name")}
          className={fieldClass("name")}
        />
        <Err f="name" />
      </div>

      <div>
        <label htmlFor={`${uid}-service`} className={labelClass}>Serviço desejado</label>
        <select
          {...a11y("service")}
          name="service"
          value={data.service}
          disabled={loading}
          onChange={(e) => update("service", e.target.value)}
          onBlur={() => blur("service")}
          className={fieldClass("service")}
        >
          <option value="">Selecione um serviço…</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title} — {formatBRL(s.price)}
            </option>
          ))}
        </select>
        {selected && !errors.service && (
          <p className="mt-1.5 font-caption text-xs text-charcoal/60">
            Valor de referência: <strong className="text-skill">{formatBRL(selected.price)}</strong>. O orçamento final é confirmado após a análise do pedido.
          </p>
        )}
        <Err f="service" />
      </div>

      <div>
        <label htmlFor={`${uid}-description`} className={labelClass}>Descrição do pedido</label>
        <textarea
          {...a11y("description")}
          name="description"
          rows={5}
          maxLength={1500}
          placeholder="Conte o que você precisa, tema, prazo desejado e referências."
          value={data.description}
          disabled={loading}
          onChange={(e) => update("description", e.target.value)}
          onBlur={() => blur("description")}
          className={`${fieldClass("description")} resize-y`}
        />
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <div className="flex-1"><Err f="description" /></div>
          <span className="shrink-0 font-caption text-xs text-charcoal/50">{data.description.length}/1500</span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[11rem_1fr]">
        <div>
          <label htmlFor={`${uid}-contactMethod`} className={labelClass}>Meio de contato</label>
          <select
            {...a11y("contactMethod")}
            name="contactMethod"
            value={data.contactMethod}
            disabled={loading}
            onChange={(e) => update("contactMethod", e.target.value)}
            onBlur={() => blur("contactMethod")}
            className={fieldClass("contactMethod")}
          >
            {contactMethods.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <Err f="contactMethod" />
        </div>
        <div>
          <label htmlFor={`${uid}-contactValue`} className={labelClass}>
            {method.label}
          </label>
          <input
            {...a11y("contactValue")}
            type={data.contactMethod === "email" ? "email" : "tel"}
            inputMode={data.contactMethod === "email" ? "email" : "tel"}
            autoComplete={data.contactMethod === "email" ? "email" : "tel"}
            name="contactValue"
            placeholder={method.placeholder}
            value={data.contactValue}
            disabled={loading}
            onChange={(e) => update("contactValue", e.target.value)}
            onBlur={() => blur("contactValue")}
            className={fieldClass("contactValue")}
          />
          <Err f="contactValue" />
        </div>
      </div>

      {/* Honeypot anti-spam (invisível para pessoas) */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Não preencha este campo
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-skill px-7 py-4 text-sm font-bold text-white shadow-[0_18px_36px_-14px_rgba(49,85,217,0.85)] transition hover:-translate-y-0.5 hover:bg-[#2745bd] active:translate-y-0 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando pedido…
          </>
        ) : (
          <>
            Enviar pedido <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </>
        )}
      </button>

      <div aria-live="polite" className="min-h-0">
        <AnimatePresence mode="wait">
          {status.type === "success" && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="flex gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
              <p className="text-sm leading-relaxed">
                <strong>Pedido registrado{status.id ? ` (nº ${status.id})` : ""}!</strong> Nossa equipe vai analisar e
                retornar com o orçamento pelo meio de contato informado.
              </p>
            </motion.div>
          )}
          {status.type === "error" && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="flex gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
              <p className="text-sm leading-relaxed">{status.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
