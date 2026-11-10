"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Plus, Star } from "lucide-react";
import { clients, faqs, process, services, stats, testimonials, work } from "@/lib/site";
import { Counter, FadeUp, SectionLabel, SplitText, ease } from "./ui";

/* ---------------------------------------------------------- Marquee */
export function Marquee() {
  const items = ["Graphic Design", "Branding", "Digital Marketing", "SEO", "Social Media", "Web Design"];
  const { scrollYProgress } = useScroll();
  const skew = useSpring(useTransform(scrollYProgress, [0, 1], [-3, 3]), { stiffness: 80, damping: 20 });
  return (
    <section className="relative overflow-hidden border-y border-fg/10 py-14">
      <motion.div style={{ rotate: skew }} className="flex w-max animate-marquee [--speed:35s]">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display flex items-center gap-8 pr-8 text-4xl leading-[1.2] font-semibold whitespace-nowrap md:text-6xl">
            <span className={i % 2 ? "text-outline" : ""}>{t}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------- About / scroll text */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const text =
    "Most agencies sell you deliverables. We sell outcomes. Strategy, design and marketing working as one system — so your brand looks world-class, ranks on page one, and turns attention into revenue.";
  const words = text.split(" ");
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionLabel>Who we are</SectionLabel>
      <div ref={ref} className="font-display text-3xl leading-[1.15] font-semibold md:text-6xl">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          ["Strategy first", "Every pixel and every ad starts with research, positioning and a plan."],
          ["One team, all skills", "Designers, marketers, SEOs and developers — no outsourcing, no handoffs."],
          ["Radically transparent", "Live dashboards and plain-language reports. You always know what's working."],
        ].map(([t, d], i) => (
          <FadeUp key={t} delay={i * 0.1} className="rounded-3xl border border-fg/10 bg-fg/[0.02] p-8">
            <div className="mb-6 font-display text-sm text-accent">0{i + 1}</div>
            <h3 className="font-display mb-3 text-2xl font-semibold">{t}</h3>
            <p className="text-fg/60">{d}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Services */
function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry }}
        className="group relative h-full overflow-hidden rounded-3xl border border-fg/10 bg-bg-2 p-8 transition-colors hover:border-fg/25"
        data-cursor="Explore"
      >
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: `${s.color}1a` }} />
        <div className="relative flex items-start justify-between">
          <span className="font-display text-sm text-muted">{s.no}</span>
          <span
            className="grid h-12 w-12 place-items-center rounded-full border border-fg/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent"
            style={{ backgroundColor: "transparent" }}
          >
            <ArrowUpRight className="h-5 w-5 transition-colors" style={{ color: s.color }} />
          </span>
        </div>
        <div className="relative mt-16">
          <div className="mb-5 h-1 w-10 rounded-full transition-all duration-500 group-hover:w-24" style={{ background: s.color }} />
          <h3 className="font-display mb-3 text-2xl font-semibold">{s.title}</h3>
          <p className="mb-6 text-fg/60">{s.desc}</p>
          <div className="flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <span key={t} className="rounded-full border border-fg/10 px-3 py-1 text-xs text-fg/70">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionLabel>What we do</SectionLabel>
      <div className="mb-16 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2 className="font-display text-3xl leading-[1.08] font-semibold md:text-5xl">
          <SplitText text="Everything your brand needs to" /> <SplitText text="win online." className="text-gradient" delay={0.3} />
        </h2>
        <FadeUp>
          <p className="text-lg text-fg/60">
            Pick one service or let us run the whole engine. Either way you get senior talent, fast turnaround, and work
            that moves the numbers.
          </p>
        </FadeUp>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.title} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Work */
