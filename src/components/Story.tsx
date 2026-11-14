"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Globe, Laptop, Moon, Quote, Users, type LucideIcon } from "lucide-react";
import { founders, story } from "@/lib/site";
import { FadeUp, SectionLabel, SplitText, ease } from "./ui";

const icons: Record<string, LucideIcon> = { laptop: Laptop, moon: Moon, users: Users, globe: Globe };

/* ---------------------------------------------------------- Our story (journey) */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* left: sticky intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>The journey</SectionLabel>
          <h2 className="font-display text-3xl leading-[1.08] font-semibold md:text-5xl">
            <SplitText text="From one laptop" /> <SplitText text="to 50+ people." className="text-gradient" delay={0.2} />
          </h2>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-fg/60">{story.intro}</p>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-10 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10">
            {[
              ["7+", "Years"],
              ["50+", "People"],
              ["500+", "Projects"],
            ].map(([v, l]) => (
              <div key={l} className="bg-bg p-5">
                <div className="font-display text-2xl font-semibold md:text-3xl">{v}</div>
                <div className="mt-1 text-xs tracking-widest text-muted uppercase">{l}</div>
              </div>
            ))}
          </FadeUp>
        </div>

        {/* right: chapters on a progress rail */}
        <div ref={ref} className="relative pl-14 md:pl-20">
          <div className="absolute top-2 bottom-2 left-[19px] w-px bg-fg/10 md:left-[27px]">
            <motion.div style={{ height: line }} className="w-px bg-gradient-to-b from-accent to-accent-2" />
          </div>
          <ol className="space-y-8 md:space-y-10">
            {story.chapters.map((c, i) => {
              const Icon = icons[c.icon] ?? Laptop;
              return (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.9, ease }}
                  className="relative"
                >
                  <span className="absolute top-6 -left-14 grid h-10 w-10 place-items-center rounded-full border border-accent/50 bg-bg text-accent md:-left-20 md:h-14 md:w-14">
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </span>
                  <div className="group relative overflow-hidden rounded-3xl border border-fg/10 bg-bg-2 p-7 transition-colors hover:border-accent/40 md:p-9">
                    <span className="font-display pointer-events-none absolute -top-6 -right-2 text-[8rem] leading-none font-semibold text-fg/[0.04] transition-colors group-hover:text-accent/10">
                      0{i + 1}
                    </span>
                    <span className="relative inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold tracking-widest text-accent uppercase">
                      {c.year}
                    </span>
                    <h3 className="font-display relative mt-5 mb-3 text-2xl font-semibold md:text-3xl">{c.title}</h3>
                    <p className="relative max-w-lg leading-relaxed text-fg/65">{c.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* the name */}
      <FadeUp className="relative mt-24 overflow-hidden rounded-[2rem] border border-fg/10 bg-bg-2 p-8 md:p-14">
        <div aria-hidden className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/20 blur-[100px]" />
        <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
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

/* ---------------------------------------------------------- Founders (story, no photos) */
export function Founders() {
  return (
    <section id="founders" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionLabel>The founders</SectionLabel>
      <h2 className="font-display mb-16 max-w-4xl text-3xl leading-[1.08] font-semibold md:text-5xl">
        <SplitText text="Strong skills." /> <SplitText text="Strong relationships." className="text-outline" delay={0.2} />
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {founders.map((f, i) => (
          <motion.article
            key={f.role}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-fg/10 bg-bg-2 p-8 md:p-10"
          >
            <div aria-hidden className={`absolute -top-24 h-64 w-64 rounded-full bg-accent/15 blur-[90px] ${i ? "-left-24" : "-right-24"}`} />
            <div className="relative flex items-center gap-4">
              <span className="font-display grid h-14 w-14 place-items-center rounded-2xl bg-accent text-2xl font-semibold text-white">
                {(f.name || f.initial)[0]}
              </span>
              <div>
                {f.name && <div className="font-display text-xl font-semibold">{f.name}</div>}
                <div className={f.name ? "text-sm text-accent" : "font-display text-lg font-semibold"}>{f.role}</div>
              </div>
            </div>
            <blockquote className="relative mt-8">
              <Quote className="mb-3 h-7 w-7 text-accent" />
              <p className="font-display text-xl leading-snug md:text-2xl">{f.quote}</p>
            </blockquote>
            <div className="relative mt-6 space-y-4 text-fg/65">
              {f.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="relative mt-auto flex flex-wrap gap-2 pt-8">
              {f.tags.map((t) => (
                <span key={t} className="rounded-full border border-fg/10 px-3 py-1 text-xs text-fg/70">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
