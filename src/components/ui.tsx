"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useInView, animate } from "motion/react";
import { useEffect } from "react";
import { site } from "@/lib/site";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Word-by-word masked reveal */
export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
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
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Element that gets pulled toward the cursor */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
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
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-black"
      : "border border-white/20 text-fg hover:text-black";
  return (
    <Magnetic>
      <a href={href} className={`${base} ${styles}`}>
        <span
          className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 ${
            variant === "primary" ? "bg-white" : "bg-accent"
          }`}
        />
        <span className="relative flex items-center gap-3">{children}</span>
      </a>
    </Magnetic>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <FadeUp className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
      <span className="h-px w-10 bg-accent" />
      {children}
    </FadeUp>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2.2,
      ease,
      onUpdate: (v) => (node.textContent = Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  if (site.logo)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={site.logo} alt={site.name} className={`h-8 w-auto ${className}`} />;
  return (
    <span className={`font-display flex items-center gap-2 text-xl font-bold tracking-tight ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-accent text-black">
        <span className="text-base font-extrabold">{site.name[0]}</span>
      </span>
      <span>
        {site.name}
        <span className="text-accent">.</span>
      </span>
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
    behance: <path d="M3 7h5a2.5 2.5 0 0 1 0 5H3zm0 5h5.5a2.5 2.5 0 0 1 0 5H3zM15 8h5M14 14h7a3.5 3.5 0 1 0-1 3" />,
    x: <path d="M4 4l16 16M20 4L4 20" />,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
