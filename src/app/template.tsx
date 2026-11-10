"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { nav } from "@/lib/site";
import { isFirstLoad } from "@/components/ui";

/** Page-change curtain: an ink panel with the page name sweeps up off the screen. */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show] = useState(() => !isFirstLoad());
  const label = nav.find((n) => n.href === pathname)?.label ?? "";

  return (
    <>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-ink text-cream"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
        >
          <motion.span
            className="font-serif text-7xl md:text-9xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {label}
            <span className="text-ember">.</span>
          </motion.span>
        </motion.div>
      )}
      {children}
    </>
  );
}
