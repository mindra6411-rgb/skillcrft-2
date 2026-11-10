import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "light",
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p
        className={`inline-flex items-center gap-2 font-caption text-xs font-bold uppercase tracking-[0.22em] ${
          dark ? "text-accent" : "text-skill"
        }`}
      >
        <span className={`h-px w-8 ${dark ? "bg-accent" : "bg-skill"}`} aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-offwhite" : "text-deep"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-offwhite/70" : "text-charcoal/75"}`}>
          {children}
        </p>
      )}
    </Reveal>
  );
}
