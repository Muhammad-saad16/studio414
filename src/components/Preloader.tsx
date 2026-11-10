"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/lib/site";
import { ease } from "./ui";

const flash = [
  { t: "Design", c: "#f4f3ef" },
  { t: "Brand", c: "#c6ff3d" },
  { t: "Market", c: "#7b5cff" },
  { t: "Rank", c: "#3dd9ff" },
  { t: "Grow", c: "#ff5ca8" },
];
const STEP = 260; // ms per word

export default function Preloader() {
  const [i, setI] = useState(0);
  const [exit, setExit] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let k = 1; k <= flash.length; k++) timers.push(setTimeout(() => setI(k), 300 + k * STEP));
    timers.push(setTimeout(() => setExit(true), 300 + flash.length * STEP + 900));
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
          setDone(true);
        }
      }}
    >
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#0b0b10]">
        {/* counter dots */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {[...flash, null].map((_, k) => (
            <span
              key={k}
              className={`h-1.5 rounded-full transition-all duration-300 ${k <= i ? "w-6 bg-accent" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>

        {!isFinal ? (
          <motion.span
            key={i}
            className="font-display text-[18vw] leading-none font-bold tracking-tight md:text-[11vw]"
            style={{ color: flash[i].c }}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {flash[i].t}
            <span className="text-fg">.</span>
          </motion.span>
        ) : (
          <motion.div
            className="font-display flex overflow-hidden text-[20vw] leading-[1.05] font-extrabold tracking-tighter md:text-[13vw]"
            animate={exit ? { scale: 0.9, opacity: 0.4 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            {(site.name + ".").split("").map((ch, k, arr) => (
              <motion.span
                key={k}
                className={`inline-block ${k === arr.length - 1 ? "text-accent" : "text-fg"}`}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease, delay: k * 0.04 }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
      {/* curved bottom edge while sliding away */}
      <motion.div
        className="absolute left-[-10%] top-full h-[18vh] w-[120%] rounded-b-[50%] bg-[#0b0b10]"
        initial={{ scaleY: 0 }}
        animate={exit ? { scaleY: 1 } : {}}
        style={{ originY: 0 }}
        transition={{ duration: 0.6, ease }}
      />
    </motion.div>
  );
}
