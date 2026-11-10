"use client";
import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { site } from "@/lib/site";

export const ease = [0.22, 1, 0.36, 1] as const;

/* First-load flag: the preloader only runs once per visit. */
let firstLoad = true;
export function consumeFirstLoad() {
  const v = firstLoad;
  firstLoad = false;
  return v;
}
export function isFirstLoad() {
  return firstLoad;
}
/** Extra delay so intro animations play after the preloader on the first visit. */
export function useIntroDelay() {
  const [d] = useState(() => (firstLoad ? 2.5 : 0.8));
  return d;
}

/** Word-by-word masked reveal. Wrap words in *stars* to make them italic ember. */
export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  animateNow = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateNow?: boolean;
}) {
  const words = text.split(" ");
  const anim = animateNow
    ? { animate: { y: "0%", rotate: 0 } }
    : { whileInView: { y: "0%", rotate: 0 }, viewport: { once: true, margin: "-8% 0px" } };
  return (
    <span className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((raw, i) => {
        const em = raw.startsWith("*");
        const w = raw.replace(/\*/g, "");
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-top" aria-hidden>
            <motion.span
              className={`inline-block ${em ? "italic text-ember" : ""}`}
              initial={{ y: "110%", rotate: 3 }}
              {...anim}
              transition={{ duration: 1, ease, delay: delay + i * stagger }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 40,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Button({
  href,
  children,
  variant = "ink",
}: {
  href: string;
  children: ReactNode;
  variant?: "ink" | "outline" | "cream";
}) {
  const styles = {
    ink: "bg-ink text-cream",
    outline: "border border-ink/25 text-ink hover:text-cream",
    cream: "bg-cream text-ink",
  }[variant];
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium transition-colors duration-500 ${styles} hover:text-cream`}
      >
        <span className="absolute inset-0 translate-y-full rounded-full bg-ember transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
        <span className="relative flex items-center gap-3">{children}</span>
      </Link>
    </Magnetic>
  );
}

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <FadeUp y={20} className={`mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] ${light ? "text-cream/60" : "text-muted"}`}>
      <span className="h-2 w-2 rounded-full bg-ember" />
      {children}
    </FadeUp>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  if (site.logo)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={site.logo} alt={site.name} className={`h-9 w-auto ${className}`} />;
  return (
    <span className={`font-serif text-[2rem] leading-none ${className}`}>
      {site.name}
      <span className="text-ember">.</span>
    </span>
  );
}

export function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

/** Animated ember "spark" — the idea. */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="46" y="4" width="8" height="40" rx="4" fill="currentColor" transform={`rotate(${i * 45} 50 50)`} />
      ))}
    </motion.svg>
  );
}

export function PageHero({ label, title, intro }: { label: string; title: string; intro?: string }) {
  const d = useIntroDelay();
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-40 md:px-8 md:pb-24 md:pt-52">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="font-serif max-w-5xl text-6xl leading-[0.95] md:text-[8rem]">
        <SplitText text={title} animateNow delay={d} />
      </h1>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d + 0.45, duration: 0.9, ease }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-ink/70"
        >
          {intro}
        </motion.p>
      )}
    </section>
  );
}
