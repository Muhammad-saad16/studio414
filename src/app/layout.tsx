import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const display = Syne({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const body = Manrope({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${site.name} — Creative & Growth Agency`,
  description:
    "Graphic design, branding, digital marketing, SEO, social media and web development that grows your business.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="grain min-h-screen">
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
