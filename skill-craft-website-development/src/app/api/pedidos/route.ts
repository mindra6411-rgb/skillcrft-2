import { validateRequest, type RequestInput } from "@/lib/validation";
import { getCurrentUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Salva o pedido no PostgreSQL. Não há envio de e-mail/WhatsApp: o pedido fica registrado no banco. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Requisição inválida." }, { status: 400 });
  }

  // Honeypot anti-spam: robôs preenchem, pessoas não.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const data: RequestInput = {
    name: String(body.name ?? ""),
    service: String(body.service ?? ""),
    description: String(body.description ?? ""),
    contactMethod: String(body.contactMethod ?? ""),
    contactValue: String(body.contactValue ?? ""),
  };

  const errors = validateRequest(data);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, message: "Corrija os campos destacados.", errors }, { status: 422 });
  }

  try {
    const [{ db }, { serviceRequests }] = await Promise.all([import("@/db"), import("@/db/schema")]);
    const user = await getCurrentUser().catch(() => null);

    const [row] = await db
      .insert(serviceRequests)
      .values({
        name: data.name.trim(),
        service: data.service.trim(),
        description: data.description.trim(),
        contactMethod: data.contactMethod.trim(),
        contactValue: data.contactValue.trim(),
        userId: user?.id ?? null,
        userEmail: user?.email ?? null,
      })
      .returning({ id: serviceRequests.id });

    return Response.json({ ok: true, id: row.id });
  } catch (err) {
    console.error("[pedidos] falha ao salvar", err);
    return Response.json(
      { ok: false, message: "Não foi possível registrar o pedido agora. Tente novamente em instantes." },
      { status: 500 },
    );
  }
}
