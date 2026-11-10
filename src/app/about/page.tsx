import type { Metadata } from "next";
import { brand } from "@/lib/site";
import { PageHero } from "@/components/ui";
import { AboutContent } from "@/components/Pages";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <>
      <PageHero label="About" title="An idea is where *everything* starts." intro={brand.whatWeAre} />
      <AboutContent />
    </>
  );
}
