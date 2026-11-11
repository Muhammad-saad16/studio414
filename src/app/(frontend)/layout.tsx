import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { themeScript } from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Contact";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${display.variable} ${body.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="grain min-h-screen">
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
