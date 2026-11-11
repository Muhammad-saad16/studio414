"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { founders, story } from "@/lib/site";
import { FadeUp, SectionLabel, SplitText, ease } from "./ui";

/* ---------------------------------------------------------- Our story (journey timeline) */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionLabel>Our story</SectionLabel>
      <div className="mb-20 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <h2 className="font-display text-3xl leading-[1.08] font-semibold md:text-5xl">
          <SplitText text="It started with" /> <SplitText text="one idea." className="text-gradient" delay={0.25} />
        </h2>
        <FadeUp>
          <p className="text-lg text-fg/60">{story.intro}</p>
        </FadeUp>
      </div>

      <div ref={ref} className="relative">
        {/* progress rail */}
        <div className="absolute top-0 bottom-0 left-[11px] w-px bg-fg/10 md:left-1/2">
          <motion.div style={{ height: line }} className="w-px bg-accent" />
        </div>

        <ol className="space-y-16 md:space-y-24">
          {story.chapters.map((c, i) => {
            const right = i % 2 === 1;
            return (
              <li key={c.title} className="relative grid md:grid-cols-2 md:gap-16">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute top-1 left-0 grid h-6 w-6 place-items-center rounded-full border border-accent bg-bg md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </motion.span>
                <FadeUp className={`pl-12 md:pl-0 ${right ? "md:col-start-2" : "md:text-right"}`}>
                  <span className="font-display text-sm tracking-widest text-accent uppercase">{c.year}</span>
                  <h3 className="font-display mt-3 mb-4 text-2xl font-semibold md:text-3xl">{c.title}</h3>
                  <p className={`max-w-md text-fg/60 ${right ? "" : "md:ml-auto"}`}>{c.text}</p>
                </FadeUp>
              </li>
            );
          })}
        </ol>
      </div>

      {/* the name */}
      <FadeUp className="mt-28 overflow-hidden rounded-3xl border border-fg/10 bg-bg-2 p-8 md:p-14">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <div>
            <div className="font-display text-6xl leading-none font-semibold md:text-8xl">{story.name.word}</div>
            <div className="mt-3 text-sm tracking-[0.3em] text-muted uppercase">/ {story.name.meaning} /</div>
          </div>
          <p className="font-display text-xl leading-snug md:text-3xl">{story.name.text}</p>
        </div>
      </FadeUp>
    </section>
  );
}

/* ---------------------------------------------------------- Founders */
export function Founders() {
  return (
    <section id="founders" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionLabel>The founders</SectionLabel>
      <h2 className="font-display mb-16 text-3xl leading-[1.08] font-semibold md:text-5xl">
        <SplitText text="Strong skills." /> <SplitText text="Strong relationships." className="text-outline" delay={0.2} />
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {founders.map((f, i) => (
          <motion.article
            key={f.photo}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            className="group overflow-hidden rounded-3xl border border-fg/10 bg-bg-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={f.photo}
                alt={f.name || f.role}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-black/40 px-4 py-2 text-xs text-white backdrop-blur">
                {f.role}
              </span>
            </div>
            <div className="p-7 md:p-9">
              {f.name && <h3 className="font-display mb-1 text-2xl font-semibold">{f.name}</h3>}
              <p className={`text-sm text-accent ${f.name ? "mb-4" : "font-display mb-4 text-xl font-semibold"}`}>
                {f.role}
              </p>
              <p className="mb-6 text-fg/60">{f.bio}</p>
              <div className="flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <span key={t} className="rounded-full border border-fg/10 px-3 py-1 text-xs text-fg/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
