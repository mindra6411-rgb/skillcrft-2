"use client";

import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition active:scale-[0.98] disabled:opacity-70 ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <LogOut className="h-4 w-4" aria-hidden />}
      {compact ? <span className="sr-only sm:not-sr-only">Sair</span> : "Sair"}
    </button>
  );
}
