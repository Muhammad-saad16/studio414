"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/lib/site";
import { consumeFirstLoad, ease } from "./ui";

const flash = ["Idea", "Craft", "Create", "Brand", "Grow"];
const STEP = 260; // ms per word

export default function Preloader() {
  const [i, setI] = useState(0);
  const [exit, setExit] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let k = 1; k <= flash.length; k++) timers.push(setTimeout(() => setI(k), 300 + k * STEP));
    timers.push(setTimeout(() => setExit(true), 300 + flash.length * STEP + 850));
    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;
  const isFinal = i >= flash.length;

  return (
    <motion.div
      className="fixed inset-0 z-[200]"
      initial={{ y: "0%" }}
      animate={exit ? { y: "-125%" } : {}}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (exit) {
          document.documentElement.style.overflow = "";
          consumeFirstLoad();
          setDone(true);
        }
      }}
    >
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-ink text-cream">
        <div className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.3em] text-cream/40 md:left-10 md:top-10">
          {site.tagline}
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {[...flash, null].map((_, k) => (
            <span
              key={k}
              className={`h-1 rounded-full transition-all duration-300 ${k <= i ? "w-6 bg-ember" : "w-1 bg-cream/20"}`}
            />
          ))}
        </div>

        {!isFinal ? (
          <motion.span
            key={i}
            className={`font-serif text-[22vw] leading-none md:text-[13vw] ${i % 2 ? "italic text-ember" : ""}`}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {flash[i]}
            <span className="text-ember not-italic">.</span>
          </motion.span>
        ) : (
          <motion.div
            className="font-serif flex overflow-hidden text-[26vw] leading-[1.05] md:text-[16vw]"
            animate={exit ? { scale: 0.92, opacity: 0.3 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            {(site.name + ".").split("").map((ch, k, arr) => (
              <motion.span
                key={k}
                className={`inline-block ${k === arr.length - 1 ? "text-ember" : ""}`}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease, delay: k * 0.05 }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
      <motion.div
        className="absolute left-[-10%] top-full h-[18vh] w-[120%] rounded-b-[50%] bg-ink"
        initial={{ scaleY: 0 }}
        animate={exit ? { scaleY: 1 } : {}}
        style={{ originY: 0 }}
        transition={{ duration: 0.6, ease }}
      />
    </motion.div>
  );
}
