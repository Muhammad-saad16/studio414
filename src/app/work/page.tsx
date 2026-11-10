import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { WorkContent } from "@/components/Pages";

export const metadata: Metadata = { title: "Work" };

export default function Page() {
  return (
    <>
      <PageHero label="Selected work" title="Ideas, *made real.*" intro={"A selection of brands, content and products we have built. Case studies coming soon."} />
      <WorkContent />
    </>
  );
}
