"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogIn, Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { navLinks } from "@/config/site";
import { useAuthUser } from "@/lib/use-auth-user";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuthUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-deep/10 bg-offwhite/85 shadow-[0_8px_30px_-18px_rgba(16,27,61,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" onClick={close} aria-label="Skill Craft — página inicial" className="shrink-0 rounded-lg">
          <Logo markClassName="h-8 w-auto lg:h-10" textClassName="text-[1.15rem] lg:text-[1.35rem]" />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-charcoal/80 transition hover:text-skill"
              >
                {l.label}
                <span className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-skill transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {!loading && user ? (
            <>
              <Link
                href="/area-do-aluno"
                className="hidden items-center gap-2 rounded-xl border border-deep/15 bg-white px-3.5 py-2.5 text-sm font-semibold text-deep transition hover:border-skill/40 hover:text-skill sm:inline-flex"
              >
                <UserRound className="h-4 w-4" aria-hidden /> Área do aluno
              </Link>
              <SignOutButton compact className="hidden border border-deep/15 px-3.5 py-2.5 text-charcoal hover:bg-deep/5 lg:inline-flex" />
            </>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-deep transition hover:bg-deep/5 hover:text-skill sm:inline-flex"
            >
              <LogIn className="h-4 w-4" aria-hidden /> Entrar
            </Link>
          )}

          <a
            href="#contato"
            className="hidden rounded-xl bg-skill px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(49,85,217,0.8)] transition hover:-translate-y-0.5 hover:bg-[#2745bd] active:translate-y-0 md:inline-flex"
          >
            Solicitar serviço
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-deep/15 bg-white text-deep transition active:scale-95 xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-6 pt-2 sm:px-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-charcoal transition hover:bg-skill/10 hover:text-skill"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 grid gap-2 sm:grid-cols-2">
                {!loading && user ? (
                  <>
                    <Link
                      href="/area-do-aluno"
                      onClick={close}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-deep/15 bg-white px-4 py-3 text-sm font-semibold text-deep"
                    >
                      <UserRound className="h-4 w-4" aria-hidden /> Área do aluno
                    </Link>
                    <SignOutButton className="border border-deep/15 px-4 py-3 text-charcoal" />
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={close}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-deep/15 bg-white px-4 py-3 text-sm font-semibold text-deep"
                  >
                    <LogIn className="h-4 w-4" aria-hidden /> Entrar
                  </Link>
                )}
                <a
                  href="#contato"
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-xl bg-skill px-4 py-3 text-sm font-bold text-white"
                >
                  Solicitar serviço
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
