import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA, PageHeader, ServiceDetail } from "@/components/PageParts";
import { getContent } from "@/lib/cms";
import { slugify } from "@/lib/site";

export async function generateStaticParams() {
  const { services } = await getContent();
  return services.map((s) => ({ slug: slugify(s.title) }));
}

async function find(slug: string) {
  const { services } = await getContent();
  const service = services.find((s) => slugify(s.title) === slug);
  return { service, others: services.filter((s) => s !== service) };
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { service } = await find((await params).slug);
  return service ? { title: service.title, description: service.desc } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { service, others } = await find((await params).slug);
  if (!service) notFound();
  return (
    <>
      <PageHeader
        label={service.title}
        title={service.title}
        intro={service.desc}
        crumbs={[{ label: "Services", href: "/services" }]}
      />
      <ServiceDetail service={service} others={others} />
      <CTA title={`Ready for ${service.title.toLowerCase()}?`} highlight="Let's talk." />
    </>
  );
}
