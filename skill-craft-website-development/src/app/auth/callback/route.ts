import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Recebe o `code` do OAuth (Google via Supabase), troca por sessão e redireciona. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/area-do-aluno";
  // Evita open redirect: só caminhos internos.
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/area-do-aluno";

  const providerError = searchParams.get("error_description") || searchParams.get("error");
  if (providerError) {
    return NextResponse.redirect(`${origin}/login?erro=${encodeURIComponent(providerError)}`);
  }

  if (code) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
      return NextResponse.redirect(`${origin}/login?erro=${encodeURIComponent(error.message)}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?erro=${encodeURIComponent("Não foi possível concluir o login.")}`);
}
