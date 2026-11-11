import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import { About, Marquee, Services, Stats, Testimonials, Work } from "@/components/Sections";
import { CTA } from "@/components/PageParts";
import { getContent } from "@/lib/cms";

export default async function Home() {
  const cms = await getContent();
  return (
    <>
      <Preloader />
      <Hero />
      <Marquee />
      <About storyLink />
      <Services services={cms.services} />
      <Stats />
      <Work work={cms.projects} limit={4} />
      <Testimonials testimonials={cms.testimonials} />
      <CTA />
    </>
  );
}
