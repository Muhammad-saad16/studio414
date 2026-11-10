// ---------------------------------------------------------------
//  ALL SITE CONTENT LIVES HERE.
//  Copy is taken from the Sarté Brand Guide (Notion).
//  Anything marked  TODO  is a placeholder the Sarté team will write.
//  Logo: drop it at /public/logo.svg and set `logo: "/logo.svg"`.
// ---------------------------------------------------------------
export const site = {
  name: "Sarté",
  logo: null as string | null,
  tagline: "Where ideas are born, and brands are made",
  year: 2026,
  email: "hello@sarte.studio", // TODO real email
  phone: "", // TODO add phone if wanted
  markets: "United States & United Kingdom",
  socials: {
    instagram: "#", // TODO
    linkedin: "#", // TODO
  } as Record<string, string>,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const brand = {
  whatWeAre:
    "A creative advertising company that builds brands, content, and digital products for businesses.",
  nameMeaning:
    "Sarté stands for an idea. Every piece of creative work begins with one, and everything we make starts there.",
  mission: "To help ambitious brands flourish through ideas that are imaginatively crafted and strategically built.",
  vision: "To be the partner every visionary brand turns to when an idea deserves to be seen by the world.",
  clients: "Business owners, founders, startup owners, and big tech firms.",
  // TODO: link/paste the "Sarté Brand Story" here
  story: "",
};

export const values = [
  {
    title: "Idea first",
    desc: "Every great outcome begins with a great idea. We think before we design, and we imagine before we execute.",
  },
  {
    title: "Ownership",
    desc: "We built Sarté with our own hands, and we treat every project the same way. We take responsibility for the work, the results, and the promise we make to clients.",
  },
  {
    title: "Craft",
    desc: "Excellence lives in the details. We refine relentlessly, because ordinary work is never our standard.",
  },
  {
    title: "Integrity",
    desc: "We are honest in our advice, transparent in our process, and dependable in our delivery. Trust is the foundation of every long-term partnership.",
  },
  {
    title: "Boldness",
    desc: "We back original thinking and push past the predictable. We believe brands are remembered for the risks they dare to take with clarity and purpose.",
  },
];

export type Service = {
  slug: string;
  title: string;
  items: string[];
  desc?: string;
};

export const services: Service[] = [
  {
    slug: "creative-design",
    title: "Creative & Design",
    items: ["Ad creatives", "Static posts and graphic design", "Brand identity and visual design"],
  },
  {
    slug: "video-motion",
    title: "Video & Motion",
    items: ["Reels and short-form video", "Motion graphics", "Launch videos and explainer videos", "Video editing"],
  },
  {
    slug: "digital-software",
    title: "Digital & Software",
    items: ["Websites", "Applications and software solutions", "Backroom software"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    desc: "We automate your current systems, from lead follow-ups and customer support to reporting and workflows, so your team gets up to 75% more productivity and a more balanced, better-managed operation.",
    items: ["Lead follow-ups", "Customer support", "Reporting", "Workflows"],
  },
  {
    slug: "marketing",
    title: "Marketing",
    items: ["Paid advertising (Meta Ads and other platforms)", "Brand visibility and growth"],
  },
  {
    slug: "ebook-publishing",
    title: "E-Book & Publishing",
    items: [
      "Book cover design, illustration, and comic book artwork",
      "Writing, ghostwriting, editing, and proofreading",
      "Book publishing, formatting, and children's book printing",
      "Author website design, book trailers, and marketing",
      "Professional book reviews",
    ],
  },
];

export const customWork = "Other work as per the client's needs.";

export const processSteps = ["Brief", "Concept", "Draft", "Review", "Revision", "Delivery"];

// TODO: the Sarté team will add real case studies here.
export const work: { title: string; category: string; image?: string }[] = [];
