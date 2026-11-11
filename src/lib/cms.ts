import "server-only";
import { cacheTag } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { faqs, services, testimonials, work, type Faq, type Project, type Service, type Testimonial } from "./site";

type Upload = { url?: string | null } | number | null | undefined;
const url = (u: Upload) => (u && typeof u === "object" ? (u.url ?? null) : null);

export type CMSContent = { services: Service[]; projects: Project[]; testimonials: Testimonial[]; faqs: Faq[] };

const fallback: CMSContent = { services, projects: work, testimonials, faqs };

/** Content managed in Payload (/admin). Falls back to src/lib/site.ts if the CMS is empty or unreachable. */
export async function getContent(): Promise<CMSContent> {
  "use cache";
  cacheTag("cms");
  try {
    // Own instance key: never await the admin/API instance's init promise inside "use cache".
    const payload = await getPayload({ config, key: "site-cache" });
    const q = { limit: 100, sort: "order", depth: 1 } as const;
    const [s, p, t, f] = await Promise.all([
      payload.find({ collection: "services", ...q }),
      payload.find({ collection: "projects", ...q }),
      payload.find({ collection: "testimonials", ...q }),
      payload.find({ collection: "faqs", ...q }),
    ]);
    return {
      services: s.docs.length
        ? s.docs.map((d, i) => ({
            no: String(i + 1).padStart(2, "0"),
            title: d.title,
            desc: d.desc,
            tags: (d.tags ?? []).map((x: { label: string }) => x.label),
            color: d.color || "#8c52ff",
          }))
        : fallback.services,
      projects: p.docs.length
        ? p.docs.map((d) => ({
            title: d.title,
            cat: d.category,
            result: d.result ?? "",
            from: d.color || "#5e2fc4",
            cover: url(d.cover),
            link: d.link,
          }))
        : fallback.projects,
      testimonials: t.docs.length
        ? t.docs.map((d) => ({ quote: d.quote, name: d.name, role: d.role ?? "", photo: url(d.photo) }))
        : fallback.testimonials,
      faqs: f.docs.length ? f.docs.map((d) => ({ q: d.question, a: d.answer })) : fallback.faqs,
    };
  } catch (e) {
    console.error("[cms] falling back to static content:", e);
    return fallback;
  }
}
