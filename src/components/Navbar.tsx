"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, site } from "@/lib/site";
import { Logo, Magnetic, ease, SocialIcon } from "./ui";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200 && !open);
    setScrolled(v > 40);
  });

  const links = nav.filter((n) => n.href !== "/contact");

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2.5 pl-6 pr-2.5 transition-all duration-500 ${
            scrolled ? "border border-ink/10 bg-cream/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,.25)] backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <Link href="/" aria-label="Home" className="relative z-[60]">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((n) => {
              const active = pathname === n.href;
              return (
                <Link key={n.href} href={n.href} className="group relative overflow-hidden rounded-full px-4 py-2 text-sm">
                  {active && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink/[0.07]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  <span className="relative block transition-transform duration-300 group-hover:-translate-y-[150%]">{n.label}</span>
                  <span className="absolute inset-x-4 top-1/2 block translate-y-[150%] text-ember transition-transform duration-300 group-hover:-translate-y-1/2">
                    {n.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group relative inline-flex overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-ember transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative">Start a project</span>
                </Link>
              </Magnetic>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`relative z-[60] grid h-11 w-11 place-items-center rounded-full md:hidden ${open ? "bg-cream" : "bg-ink"}`}
              aria-label="Menu"
            >
              <span className={`absolute h-px w-5 transition ${open ? "rotate-45 bg-ink" : "-translate-y-1 bg-cream"}`} />
              <span className={`absolute h-px w-5 transition ${open ? "-rotate-45 bg-ink" : "translate-y-1 bg-cream"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-cream md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <nav className="flex flex-col gap-1">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`font-serif text-6xl ${pathname === n.href ? "italic text-ember" : ""}`}
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-4 text-sm text-cream/60">
              <p>{site.email}</p>
              <div className="flex gap-3">
                {Object.entries(site.socials).map(([k, v]) => (
                  <a key={k} href={v} aria-label={k} className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream">
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
