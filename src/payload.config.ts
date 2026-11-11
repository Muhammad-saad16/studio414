import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, type Payload } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Faqs, Media, Projects, Services, Testimonials, Users } from "./collections";
import { faqs, services, testimonials, work } from "./lib/site";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** First run: fill the empty CMS with the site's starter content. */
async function seed(payload: Payload) {
  const empty = async (c: "services" | "projects" | "testimonials" | "faqs") =>
    (await payload.count({ collection: c })).totalDocs === 0;

  if (await empty("services"))
    for (const [i, s] of services.entries())
      await payload.create({
        collection: "services",
        data: { title: s.title, desc: s.desc, color: s.color, tags: s.tags.map((label) => ({ label })), order: i },
      });
  if (await empty("projects"))
    for (const [i, w] of work.entries())
      await payload.create({
        collection: "projects",
        data: { title: w.title, category: w.cat, result: w.result, color: w.from, order: i },
      });
  if (await empty("testimonials"))
    for (const [i, t] of testimonials.entries())
      await payload.create({ collection: "testimonials", data: { ...t, order: i } });
  if (await empty("faqs"))
    for (const [i, f] of faqs.entries())
      await payload.create({ collection: "faqs", data: { question: f.q, answer: f.a, order: i } });
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — Sarté CMS" },
  },
  collections: [Services, Projects, Testimonials, Faqs, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || "file:./sarte.db" } }),
  sharp,
  onInit: seed,
});
