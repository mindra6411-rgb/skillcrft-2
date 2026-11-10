import { brandColors, markGlyph, markPieces, MARK_VIEWBOX } from "./mark-data";

type Variant = "color" | "inverse" | "mono-light";

const palette: Record<Variant, { dark: string; blue: string; gap: string; skill: string; craft: string }> = {
  color: {
    dark: brandColors.deepSlate,
    blue: brandColors.skillBlue,
    gap: brandColors.offWhite,
    skill: brandColors.skillBlue,
    craft: brandColors.charcoal,
  },
  inverse: {
    dark: brandColors.offWhite,
    blue: brandColors.accentBlue,
    gap: brandColors.deepSlate,
    skill: brandColors.accentBlue,
    craft: brandColors.offWhite,
  },
  "mono-light": {
    dark: brandColors.offWhite,
    blue: brandColors.offWhite,
    gap: brandColors.deepSlate,
    skill: brandColors.offWhite,
    craft: brandColors.offWhite,
  },
};

export function LogoMark({
  variant = "color",
  className,
  title,
}: {
  variant?: Variant;
  className?: string;
  title?: string;
}) {
  const p = palette[variant];
  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX.w} ${MARK_VIEWBOX.h}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {markPieces.map((piece) => (
        <path
          key={piece.id}
          d={piece.d}
          fill={piece.tone === "dark" ? p.dark : p.blue}
          stroke={p.gap}
          strokeWidth={3}
          strokeLinejoin="miter"
        />
      ))}
      <path d={markGlyph} stroke={p.gap} strokeWidth={13} strokeLinejoin="miter" strokeLinecap="butt" />
    </svg>
  );
}

/** Logotipo completo: símbolo à esquerda + "skill craft". Mantém proporção e respiro (margem de segurança). */
export function Logo({
  variant = "color",
  className = "",
  markClassName = "h-9 w-auto",
  textClassName = "text-[1.35rem]",
}: {
  variant?: Variant;
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  const p = palette[variant];
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="Skill Craft">
      <LogoMark variant={variant} className={`${markClassName} shrink-0`} />
      <span
        className={`font-heading font-extrabold leading-none tracking-tight ${textClassName}`}
        aria-hidden
      >
        <span style={{ color: p.skill }}>skill</span>{" "}
        <span style={{ color: p.craft }}>craft</span>
      </span>
    </span>
  );
}