function WorkCard({ w, i }: { w: (typeof work)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <motion.a
      ref={ref}
      href="#contact"
      data-cursor="View"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease }}
      className={`group block ${i % 2 ? "md:mt-32" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
        <motion.div
          style={{ y, backgroundColor: w.from }}
          className="absolute -inset-[12%] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        >
          {/* abstract art */}
          <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/30 transition-transform duration-1000 group-hover:scale-125" />
          <div className="absolute left-1/2 top-1/2 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[30%] bg-black/30 backdrop-blur-sm transition-transform duration-1000 group-hover:rotate-[135deg]" />
          <div className="font-display absolute bottom-[18%] left-[16%] text-6xl font-semibold text-white/20 md:text-8xl">{w.title.split(" ")[0]}</div>
        </motion.div>
        <div className="absolute left-5 top-5 rounded-full bg-black/40 px-4 py-2 text-xs backdrop-blur">{w.cat}</div>
        <div className="absolute bottom-5 left-5 right-5 translate-y-4 rounded-2xl bg-black/50 p-4 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-xs uppercase tracking-widest text-fg/60">Result</span>
          <div className="font-display text-xl font-semibold text-accent">{w.result}</div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold md:text-2xl">{w.title}</h3>
        <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
      </div>
    </motion.a>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionLabel>Selected work</SectionLabel>
      <h2 className="font-display mb-20 text-3xl leading-[1.08] font-semibold md:text-5xl">
        <SplitText text="Work that" /> <SplitText text="performs." className="text-outline" delay={0.2} />
      </h2>
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {work.map((w, i) => (
          <WorkCard key={w.title} w={w} i={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Process (horizontal scroll) */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 32));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-12 w-full max-w-7xl px-5 md:px-8">
          <SectionLabel>How we work</SectionLabel>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl leading-[1.08] font-semibold md:text-5xl">
              <SplitText text="From idea to impact." />
            </h2>
            <div className="hidden h-px w-60 bg-fg/10 md:block">
              <motion.div style={{ width: bar }} className="h-px bg-accent" />
            </div>
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {process.map((p) => (
            <div
              key={p.step}
              className="relative flex h-[52vh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-fg/10 bg-bg-2 p-8 md:w-[38vw] md:p-12"
            >
              <span className="font-display absolute -right-6 -top-10 text-[14rem] leading-none font-semibold text-fg/[0.04]">
                {p.step}
              </span>
              <span className="font-display text-accent">Step {p.step}</span>
              <div>
                <h3 className="font-display mb-4 text-3xl font-semibold md:text-4xl">{p.title}</h3>
                <p className="max-w-md text-lg text-fg/60">{p.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex h-[52vh] w-[82vw] shrink-0 flex-col items-start justify-center rounded-3xl bg-accent p-8 text-white md:w-[38vw] md:p-12">
            <h3 className="font-display mb-6 text-3xl font-semibold md:text-4xl">Ready when you are.</h3>
            <a href="#contact" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
              Book a free strategy call →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Stats */
export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-fg/10 bg-fg/10 md:grid-cols-4">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08} className="bg-bg p-8 md:p-10">
            <div className="font-display text-4xl font-semibold md:text-6xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-sm text-fg/60">{s.label}</p>
          </FadeUp>
        ))}
      </div>
      <div className="pause-hover mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted">Trusted by ambitious brands</p>
        <div className="flex w-max animate-marquee [--speed:40s]">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="font-display px-10 text-3xl font-semibold text-fg/30 transition-colors hover:text-fg">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Testimonials */
export function Testimonials() {
  const row = (list: typeof testimonials, reverse = false) => (
    <div className={`flex w-max gap-5 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} [--speed:60s]`}>
      {[...list, ...list].map((t, i) => (
        <figure key={i} className="w-[340px] shrink-0 rounded-3xl border border-fg/10 bg-bg-2 p-7 md:w-[420px]">
          <div className="mb-4 flex gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mb-6 text-base leading-relaxed text-fg/85">“{t.quote}”</blockquote>
          <figcaption className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-2 font-semibold text-white">
              {t.name[0]}
            </span>
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className="text-sm text-muted">{t.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>Client love</SectionLabel>
        <h2 className="font-display mb-16 text-3xl leading-[1.08] font-semibold md:text-5xl">
          <SplitText text="Don't take our" /> <SplitText text="word for it." className="text-gradient" delay={0.2} />
        </h2>
      </div>
      <div className="pause-hover space-y-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {row(testimonials.slice(0, 3).concat(testimonials.slice(3)))}
        {row(testimonials.slice(3).concat(testimonials.slice(0, 3)), true)}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- FAQ */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto grid max-w-7xl gap-12 px-5 py-28 md:grid-cols-[1fr_1.4fr] md:px-8 md:py-36">
      <div>
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="font-display text-3xl leading-[1.08] font-semibold md:text-5xl">
          <SplitText text="Questions? Answered." />
        </h2>
      </div>
      <div className="divide-y divide-fg/10 border-y border-fg/10">
        {faqs.map((f, i) => (
          <FadeUp key={f.q} delay={i * 0.05} y={20}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-7 text-left">
              <span className="font-display text-lg font-semibold md:text-xl">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${
                  open === i ? "border-accent bg-accent text-white" : "border-fg/15"
                }`}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-fg/60">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
