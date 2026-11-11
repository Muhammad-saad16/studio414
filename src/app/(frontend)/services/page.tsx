import type { Metadata } from "next";
import { FAQ, Process, Services } from "@/components/Sections";
import { CTA, PageHeader } from "@/components/PageParts";
import { getContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Services",
  description: "Creative & design, video & motion, websites & software, AI automation, marketing, and e-book & publishing.",
};

export default async function ServicesPage() {
  const cms = await getContent();
  return (
    <>
      <PageHeader
        label="Services"
        title="One team for every"
        highlight="part of your brand."
        intro="Creative, video, software, automation, marketing and publishing, built under one roof by people who own the result."
      />
      <Services services={cms.services} />
      <Process />
      <FAQ faqs={cms.faqs} />
      <CTA />
    </>
  );
}
