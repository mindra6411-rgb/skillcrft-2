import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginCard } from "@/components/auth/LoginCard";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Entrar | Skill Craft" };
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect("/area-do-aluno");

  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <div className="absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(107,140,255,0.35),transparent_65%)] blur-2xl" />
      <LoginCard configured={isSupabaseConfigured} initialError={erro} />
    </main>
  );
}
