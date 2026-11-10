"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { brand, processSteps, services, site, values } from "@/lib/site";
import { Button, FadeUp, SectionLabel, Spark, SplitText, ease, useIntroDelay } from "./ui";

/* ---------------------------------------------------------------- Hero */
export function Hero() {
  const d = useIntroDelay();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const gx = useSpring(useTransform(mx, (v) => `${v * 100}%`), { stiffness: 50, damping: 20 });
  const gy = useSpring(useTransform(my, (v) => `${v * 100}%`), { stiffness: 50, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-36"
    >
      {/* ember glow that follows the mouse */}
      <motion.div
        className="pointer-events-none absolute h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/25 blur-[120px]"
        style={{ left: gx, top: gy }}
      />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d, duration: 0.8, ease }}
          className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span className="h-2 w-2 rounded-full bg-ember" />
          Creative advertising company
        </motion.div>

        <h1 className="font-serif text-[15vw] leading-[0.88] md:text-[10.5vw] xl:text-[10rem]">
          <SplitText text="Where ideas" animateNow delay={d} stagger={0.08} />
          <br />
          <span className="inline-flex items-center gap-[0.15em]">
            <SplitText text="are born," animateNow delay={d + 0.15} stagger={0.08} />
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: d + 0.6, type: "spring", stiffness: 120, damping: 12 }}
              className="inline-block"
            >
              <Spark className="h-[0.6em] w-[0.6em] text-ember" />
            </motion.span>
          </span>
          <br />
          <SplitText text="and brands are *made.*" animateNow delay={d + 0.3} stagger={0.08} />
        </h1>

        <div className="mt-14 grid gap-10 border-t border-ink/10 pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.7, duration: 0.9, ease }}
            className="max-w-md text-lg leading-relaxed text-ink/70"
          >
            {brand.whatWeAre}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.85, duration: 0.9, ease }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="/contact">
              Start a project <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Button>
            <Button href="/services" variant="outline">
              Our services
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.2 }}
        className="absolute right-6 top-32 hidden flex-col items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted lg:flex"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- Marquee */
