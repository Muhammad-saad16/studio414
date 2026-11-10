"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button, ease } from "./ui";

const words = ["brands", "growth", "rankings", "stories", "revenue"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const bx = useTransform(smx, (v) => v * 60);
  const by = useTransform(smy, (v) => v * 60);
  const bx2 = useTransform(smx, (v) => v * -40);
  const by2 = useTransform(smy, (v) => v * -40);

  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  const d = 2.7; // wait for preloader

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* background */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      {/* solid floating shapes — shades of one colour */}
      <motion.div style={{ x: bx, y: by }} className="pointer-events-none absolute right-[7%] top-[22%] hidden md:block">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: d + 0.4, type: "spring", stiffness: 120, damping: 12 }}
          className="h-32 w-32 rounded-full bg-accent lg:h-40 lg:w-40"
        />
      </motion.div>
      <motion.div style={{ x: bx2, y: by2 }} className="pointer-events-none absolute right-[23%] top-[15%] hidden md:block">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 315 }}
          transition={{ scale: { delay: d + 0.55, type: "spring", stiffness: 120, damping: 12 }, rotate: { delay: d + 0.55, duration: 30, repeat: Infinity, ease: "linear" } }}
          className="h-16 w-16 rounded-2xl bg-accent-2 lg:h-20 lg:w-20"
        />
      </motion.div>
      <motion.div style={{ x: bx2, y: by }} className="pointer-events-none absolute bottom-[28%] right-[5%] hidden md:block">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, y: [0, -14, 0] }}
          transition={{ scale: { delay: d + 0.7, type: "spring", stiffness: 120, damping: 12 }, y: { delay: d + 1, duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          className="h-10 w-10 rounded-full bg-accent-3"
        />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d, duration: 0.8, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/5 px-4 py-2 text-xs text-fg/80 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Now booking projects for 2027
        </motion.div>

        <h1 className="font-display text-[11vw] leading-[0.98] font-semibold md:text-[6.5vw] xl:text-[6.25rem]">
          {["We craft", "bold"].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: d + li * 0.12, duration: 1, ease }}
              >
                {line}
              </motion.span>
              {li === 1 && (
                <span className="relative ml-[0.25em] inline-flex h-[1.05em] overflow-hidden align-bottom">
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
              )}
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span
              className="inline-flex items-center gap-[0.2em]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: d + 0.24, duration: 1, ease }}
            >
              <span className="text-outline">that</span> scale.
              <motion.span
                className="hidden h-[0.75em] w-[0.75em] place-items-center rounded-full bg-accent text-white md:grid"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              >
                <Sparkles className="h-[0.4em] w-[0.4em]" strokeWidth={2.5} />
              </motion.span>
            </motion.span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.5, duration: 0.9, ease }}
            className="max-w-xl text-base leading-relaxed text-fg/65 md:text-lg"
          >
            A full-service creative & growth agency. Graphic design, branding, performance marketing and SEO —
            under one roof, obsessed with one metric: <span className="text-fg">your growth.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.65, duration: 0.9, ease }}
            className="flex flex-wrap gap-4"
          >
            <Button href="#contact">
              Start a project <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Button>
            <Button href="#work" variant="ghost">
              See our work
            </Button>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
