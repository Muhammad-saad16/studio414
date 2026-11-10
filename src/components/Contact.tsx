"use client";
import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { services, site, nav } from "@/lib/site";
import { FadeUp, Logo, Magnetic, SocialIcon, SplitText, ease } from "./ui";

export function Contact() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nCompany: ${f.get("company")}\nServices: ${picked.join(", ")}\nBudget: ${f.get("budget")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input =
    "w-full border-b border-fg/15 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-fg/30 focus:border-accent";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-5xl leading-[1] font-semibold md:text-6xl">
            <SplitText text="Let's build" /> <SplitText text="something" delay={0.15} />{" "}
            <SplitText text="iconic." className="text-gradient" delay={0.3} />
          </h2>
          <FadeUp delay={0.2} className="mt-10 space-y-6 text-fg/70">
            <p className="max-w-md text-lg">Tell us about your project. We reply within 24 hours with ideas — not a sales pitch.</p>
            <div className="space-y-2">
              <a href={`mailto:${site.email}`} className="block text-2xl text-fg hover:text-accent">{site.email}</a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block text-fg/70 hover:text-accent">{site.phone}</a>
              <p className="text-sm text-muted">{site.address}</p>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-3xl border border-fg/10 bg-bg-2 p-6 md:p-10">
            <p className="mb-4 text-sm text-muted">I&apos;m interested in…</p>
            <div className="mb-8 flex flex-wrap gap-2">
              {services.map((s) => {
                const on = picked.includes(s.title);
                return (
                  <button
                    type="button"
                    key={s.title}
                    onClick={() => toggle(s.title)}
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all ${
                      on ? "border-accent bg-accent text-white" : "border-fg/15 hover:border-fg/40"
                    }`}
                  >
                    {on && <Check className="h-3.5 w-3.5" />}
                    {s.title}
                  </button>
                );
              })}
            </div>
            <div className="grid gap-2 md:grid-cols-2 md:gap-6">
              <input required name="name" placeholder="Your name" className={input} />
              <input required type="email" name="email" placeholder="Email address" className={input} />
              <input name="company" placeholder="Company / brand" className={input} />
              <select name="budget" defaultValue="" className={`${input} [&>option]:bg-bg-2`}>
                <option value="" disabled>Budget</option>
                <option>Under $1k</option>
                <option>$1k – $5k</option>
                <option>$5k – $15k</option>
                <option>$15k+</option>
              </select>
            </div>
            <textarea name="message" rows={3} placeholder="Tell us about your project…" className={`${input} mt-2 resize-none`} />
            <div className="mt-10">
              <Magnetic>
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-4 font-semibold text-white"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-accent-2 transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative flex items-center gap-2">
                    {sent ? "Opening your mail app…" : "Send enquiry"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                </button>
              </Magnetic>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-fg/10 pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-fg/60">
            Creative & growth agency for brands that want to lead, not follow.
          </p>
          <div className="mt-6 flex gap-3">
            {Object.entries(site.socials).map(([k, v]) => (
              <a
                key={k}
                href={v}
                aria-label={k}
                className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition-all hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white"
              >
                <SocialIcon name={k} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Navigate</h4>
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-fg/70 transition-colors hover:text-accent">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Services</h4>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.title}>
                <a href="#services" className="text-fg/70 transition-colors hover:text-accent">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <motion.div
        style={{ y }}
        className="font-display pointer-events-none mt-16 select-none text-center text-[16vw] leading-[0.8] whitespace-nowrap font-semibold tracking-tighter"
      >
        <span className="text-fg/10">{site.name}</span>
      </motion.div>
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-fg/10 px-5 py-6 text-sm text-muted md:flex-row md:px-8">
        <span>© {site.year} {site.name}. All rights reserved.</span>
        <motion.a href="#top" whileHover={{ y: -3 }} transition={{ ease }} className="hover:text-accent">
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  );
}
