import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Lato, Montserrat, Roboto } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skill Craft | Apoio acadêmico, tecnológico e criativo",
  description:
    "Skill Craft: agência estudantil que une Administração, Tecnologia da Informação e Design Gráfico. Aprenda, desenvolva e prepare-se para o mercado.",
  openGraph: {
    title: "Skill Craft",
    description: "Aprenda, desenvolva e prepare-se para o mercado.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#101B3D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${roboto.variable} ${lato.variable}`}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
