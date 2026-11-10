import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ContactContent } from "@/components/Pages";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <>
      <PageHero label="Contact" title="Let's build your *idea.*" intro={"Tell us about your brand and what you want to create. We will get back to you shortly."} />
      <ContactContent />
    </>
  );
}
