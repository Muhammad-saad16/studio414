"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Code2, Megaphone, Palette, PenTool, Search, Share2 } from "lucide-react";
import { services, site } from "@/lib/site";
import { Button, ease } from "./ui";

const words = ["brands", "growth", "rankings", "stories", "revenue"];
const icons = [PenTool, Palette, Megaphone, Search, Share2, Code2];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  const d = 2.7; // wait for preloader

  return (
    <>
      <section id="top" className="relative flex min-h-[92svh] items-center overflow-hidden pt-32 pb-10">
        <div className="grid-bg pointer-events-none absolute inset-0" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d, duration: 0.8, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-fg/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Creative &amp; growth agency
          </motion.div>

          <h1 className="font-display text-[clamp(44px,7vw,104px)] leading-[1.02] font-semibold">
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: d, duration: 1, ease }}
              >
                We craft bold
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-flex items-baseline justify-center gap-[0.25em]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: d + 0.12, duration: 1, ease }}
              >
                <span className="relative inline-flex h-[1.1em] overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={words[i]}
                      className="inline-block text-accent"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      {words[i]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span>that scale.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.4, duration: 0.9, ease }}
            className="mt-8 max-w-xl text-base leading-relaxed text-fg/60 md:text-lg"
          >
            Graphic design, branding, performance marketing and SEO — under one roof, obsessed with one metric:{" "}
            <span className="text-fg">your growth.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.55, duration: 0.9, ease }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button href="#contact">
              Start a project <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Button>
            <Button href="#work" variant="ghost">
              See our work
            </Button>
          </motion.div>
        </div>
      </section>

      <Showcase delay={d + 0.7} />
    </>
  );
}

/** Framed "studio board" that grows to full width as you scroll. */
function Showcase({ delay }: { delay: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const width = useTransform(scrollYProgress, [0, 0.6], ["64vw", "94vw"]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [24, 14]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [18, 0]);
  const tilesY = useTransform(scrollYProgress, [0.3, 1], [40, -20]);

  return (
    <section ref={ref} className="relative h-[170vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden [perspective:1400px]">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 1.1, ease }}
          style={{ width, borderRadius: radius, rotateX }}
          className="relative aspect-[1.58/1] max-h-[86vh] min-w-[88vw] overflow-hidden border border-fg/10 bg-bg-2 md:min-w-0"
        >
          {/* window chrome */}
          <div className="flex items-center justify-between border-b border-fg/[0.06] px-4 py-3 md:px-5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-fg/40">{site.name} · Studio</span>
            <span className="w-12" />
          </div>

          <div className="grid h-[calc(100%-45px)] grid-cols-[1fr] gap-3 p-3 md:grid-cols-[0.9fr_2fr] md:gap-4 md:p-5">
            {/* left: brief card */}
            <div className="hidden flex-col justify-between rounded-xl border border-fg/[0.06] bg-fg/[0.015] p-5 md:flex">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-fg/40">Current brief</p>
                <p className="font-display mt-4 text-2xl leading-tight font-semibold lg:text-3xl">
                  Launch a brand people <span className="text-accent">remember.</span>
                </p>
              </div>
              <div className="space-y-3">
                {["Strategy", "Identity", "Campaign", "Launch"].map((t, k) => (
                  <div key={t} className="flex items-center gap-3 text-sm text-fg/70">
                    <span className={`grid h-5 w-5 place-items-center rounded-md text-[10px] ${k < 3 ? "bg-accent text-white" : "border border-fg/15"}`}>
                      {k < 3 ? "✓" : ""}
                    </span>
                    {t}
                  </div>
                ))}
                <div className="h-1.5 overflow-hidden rounded-full bg-fg/10">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1.6, ease, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* right: service tiles */}
            <motion.div style={{ y: tilesY }} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {services.map((s, k) => {
                const Icon = icons[k % icons.length];
                const solid = k === 0 || k === 4;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease, delay: k * 0.07 }}
                    className={`flex flex-col justify-between rounded-xl p-4 md:p-5 ${
                      solid ? "bg-accent text-white" : "border border-fg/[0.06] bg-fg/[0.015]"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-lg ${solid ? "bg-white/15" : ""}`}
                      style={solid ? undefined : { backgroundColor: `${s.color}26`, color: s.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-base leading-tight font-semibold md:text-lg">{s.title}</p>
                      <p className={`mt-1 hidden text-xs lg:block ${solid ? "text-white/70" : "text-fg/45"}`}>{s.tags.slice(0, 2).join(" · ")}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
