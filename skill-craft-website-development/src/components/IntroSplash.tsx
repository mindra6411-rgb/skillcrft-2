"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { brandColors, markGlyph, markPieces, MARK_VIEWBOX } from "@/components/brand/mark-data";

const SEEN_KEY = "skillcraft-intro-seen";
const TOTAL_MS = 3700;

const ease = [0.22, 1, 0.36, 1] as const;

// Linhas geométricas (viewBox 1000x1000), em ângulos isométricos.
const hex = "M500 190 L768 345 L768 655 L500 810 L232 655 L232 345 Z";
const lines = [
  "M0 345 L1000 345",
  "M0 655 L1000 655",
  "M232 0 L232 1000",
  "M768 0 L768 1000",
  "M0 773 L1000 195",
  "M0 195 L1000 773",
  "M500 0 L500 190",
  "M500 810 L500 1000",
];

/**
 * Abertura animada. Não bloqueia navegação (overlay com pointer-events-none, exceto o botão "Pular"),
 * toca uma vez por sessão e é desativada com prefers-reduced-motion.
 */
export function IntroSplash() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage indisponível */
    }
    if (reduce || seen) {
      setVisible(false);
      return;
    }
    const t = window.setTimeout(() => setVisible(false), TOTAL_MS);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!visible) {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden={false}
          role="presentation"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease }}
        >
          {/* gradiente discreto */}
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(49,85,217,0.28),transparent_70%)]" />

          {/* linhas geométricas surgindo */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden
          >
            {lines.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke={brandColors.accentBlue}
                strokeOpacity={0.22}
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease }}
              />
            ))}
            <motion.path
              d={hex}
              stroke={brandColors.accentBlue}
              strokeOpacity={0.55}
              strokeWidth={1.5}
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.25] }}
              transition={{ duration: 1.6, delay: 0.3, ease }}
            />
          </svg>

          <div className="relative flex flex-col items-center px-6">
            {/* símbolo SC: peças se encaixam */}
            <motion.svg
              viewBox={`0 0 ${MARK_VIEWBOX.w} ${MARK_VIEWBOX.h}`}
              className="h-40 w-auto sm:h-52"
              fill="none"
              aria-hidden
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, delay: 0.8, ease }}
            >
              {markPieces.map((piece, i) => (
                <motion.path
                  key={piece.id}
                  d={piece.d}
                  fill={piece.tone === "dark" ? brandColors.offWhite : brandColors.accentBlue}
                  stroke={brandColors.deepSlate}
                  strokeWidth={3}
                  initial={{ x: piece.from.x, y: piece.from.y, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 18,
                    delay: 0.9 + i * 0.1,
                    opacity: { duration: 0.35, delay: 0.9 + i * 0.1 },
                  }}
                />
              ))}
              <motion.path
                d={markGlyph}
                stroke={brandColors.deepSlate}
                strokeWidth={13}
                strokeLinejoin="miter"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 2.0, ease }}
              />
            </motion.svg>

            {/* logotipo */}
            <motion.div
              className="mt-8 font-heading text-4xl font-extrabold leading-none tracking-tight sm:text-5xl"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 2.3, ease }}
            >
              <span className="text-accent">skill</span> <span className="text-offwhite">craft</span>
            </motion.div>
            <motion.p
              className="mt-4 font-caption text-xs uppercase tracking-[0.3em] text-accent/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.7 }}
            >
              Administração · TI · Design
            </motion.p>
          </div>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="pointer-events-auto absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-caption text-xs font-bold uppercase tracking-widest text-offwhite/80 backdrop-blur transition hover:bg-white/10 hover:text-white sm:right-8 sm:top-8"
          >
            Pular
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
