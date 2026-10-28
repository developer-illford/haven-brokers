import Link from "next/link";

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
}

export default function Hero({
  headline,
  subheadline,
  primaryCta = { label: "Book a Free Consultation", href: "/contact" },
  secondaryCta = { label: "Compare Loan Options", href: "/services" },
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-navy-950 pt-24 ${
        compact ? "pb-16" : "pb-24 lg:pb-32"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,160,89,0.12)_0%,_transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-3xl text-center ${compact ? "" : "lg:pt-8"}`}>
          <p className="animate-fade-up mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Haven Brokers — Mortgage &amp; Finance
          </p>
          <h1 className="animate-fade-up-delay-1 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {subheadline}
          </p>
          <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="w-full rounded-md bg-gold-500 px-8 py-3.5 text-center text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25 sm:w-auto"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="w-full rounded-md border border-white/20 px-8 py-3.5 text-center text-base font-semibold text-white transition-all hover:border-gold-500/50 hover:bg-white/5 sm:w-auto"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
