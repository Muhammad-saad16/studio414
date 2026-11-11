import type { Metadata } from "next";
import { Stats, Testimonials, Work } from "@/components/Sections";
import { CTA, PageHeader } from "@/components/PageParts";
import { getContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects from 500+ delivered for founders, startups and established brands.",
};

export default async function WorkPage() {
  const cms = await getContent();
  return (
    <>
      <PageHeader
        label="Work"
        title="500+ projects."
        highlight="Here are a few."
        intro="Brands, content and digital products for founders, startups and established companies across the US, the UK, the UAE and Pakistan."
      />
      <Work work={cms.projects} />
      <Stats />
      <Testimonials testimonials={cms.testimonials} />
      <CTA />
    </>
  );
}
