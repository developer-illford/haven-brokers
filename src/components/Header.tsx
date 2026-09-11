"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/95 shadow-lg shadow-navy-950/20 backdrop-blur-md"
          : "bg-navy-950"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Haven Brokers home">
          <Image
            src={siteConfig.logo}
            alt="Haven Brokers — Mortgage & Finance"
            width={160}
            height={48}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  active
                    ? "bg-gold-500/15 text-gold-400"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="text-right">
            <a
              href={siteConfig.landlineHref}
              className="block text-sm font-medium text-gold-400 transition-colors hover:text-gold-500"
            >
              {siteConfig.landline}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="block text-xs text-white/60 transition-colors hover:text-gold-400"
            >
              {siteConfig.phone}
            </a>
          </div>
          <Link
            href="/contact"
            className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
          >
            Book a Free Consultation
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-950 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    active ? "bg-gold-500/15 text-gold-400" : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-white/10 pt-4">
              <a href={siteConfig.landlineHref} className="block px-4 py-2 text-gold-400">
                {siteConfig.landline}
              </a>
              <a href={siteConfig.phoneHref} className="block px-4 py-1 text-sm text-white/70">
                Mobile: {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="mt-3 block rounded-md bg-gold-500 px-4 py-3 text-center font-semibold text-navy-950"
              >
                Book a Free Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
