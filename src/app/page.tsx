import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, FAQ, Marquee, Process, Services, Stats, Testimonials, Work } from "@/components/Sections";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Stats />
        <Work />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
