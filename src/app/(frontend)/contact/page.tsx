import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/Sections";
import { getContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your idea. We reply within 24 hours.",
};

export default async function ContactPage() {
  const cms = await getContent();
  return (
    <>
      <div className="pt-16 md:pt-20">
        <Contact />
      </div>
      <FAQ faqs={cms.faqs} />
    </>
  );
}
