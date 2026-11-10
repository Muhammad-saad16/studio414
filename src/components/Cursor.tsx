"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement).closest("a,button,[data-cursor]") as HTMLElement | null;
      setHover(!!t);
      setLabel(t?.dataset.cursor ?? "");
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/40 text-[11px] font-semibold uppercase tracking-widest text-white"
        style={{ x: sx, y: sy }}
        animate={{
          width: label ? 96 : hover ? 56 : 32,
          height: label ? 96 : hover ? 56 : 32,
          backgroundColor: label ? "rgba(140,82,255,1)" : hover ? "rgba(140,82,255,0.18)" : "rgba(140,82,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </>
  );
}
