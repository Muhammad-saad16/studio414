import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

/** Any change in the admin refreshes the public site on the next visit. */
const bust = () => {
  try {
    revalidateTag("cms", { expire: 0 });
  } catch {
    /* not in a request context (e.g. seeding) */
  }
};
const afterChange: CollectionAfterChangeHook = ({ doc }) => {
  bust();
  return doc;
};
const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  bust();
  return doc;
};
const hooks = { afterChange: [afterChange], afterDelete: [afterDelete] };
const publicRead = { read: () => true };
const order = {
  name: "order",
  type: "number" as const,
  defaultValue: 0,
  admin: { position: "sidebar" as const, description: "Lower numbers show first" },
};

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: true,
  fields: [],
};

export const Media: CollectionConfig = {
  slug: "media",
  access: publicRead,
  upload: { staticDir: "media" },
  fields: [{ name: "alt", type: "text", required: true }],
};

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title", defaultColumns: ["title", "order"] },
  defaultSort: "order",
  access: publicRead,
  hooks,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "desc", label: "Description", type: "textarea", required: true },
    { name: "tags", type: "array", fields: [{ name: "label", type: "text", required: true }] },
    { name: "color", type: "text", defaultValue: "#8c52ff", admin: { description: "Accent colour, e.g. #8c52ff" } },
    order,
  ],
};

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "order"] },
  defaultSort: "order",
  access: publicRead,
  hooks,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "category", type: "text", required: true, admin: { description: "e.g. Branding · Packaging" } },
    { name: "result", type: "text", admin: { description: "Headline result, e.g. +212% sales" } },
    { name: "cover", type: "upload", relationTo: "media", admin: { description: "Optional cover image" } },
    { name: "color", type: "text", defaultValue: "#5e2fc4", admin: { description: "Background colour when no cover" } },
    { name: "link", type: "text", admin: { description: "Optional case-study / live URL" } },
    order,
  ],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "order"] },
  defaultSort: "order",
  access: publicRead,
  hooks,
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", admin: { description: "e.g. Founder, Bloom Organics" } },
    { name: "photo", type: "upload", relationTo: "media" },
    order,
  ],
};

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: { useAsTitle: "question" },
  defaultSort: "order",
  access: publicRead,
  hooks,
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    order,
  ],
};
