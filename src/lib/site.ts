// ---------------------------------------------------------------
//  Brand config — change the name, email, phone, socials here and
//  the whole site updates. Drop the logo at /public/logo.svg and
//  set `logo` below to "/logo.svg".
// ---------------------------------------------------------------
export const site = {
  name: "Sarté",
  logo: null as string | null, // e.g. "/logo.svg"
  tagline: "Where ideas are born, and brands are made",
  description:
    "Sarté is a creative advertising company that builds brands, content and digital products: design, video & motion, websites & software, AI automation, marketing and publishing.",
  mission: "To help ambitious brands flourish through ideas that are imaginatively crafted and strategically built.",
  vision: "To be the partner every visionary brand turns to when an idea deserves to be seen by the world.",
  year: 2026,
  email: "hello@sarte.studio",
  phone: "+92 300 0000000",
  address: "Karachi, Pakistan — working worldwide",
  socials: {
    instagram: "#",
    linkedin: "#",
    behance: "#",
    x: "#",
  },
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const services = [
  {
    no: "01",
    title: "Creative & Design",
    desc: "Ad creatives, static posts and brand identity that stop the scroll and make you instantly recognisable.",
    tags: ["Ad creatives", "Static posts", "Graphic design", "Brand identity", "Visual design"],
    color: "#8c52ff",
  },
  {
    no: "02",
    title: "Video & Motion",
    desc: "Reels, motion graphics, launch films and explainers, edited to hold attention from the first frame to the last.",
    tags: ["Reels & short-form", "Motion graphics", "Launch videos", "Explainers", "Video editing"],
    color: "#a57cff",
  },
  {
    no: "03",
    title: "E-Book & Publishing",
    desc: "From the first draft to the bookshelf: writing, covers, illustration, publishing and the marketing that gets a book read.",
    tags: ["Cover design & illustration", "Ghostwriting & editing", "Publishing & printing", "Author websites", "Book trailers", "Book reviews"],
    color: "#9a6bff",
  },
  {
    no: "04",
    title: "Marketing",
    desc: "Paid advertising on Meta and beyond, plus brand visibility work that turns attention into steady growth.",
    tags: ["Meta Ads", "Paid advertising", "Brand visibility", "Growth"],
    color: "#b896ff",
  },
  {
    no: "05",
    title: "AI Automation",
    desc: "We automate your current systems, from lead follow-ups and customer support to reporting and workflows, for up to 75% more productivity and a calmer, better-run operation.",
    tags: ["Lead follow-ups", "Customer support", "Reporting", "Workflows"],
    color: "#7440e6",
  },
  {
    no: "06",
    title: "Digital & Software",
    desc: "Websites, applications and back-office software built to be fast, reliable and ready to scale with you.",
    tags: ["Websites", "Applications", "Software solutions", "Back-office systems"],
    color: "#c3a6ff",
  },
];

export const customWork = "Need something that isn't listed? We take on custom work shaped around your needs.";

export const values = [
  { title: "Idea first", desc: "Every great outcome begins with a great idea. We think before we design, and we imagine before we execute." },
  { title: "Ownership", desc: "We built Sarté with our own hands, and we treat every project the same way: the work, the results and the promise are ours." },
  { title: "Craft", desc: "Excellence lives in the details. We refine relentlessly, because ordinary work is never our standard." },
  { title: "Integrity", desc: "Honest advice, a transparent process and dependable delivery. Trust is the foundation of every long-term partnership." },
  { title: "Boldness", desc: "We back original thinking and push past the predictable, because brands are remembered for the risks they dare to take." },
];

export const work = [
  {
    title: "Bloom Organics",
    cat: "Branding · Packaging",
    result: "+212% retail sell-through",
    from: "#5e2fc4",
    to: "#5e2fc4",
  },
  {
    title: "Vertex Fintech",
    cat: "Web · SEO",
    result: "#1 for 140+ keywords",
    from: "#8c52ff",
    to: "#8c52ff",
  },
  {
    title: "Urban Thread",
    cat: "Performance Marketing",
    result: "6.4x ROAS in 90 days",
    from: "#2b1a55",
    to: "#2b1a55",
  },
  {
    title: "Saffron House",
    cat: "Social · Content",
    result: "2.1M organic reach / mo",
    from: "#7440e6",
    to: "#7440e6",
  },
];

export const process = [
  { step: "01", title: "Brief", desc: "We listen first: your business, your audience, your goals, and what success looks like to you." },
  { step: "02", title: "Concept", desc: "Ideas before execution. We shape the big idea and the strategy that will carry it." },
  { step: "03", title: "Draft", desc: "Designers, editors and developers bring the concept to life with craft you can feel." },
  { step: "04", title: "Review", desc: "You see the work early, with a clear walkthrough of every decision we made." },
  { step: "05", title: "Revision", desc: "We refine on your feedback until every detail is right. Ordinary is never the standard." },
  { step: "06", title: "Delivery", desc: "Final files, launched products and handover, delivered on the date we promised." },
];

export const stats = [
  { value: 500, suffix: "+", label: "Projects delivered" },
  { value: 50, suffix: "+", label: "People on the team" },
  { value: 7, suffix: "+", label: "Years since day one" },
  { value: 4, suffix: "", label: "Countries served" },
];

export const testimonials = [
  {
    quote: "They rebuilt our brand from scratch and sales doubled in the first quarter. Feels like an in-house team.",
    name: "Ayesha Khan",
    role: "Founder, Bloom Organics",
  },
  {
    quote: "Page one for every keyword that matters to us. Our inbound leads went from trickle to flood.",
    name: "Hamza Raza",
    role: "CMO, Vertex Fintech",
  },
  {
    quote: "Best ad agency we've worked with. Transparent reporting and ROAS we didn't think was possible.",
    name: "Daniel Brooks",
    role: "Owner, Urban Thread",
  },
  {
    quote: "Our socials finally look premium. Engagement is up 4x and customers mention our posts in-store.",
    name: "Sara Malik",
    role: "Director, Saffron House",
  },
  {
    quote: "Fast, creative and genuinely obsessed with results. The website they built converts like crazy.",
    name: "Omar Siddiqui",
    role: "CEO, Kinetic Labs",
  },
  {
    quote: "From logo to launch campaign in 5 weeks. Everything looked and felt world-class.",
    name: "Zara Ahmed",
    role: "Co-founder, Lumen Skin",
  },
];

export const faqs = [
  {
    q: "What does Sarté do?",
    a: "We're a creative advertising company that builds brands, content and digital products: creative & design, video & motion, websites & software, AI automation, paid marketing, and e-book & publishing.",
  },
  {
    q: "Who do you work with?",
    a: "Business owners, founders, startups and big tech firms. Most of our clients are in the United States and the United Kingdom, and we also work with brands in Pakistan and the UAE.",
  },
  {
    q: "What does the name Sarté mean?",
    a: "Sarté stands for an idea, the starting point of all creative work. Everything we make starts there.",
  },
  {
    q: "Can you take on work that isn't on your services list?",
    a: "Yes. Alongside our core services we take on custom work shaped around each client's needs. Tell us what you have in mind.",
  },
  {
    q: "How does a project run?",
    a: "Brief, concept, draft, review, revision, delivery. You see the work at every stage and know exactly what's happening next.",
  },
  {
    q: "Will I own the final files?",
    a: "Always. Once the project is paid, every source file, asset and account is 100% yours.",
  },
];

export const clients = [
  "Bloom", "Vertex", "Urban Thread", "Saffron", "Kinetic", "Lumen", "Northwind", "Orbit", "Pulse", "Arcadia",
];

// ---------------------------------------------------------------
//  Our story — the journey, told chapter by chapter.
// ---------------------------------------------------------------
export const story = {
  intro:
    "Every great brand starts with an idea. Ours started in 2019 with one laptop, no safety net, and a stubborn belief that quality would speak for itself.",
  chapters: [
    {
      year: "2019",
      icon: "laptop",
      title: "One laptop. One idea.",
      text: "It began alone. One person was the designer, the editor, the developer and the marketer, all at once. There was no team to lean on, only an idea worth chasing.",
    },
    {
      year: "The early years",
      icon: "moon",
      title: "Long nights, tight deadlines.",
      text: "The first years were a test: late nights, tight deadlines, and clients who didn't yet know the name. Every hurdle taught a lesson, and quality slowly became the reputation.",
    },
    {
      year: "Growing",
      icon: "users",
      title: "One became ten. Ten became a team.",
      text: "One happy client told another. One became ten, and ten became a team. A partner with 9+ years in tech joined and brought the depth and discipline that turn good ideas into reliable products.",
    },
    {
      year: "Today",
      icon: "globe",
      title: "50+ people. 500+ projects.",
      text: "Today 50+ people build with us. Together we've delivered 500+ projects for founders, startups and established brands across Pakistan, the UAE, the US and the UK.",
    },
  ],
  name: {
    word: "Sarté",
    meaning: "an idea",
    text: "We called it Sarté, meaning an idea, because after 7+ years we still believe every great brand starts with one.",
  },
};

// ---------------------------------------------------------------
//  Founders — told as a story, no photos. Set `name` to show it.
// ---------------------------------------------------------------
export const founders = [
  {
    name: "",
    role: "Founder & Creative Director",
    initial: "F",
    quote:
      "In 2019, I started alone: one laptop, one idea, and no safety net. I was the designer, editor, developer, and marketer all at once.",
    story: [
      "The early years tested everything: long nights, tight deadlines, and clients who didn't yet know the name. But every hurdle taught something, and quality became the reputation.",
      "One happy client became ten, and ten became a team. Today 50+ people work together under Sarté, with 500+ projects delivered for founders, startups and established brands.",
    ],
    tags: ["Since 2019", "Brand & Design", "500+ projects"],
  },
  {
    name: "",
    role: "Co-founder & Technical Partner",
    initial: "P",
    quote:
      "With more than 9 years in the tech industry, he brings the depth and discipline that turn good ideas into reliable products.",
    story: [
      "His technical expertise solves the problems others avoid, and his clear, honest communication keeps every client confident from the first call to final delivery.",
      "That combination of strong skills and strong relationships has taken Sarté far beyond where either founder started, and it's the reason clients trust us with their biggest projects.",
    ],
    tags: ["9+ years in tech", "Engineering", "Client trust"],
  },
];

// ---------------------------------------------------------------
//  Shapes of CMS-driven content (Payload or the fallbacks above).
// ---------------------------------------------------------------
export type Service = { no: string; title: string; desc: string; tags: string[]; color: string };
export type Project = { title: string; cat: string; result: string; from: string; cover?: string | null; link?: string | null };
export type Testimonial = { quote: string; name: string; role: string; photo?: string | null };
export type Faq = { q: string; a: string };
