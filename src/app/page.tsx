import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutMe } from "@/components/sections/about-me";
import { DesignProcess } from "@/components/sections/design-process";
import { Hero } from "@/components/sections/hero";
import { SelectedWorks } from "@/components/sections/selected-works";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#191919]">
      <Header activePath="/" />
      <Hero />
      <SelectedWorks />
      <DesignProcess />
      <AboutMe />
      <Footer />
    </main>
  );
}
