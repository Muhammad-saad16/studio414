"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { brand, customWork, services, site, values, work } from "@/lib/site";
import { Button, FadeUp, Magnetic, SectionLabel, Spark, SplitText } from "./ui";

/* ================================================================ ABOUT */
export function AboutContent() {
  return (
    <>
      {/* Story — TODO: Sarté team to write */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.4fr] md:px-8 md:py-28">
        <SectionLabel>Our story</SectionLabel>
        <FadeUp>
          {brand.story ? (
            <p className="font-serif text-3xl leading-snug md:text-5xl">{brand.story}</p>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-ink/25 p-10 text-ink/50">
              Brand story coming soon. (The Sarté team will add this.)
            </div>
          )}
        </FadeUp>
      </section>

      {/* Mission / vision */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2 md:px-8">
        {[
          ["Mission", brand.mission, "bg-ink text-cream"],
          ["Vision", brand.vision, "bg-ember text-cream"],
        ].map(([t, d, c], i) => (
          <FadeUp key={t} delay={i * 0.1} className={`flex min-h-[26rem] flex-col justify-between rounded-[2rem] p-10 md:p-14 ${c}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] opacity-70">{t}</span>
              <Spark className="h-8 w-8 opacity-80" />
            </div>
            <p className="font-serif text-4xl leading-tight md:text-5xl">{d}</p>
          </FadeUp>
        ))}
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel>Core values</SectionLabel>
        <h2 className="font-serif mb-14 text-6xl leading-[0.95] md:text-8xl">
          <SplitText text="How we *think.*" />
        </h2>
        <div className="border-t border-ink/15">
          {values.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.05} y={30}>
              <div className="group grid gap-4 border-b border-ink/15 py-10 md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline">
                <span className="font-serif text-2xl italic text-ember">0{i + 1}</span>
                <h3 className="font-serif text-5xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">{v.title}</h3>
                <p className="text-lg leading-relaxed text-ink/65">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="mx-auto max-w-7xl px-5 pb-32 pt-8 md:px-8">
        <FadeUp className="relative overflow-hidden rounded-[2rem] bg-cream-2 p-10 md:p-16">
          <Spark className="absolute -right-16 -top-16 h-64 w-64 text-ember/10" />
          <p className="mb-8 text-xs uppercase tracking-[0.25em] text-muted">Who we serve</p>
          <p className="font-serif relative max-w-4xl text-4xl leading-tight md:text-6xl">
            {brand.clients} Across the <em className="text-ember">{site.markets}.</em>
          </p>
          <div className="relative mt-10">
            <Button href="/contact">
              Work with us <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}

/* ================================================================ SERVICES */
export function ServicesContent() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        {services.map((s, i) => (
          <div
            key={s.slug}
            id={s.slug}
            className="grid scroll-mt-28 gap-10 border-t border-ink/15 py-16 md:grid-cols-[1fr_1.2fr] md:py-24"
          >
            <div className="md:sticky md:top-32 md:self-start">
              <FadeUp y={20}>
                <span className="font-serif text-2xl italic text-ember">0{i + 1}</span>
              </FadeUp>
              <h2 className="font-serif mt-3 text-6xl leading-[0.95] md:text-7xl">
                <SplitText text={s.title} />
              </h2>
              {s.desc && (
                <FadeUp delay={0.1}>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">{s.desc}</p>
                </FadeUp>
              )}
            </div>
            <ul>
              {s.items.map((item, k) => (
                <FadeUp key={item} delay={k * 0.06} y={24}>
                  <li className="group flex items-center justify-between gap-6 border-b border-ink/10 py-6">
                    <span className="flex items-baseline gap-5">
                      <span className="text-xs text-muted">{String(k + 1).padStart(2, "0")}</span>
                      <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{item}</span>
                    </span>
                    <span className="h-2 w-2 shrink-0 scale-0 rounded-full bg-ember transition-transform duration-300 group-hover:scale-100" />
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-8">
        <FadeUp className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-ink p-10 text-cream md:flex-row md:items-center md:p-14">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-cream/50">Custom work</p>
            <p className="font-serif text-4xl md:text-5xl">
              Need something else? <em className="text-ember">{customWork}</em>
            </p>
          </div>
          <Button href="/contact" variant="cream">
            Tell us about it <ArrowUpRight className="h-4 w-4" />
          </Button>
        </FadeUp>
      </section>
    </>
  );
}

/* ================================================================ WORK */
export function WorkContent() {
  const slots = work.length ? work : Array.from({ length: 4 }, (_, i) => ({ title: `Project 0${i + 1}`, category: "Coming soon", image: undefined }));
  return (
    <section className="mx-auto max-w-7xl px-5 pb-32 md:px-8">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {slots.map((w, i) => (
          <FadeUp key={w.title} delay={(i % 2) * 0.1} className={i % 2 ? "md:mt-28" : ""}>
            <div className="group" data-cursor={work.length ? "View" : undefined}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-2">
                {w.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.image} alt={w.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <Spark className="h-24 w-24 text-ink/10 transition-colors duration-500 group-hover:text-ember/40" />
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <h3 className="font-serif text-3xl">{w.title}</h3>
                <span className="text-sm text-muted">{w.category}</span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ CONTACT */
export function ContactContent() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nCompany: ${f.get("company")}\nServices: ${picked.join(", ")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input =
    "w-full border-b border-ink/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-ink/35 focus:border-ember";

  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-32 md:px-8 lg:grid-cols-[1fr_1.4fr]">
      <FadeUp className="space-y-10">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted">Email</p>
          <a href={`mailto:${site.email}`} className="font-serif text-4xl hover:text-ember">
            {site.email}
          </a>
        </div>
        {site.phone && (
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted">Phone</p>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-xl hover:text-ember">
              {site.phone}
            </a>
          </div>
        )}
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted">Markets</p>
          <p className="text-xl">{site.markets}</p>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <form onSubmit={onSubmit} className="rounded-[2rem] bg-cream-2 p-6 md:p-12">
          <p className="mb-4 text-sm text-muted">I&apos;m interested in…</p>
          <div className="mb-8 flex flex-wrap gap-2">
            {services.map((s) => {
              const on = picked.includes(s.title);
              return (
                <button
                  type="button"
                  key={s.slug}
                  onClick={() => toggle(s.title)}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all ${
                    on ? "border-ink bg-ink text-cream" : "border-ink/20 hover:border-ink/60"
                  }`}
                >
                  {on && <Check className="h-3.5 w-3.5 text-ember" />}
                  {s.title}
                </button>
              );
            })}
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-6">
            <input required name="name" placeholder="Your name" className={input} />
            <input required type="email" name="email" placeholder="Email address" className={input} />
          </div>
          <input name="company" placeholder="Company / brand" className={`${input} mt-2`} />
          <textarea name="message" rows={3} placeholder="Tell us about your idea…" className={`${input} mt-2 resize-none`} />
          <div className="mt-10">
            <Magnetic>
              <button type="submit" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-4 font-medium text-cream">
                <span className="absolute inset-0 translate-y-full rounded-full bg-ember transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2">
                  {sent ? "Opening your mail app…" : "Send enquiry"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </span>
              </button>
            </Magnetic>
          </div>
        </form>
      </FadeUp>
    </section>
  );
}

