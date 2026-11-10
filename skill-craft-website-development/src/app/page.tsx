import { Footer } from "@/components/Footer";
import { IntroSplash } from "@/components/IntroSplash";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <a
        href="#conteudo"
        className="sr-only z-[110] rounded-lg bg-deep px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Differentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
