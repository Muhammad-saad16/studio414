"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { nav, services, site } from "@/lib/site";
import { Logo, Magnetic, SocialIcon, SplitText } from "./ui";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden rounded-t-[2.5rem] bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-cream/10 pb-16 md:flex-row md:items-end">
          <h2 className="font-serif text-5xl leading-[0.95] md:text-8xl">
            <SplitText text="Got an idea?" />
            <br />
            <SplitText text="Let's make it *real.*" delay={0.15} />
          </h2>
          <Magnetic>
            <Link
              href="/contact"
              data-cursor="Talk"
              className="grid h-36 w-36 place-items-center rounded-full bg-ember text-center text-sm font-medium text-cream transition-transform duration-500 hover:scale-110 md:h-44 md:w-44"
            >
              <span className="flex flex-col items-center gap-1">
                <ArrowUpRight className="h-6 w-6" />
                Start a project
              </span>
            </Link>
          </Magnetic>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-cream/60">{site.tagline}.</p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block text-xl hover:text-ember">
              {site.email}
            </a>
            <div className="mt-6 flex gap-3">
              {Object.entries(site.socials).map(([k, v]) => (
                <a
                  key={k}
                  href={v}
                  aria-label={k}
                  className="grid h-11 w-11 place-items-center rounded-full border border-cream/15 transition-all hover:-translate-y-1 hover:border-ember hover:bg-ember"
                >
                  <SocialIcon name={k} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-cream/40">Pages</h4>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-cream/70 transition-colors hover:text-ember">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-cream/40">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-cream/70 transition-colors hover:text-ember">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <motion.div
        style={{ y }}
        className="font-serif pointer-events-none select-none whitespace-nowrap text-center text-[30vw] leading-[0.75] text-cream/[0.07]"
      >
        {site.name}
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-cream/10 px-5 py-6 text-sm text-cream/40 md:flex-row md:px-8">
        <span>
          © {site.year} {site.name}. All rights reserved.
        </span>
        <span>Serving the {site.markets}</span>
      </div>
    </footer>
  );
}
