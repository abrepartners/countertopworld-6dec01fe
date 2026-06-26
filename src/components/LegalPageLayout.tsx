import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "./SiteFooter";

/**
 * Shared chrome for the standalone legal pages (Privacy, SMS Terms): the fixed
 * top nav, the centered "Legal" header with the page title + optional subtitle,
 * and the site footer. Each page supplies its own <main> body via children.
 */
export default function LegalPageLayout({
  title,
  subtitle,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav
        className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between"
        aria-label="Site navigation"
      >
        <Link
          to="/"
          className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline"
        >
          Countertop World
        </Link>
        <Link
          to="/#materials"
          className="text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline"
        >
          Materials
        </Link>
      </nav>

      <header className="pt-24 pb-16 px-6 text-center bg-granite border-b border-stone-gold/10">
        <span className="inline-block font-mono text-[10px] tracking-[4px] uppercase text-stone-gold bg-stone-gold/10 border border-stone-gold/20 px-3.5 py-1 rounded-[6px] mb-4">
          Legal
        </span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight text-vein-white mb-4">
          {title}
        </h1>
        {subtitle}
      </header>

      {children}

      <SiteFooter />
    </div>
  );
}
