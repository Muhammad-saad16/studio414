import type { Metadata } from "next";
import { About, Stats } from "@/components/Sections";
import { Founders, Story } from "@/components/Story";
import { CTA, PageHeader } from "@/components/PageParts";
import { story } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "How Sarté grew from one laptop and one idea in 2019 into a 50+ person team with 500+ projects delivered.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader label="About" title="Every great brand" highlight="starts with an idea." intro={story.intro} />
      <Story />
      <Founders />
      <Stats />
      <About />
      <CTA />
    </>
  );
}
