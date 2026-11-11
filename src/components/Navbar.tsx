"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, site } from "@/lib/site";
import { Logo, Magnetic, ease, SocialIcon } from "./ui";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const active = (href: string) => path === href || path.startsWith(href + "/");

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200 && !open);
    setScrolled(v > 40);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "border border-fg/10 bg-bg/70 backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.filter((n) => n.href !== "/contact").map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`group relative overflow-hidden rounded-full px-4 py-2 text-sm hover:text-fg ${active(n.href) ? "text-accent" : "text-fg/80"}`}
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">{n.label}</span>
                <span className="absolute inset-x-4 top-full block text-accent transition-transform duration-300 group-hover:-translate-y-full">
                  {n.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle className="relative z-[60]" />
            <div className="hidden md:block">
              <Magnetic>
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-2"
                >
                  Let&apos;s talk
                </Link>
              </Magnetic>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-fg/15 md:hidden"
              aria-label="Menu"
            >
              <span className={`absolute h-px w-5 bg-fg transition ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 bg-fg transition ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <nav className="flex flex-col gap-2">
              {[{ label: "Home", href: "/" }, ...nav].map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`font-display text-5xl font-semibold ${path === n.href ? "text-accent" : ""}`}
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-3 text-sm text-muted">
              <p>{site.email}</p>
              <div className="flex gap-3">
                {Object.entries(site.socials).map(([k, v]) => (
                  <a key={k} href={v} aria-label={k} className="grid h-10 w-10 place-items-center rounded-full border border-fg/15 text-fg">
                    <SocialIcon name={k} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
