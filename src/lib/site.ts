// ---------------------------------------------------------------
//  Brand config — change the name, email, phone, socials here and
//  the whole site updates. Drop the logo at /public/logo.svg and
//  set `logo` below to "/logo.svg".
// ---------------------------------------------------------------
export const site = {
  name: "Sarté",
  logo: null as string | null, // e.g. "/logo.svg"
  tagline: "Design. Marketing. Growth.",
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
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const services = [
  {
    no: "01",
    title: "Graphic Design",
    desc: "Scroll-stopping visuals for print, social and digital — posters, packaging, decks and everything in between.",
    tags: ["Social creatives", "Packaging", "Print", "Pitch decks"],
    color: "#8c52ff",
  },
  {
    no: "02",
    title: "Brand Identity",
    desc: "Logos, type, colour and voice that make you instantly recognisable — and impossible to forget.",
    tags: ["Logo design", "Brand guidelines", "Naming", "Rebrands"],
    color: "#a57cff",
  },
  {
    no: "03",
    title: "Digital Marketing",
    desc: "Performance campaigns on Meta, Google and TikTok engineered for one thing: measurable revenue.",
    tags: ["Meta Ads", "Google Ads", "TikTok Ads", "Funnels"],
    color: "#c3a6ff",
  },
  {
    no: "04",
    title: "SEO",
    desc: "Technical, on-page and content SEO that pushes you to page one — and keeps you there.",
    tags: ["Technical SEO", "Local SEO", "Content", "Link building"],
    color: "#7440e6",
  },
  {
    no: "05",
    title: "Social Media",
    desc: "Content calendars, reels and community management that turn followers into customers.",
    tags: ["Strategy", "Reels", "Community", "Influencers"],
    color: "#b896ff",
  },
  {
    no: "06",
    title: "Web Design & Dev",
    desc: "Fast, animated, conversion-focused websites and stores built on modern tech.",
    tags: ["UI/UX", "Next.js", "Shopify", "WordPress"],
    color: "#9a6bff",
  },
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
  {
    step: "01",
    title: "Discover",
    desc: "We dig into your business, audience and competitors to find the angle nobody else is using.",
  },
  {
    step: "02",
    title: "Strategise",
    desc: "A clear roadmap — positioning, channels, KPIs and budget — so every rupee has a job.",
  },
  {
    step: "03",
    title: "Create",
    desc: "Designers, writers and developers bring it to life with craft you can feel.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    desc: "We ship, measure, test and optimise — every week, with reports in plain language.",
  },
];

export const stats = [
  { value: 250, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 6, suffix: "x", label: "Average ROAS" },
  { value: 12, suffix: "M+", label: "Organic impressions" },
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
    q: "What services do you offer?",
    a: "Graphic design, brand identity, digital marketing (Meta, Google, TikTok), SEO, social media management and website design & development — individually or as a full growth package.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on scope. We offer fixed-price projects for branding and websites, and monthly retainers for marketing, SEO and social. Book a free call and we'll send a clear proposal within 48 hours.",
  },
  {
    q: "How long until I see results?",
    a: "Design and web projects typically ship in 2–6 weeks. Paid ads start producing data in days; SEO usually shows strong movement within 3–6 months.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes — we work with brands across the UK, US, UAE and beyond, fully remote with weekly calls and live dashboards.",
  },
  {
    q: "Will I own the final files?",
    a: "Always. Once the project is paid, every source file, asset and account is 100% yours.",
  },
];

export const clients = [
  "Bloom", "Vertex", "Urban Thread", "Saffron", "Kinetic", "Lumen", "Northwind", "Orbit", "Pulse", "Arcadia",
];
