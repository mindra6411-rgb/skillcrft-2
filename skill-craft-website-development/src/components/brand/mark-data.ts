/**
 * Geometria vetorial do símbolo SC (viewBox 368 × 450), isométrica, em duas tonalidades.
 * Usada tanto pelo logotipo estático quanto pela animação de abertura.
 */
export const MARK_VIEWBOX = { w: 368, h: 450 };

export const brandColors = {
  deepSlate: "#101B3D",
  skillBlue: "#3155D9",
  accentBlue: "#6B8CFF",
  charcoal: "#20232C",
  offWhite: "#F7F8FC",
} as const;

export type MarkPiece = {
  id: string;
  d: string;
  tone: "dark" | "blue";
  /** Deslocamento inicial (px no viewBox) usado na animação de encaixe. */
  from: { x: number; y: number };
};

export const markPieces: MarkPiece[] = [
  // centro
  { id: "core-blue", tone: "blue", d: "M77 158 L184 96 L292 158 L184 220 Z", from: { x: 0, y: -90 } },
  { id: "core-dark", tone: "dark", d: "M77 208 L184 270 L292 208 L292 262 L184 324 L77 262 Z", from: { x: 0, y: 90 } },
  // faixas externas
  { id: "tl-dark", tone: "dark", d: "M0 110 L184 3 L184 63 L52 140 L52 198 L0 168 Z", from: { x: -110, y: -70 } },
  { id: "tr-blue", tone: "blue", d: "M184 3 L368 110 L317 140 L184 63 Z", from: { x: 110, y: -70 } },
  { id: "r-dark", tone: "dark", d: "M317 140 L368 110 L368 178 L317 208 Z", from: { x: 120, y: -10 } },
  { id: "l-blue", tone: "blue", d: "M0 203 L52 233 L52 306 L0 336 Z", from: { x: -120, y: 10 } },
  { id: "bl-dark", tone: "dark", d: "M0 342 L52 312 L184 389 L184 450 Z", from: { x: -110, y: 80 } },
  { id: "br-blue", tone: "blue", d: "M184 450 L368 342 L368 288 L317 258 L317 312 L184 389 Z", from: { x: 110, y: 80 } },
];

/** Detalhe do "G" interno (traço na cor do fundo), formando o C/G do monograma. */
export const markGlyph = "M220 192 L184 171 L148 192 L148 238 L184 259 L220 238 L220 214 L190 214";
