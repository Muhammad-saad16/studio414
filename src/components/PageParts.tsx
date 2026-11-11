"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { process, slugify, type Service } from "@/lib/site";
import { Button, FadeUp, SectionLabel, SplitText, ease } from "./ui";

/* ---------------------------------------------------------- Inner-page hero */
export function PageHeader({
  label,
  title,
  highlight,
  intro,
  crumbs = [],
}: {
  label: string;
  title: string;
  highlight?: string;
  intro?: string;
  crumbs?: { label: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted"
        >
          <Link href="/" className="hover:text-accent">Home</Link>
          {crumbs.map((c) => (
            <span key={c.href} className="flex items-center gap-2">
              <span>/</span>
              <Link href={c.href} className="hover:text-accent">{c.label}</Link>
            </span>
          ))}
          <span>/</span>
          <span className="text-fg">{label}</span>
        </motion.nav>
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-display max-w-5xl text-4xl leading-[1.02] font-semibold tracking-tight md:text-7xl">
          <SplitText text={title} />
          {highlight && (
            <>
              {" "}
              <SplitText text={highlight} className="text-gradient" delay={0.2} />
            </>
          )}
        </h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/65"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Closing call-to-action band */
export function CTA({ title = "Have an idea?", highlight = "Let's make it a brand." }: { title?: string; highlight?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <FadeUp className="relative overflow-hidden rounded-[2rem] bg-accent p-10 text-white md:p-16">
        <div aria-hidden className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full border border-white/20" />
        <div aria-hidden className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full border border-white/20" />
        <h2 className="font-display relative max-w-3xl text-3xl leading-[1.08] font-semibold md:text-6xl">
          {title} <span className="opacity-70">{highlight}</span>
        </h2>
        <div className="relative mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold tracking-wider text-white uppercase"
          >
            Start a project <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center rounded-full border border-white/40 px-7 py-4 text-sm font-semibold tracking-wider uppercase"
          >
            See our work
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}

/* ---------------------------------------------------------- Service detail body */
export function ServiceDetail({ service, others }: { service: Service; others: Service[] }) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-[1fr_1.1fr] md:px-8">
        <FadeUp>
          <div className="sticky top-28 overflow-hidden rounded-3xl border border-fg/10 bg-bg-2 p-8 md:p-10">
            <div className="mb-8 h-1.5 w-16 rounded-full" style={{ background: service.color }} />
            <span className="font-display text-sm text-muted">Service {service.no}</span>
            <p className="font-display mt-4 text-2xl leading-snug md:text-3xl">{service.desc}</p>
            <div className="mt-10">
              <Button href="/contact">
                Start with {service.title} <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </FadeUp>
        <div>
          <SectionLabel>What&apos;s included</SectionLabel>
          <ul className="divide-y divide-fg/10 border-y border-fg/10">
            {service.tags.map((t, i) => (
              <FadeUp key={t} delay={i * 0.05} y={20}>
                <li className="flex items-center gap-5 py-6">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: service.color }}
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="font-display text-xl font-semibold md:text-2xl">{t}</span>
                </li>
              </FadeUp>
            ))}
          </ul>

          <div className="mt-20">
            <SectionLabel>How it runs</SectionLabel>
            <ol className="grid gap-4 sm:grid-cols-2">
              {process.map((p, i) => (
                <FadeUp key={p.step} delay={i * 0.05} className="rounded-2xl border border-fg/10 p-6">
                  <span className="font-display text-sm text-accent">{p.step}</span>
                  <h3 className="font-display mt-2 mb-2 text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-fg/60">{p.desc}</p>
                </FadeUp>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <SectionLabel>More from Sarté</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.title}
              href={`/services/${slugify(o.title)}`}
              className="group flex items-center justify-between rounded-2xl border border-fg/10 bg-bg-2 p-6 transition-colors hover:border-fg/30"
            >
              <span>
                <span className="font-display text-xs text-muted">{o.no}</span>
                <span className="font-display block text-xl font-semibold">{o.title}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" style={{ color: o.color }} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
