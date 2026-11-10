import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ServicesContent } from "@/components/Pages";

export const metadata: Metadata = { title: "Services" };

export default function Page() {
  return (
    <>
      <PageHero label="Services" title="Everything a brand needs to *grow.*" intro={"From the first idea to the final frame — creative, video, digital, AI, marketing and publishing under one roof."} />
      <ServicesContent />
    </>
  );
}