export function Marquee() {
  const items = services.map((s) => s.title);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  return (
    <section className="overflow-hidden bg-ink py-7 text-cream">
      <motion.div style={{ x }}>
        <div className="flex w-max animate-marquee [--speed:40s]">
          {[...items, ...items, ...items, ...items].map((t, i) => (
            <span key={i} className={`font-serif flex items-center gap-10 pr-10 text-5xl whitespace-nowrap md:text-7xl ${i % 2 ? "italic text-cream/50" : ""}`}>
              {t}
              <Spark className="h-8 w-8 text-ember md:h-10 md:w-10" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- Intro (scroll-lit text) */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {children}
    </motion.span>
  );
}

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = brand.nameMeaning.split(" ");
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-44">
      <SectionLabel>The name</SectionLabel>
      <div ref={ref} className="font-serif max-w-6xl text-4xl leading-[1.1] md:text-7xl">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </div>
      <FadeUp className="mt-14">
        <Link href="/about" className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-medium">
          More about us
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </Link>
      </FadeUp>
    </section>
  );
}

/* ---------------------------------------------------------------- Services list with hover preview */
export function ServicesList() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionLabel>What we do</SectionLabel>
          <h2 className="font-serif text-6xl leading-[0.95] md:text-8xl">
            <SplitText text="Six ways we" />
            <br />
            <SplitText text="build *brands.*" delay={0.1} />
          </h2>
        </div>
        <FadeUp>
          <Button href="/services" variant="outline">
            All services <ArrowUpRight className="h-4 w-4" />
          </Button>
        </FadeUp>
      </div>

      <div className="border-t border-ink/15" onMouseLeave={() => setActive(null)}>
        {services.map((s, i) => (
          <FadeUp key={s.slug} delay={i * 0.05} y={30}>
            <Link
              href={`/services#${s.slug}`}
              onMouseEnter={() => setActive(i)}
              data-cursor="View"
              className="group relative flex flex-col gap-4 overflow-hidden border-b border-ink/15 py-8 md:flex-row md:items-center md:justify-between md:py-10"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <span className="relative flex items-baseline gap-6 px-2 transition-colors duration-500 group-hover:text-cream md:px-6">
                <span className="text-sm text-muted">0{i + 1}</span>
                <span className="font-serif text-4xl transition-transform duration-500 group-hover:translate-x-4 md:text-6xl">
                  {s.title}
                </span>
              </span>
              <span className="relative flex flex-wrap gap-2 px-2 md:max-w-md md:justify-end md:px-6">
                {s.items.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70 transition-colors duration-500 group-hover:border-cream/20 group-hover:text-cream/80"
                  >
                    {t}
                  </span>
                ))}
              </span>
              <motion.span
                className="absolute right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ember text-cream md:grid"
                initial={false}
                animate={{ scale: active === i ? 1 : 0, rotate: active === i ? 0 : -90 }}
                transition={{ duration: 0.4, ease }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.span>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Values: stacked sticky cards */
export function Values() {
  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <SectionLabel light>What we stand for</SectionLabel>
            <h2 className="font-serif text-6xl leading-[0.95] md:text-8xl">
              <SplitText text="Five values," />
              <br />
              <SplitText text="*one standard.*" delay={0.1} />
            </h2>
          </div>
          <FadeUp>
            <p className="max-w-md text-lg text-cream/60 md:ml-auto">{brand.mission}</p>
          </FadeUp>
        </div>
        <div className="relative">
          {values.map((v, i) => (
            <div key={v.title} className="sticky" style={{ top: `${110 + i * 26}px` }}>
              <FadeUp y={60}>
                <div
                  className="mb-6 grid gap-6 rounded-[2rem] border border-cream/10 p-8 md:grid-cols-[auto_1fr_1.3fr] md:items-center md:gap-14 md:p-12"
                  style={{ background: i % 2 ? "#1c1b19" : "#232220" }}
                >
                  <span className="font-serif text-7xl italic text-ember md:text-8xl">0{i + 1}</span>
                  <h3 className="font-serif text-5xl md:text-6xl">{v.title}</h3>
                  <p className="text-lg leading-relaxed text-cream/65">{v.desc}</p>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Process: horizontal scroll */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-14 w-full max-w-7xl px-5 md:px-8">
          <SectionLabel>How we work</SectionLabel>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-6xl leading-[0.95] md:text-8xl">
              <SplitText text="From brief" /> <SplitText text="to *delivery.*" delay={0.1} />
            </h2>
            <div className="hidden h-px w-56 bg-ink/15 md:block">
              <motion.div style={{ width: bar }} className="h-px bg-ember" />
            </div>
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-5 pl-5 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {processSteps.map((step, i) => (
            <div
              key={step}
              className="group relative flex h-[46vh] w-[75vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-ink/10 bg-cream-2 p-8 transition-colors duration-500 hover:bg-ink hover:text-cream md:w-[30vw] md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm text-muted">Step 0{i + 1}</span>
                <Spark className="h-8 w-8 text-ember opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <span className="font-serif absolute -bottom-10 -right-2 text-[12rem] leading-none text-ink/[0.05] transition-colors duration-500 group-hover:text-cream/[0.06]">
                0{i + 1}
              </span>
              <h3 className="font-serif relative text-6xl md:text-7xl">
                {i % 2 ? <em className="text-ember">{step}</em> : step}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Markets */
export function Markets() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-32 pt-10 md:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        <FadeUp className="rounded-[2rem] bg-ember p-10 text-cream md:p-14">
          <p className="mb-10 text-xs uppercase tracking-[0.25em] text-cream/70">Who we serve</p>
          <p className="font-serif text-4xl leading-tight md:text-5xl">{brand.clients}</p>
        </FadeUp>
        <FadeUp delay={0.1} className="flex flex-col justify-between rounded-[2rem] border border-ink/10 bg-cream-2 p-10 md:p-14">
          <p className="mb-10 text-xs uppercase tracking-[0.25em] text-muted">Where we work</p>
          <div className="font-serif text-6xl leading-none md:text-8xl">
            <span className="block">US</span>
            <span className="block italic text-ember">& UK</span>
          </div>
          <p className="mt-8 text-ink/60">Serving clients across the {site.markets}.</p>
        </FadeUp>
      </div>
    </section>
  );
}
