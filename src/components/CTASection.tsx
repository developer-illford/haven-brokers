import Link from "next/link";
import { siteConfig } from "@/lib/constants";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  title = "Ready to Find Your Ideal Loan?",
  description = "Speak with an experienced mortgage broker Australia-wide clients recommend. We'll assess your situation and guide you toward the right finance solution — at no cost to you in most cases.",
  primaryLabel = "Start Your Enquiry",
  primaryHref = "/contact",
  secondaryLabel = "Speak to a Broker",
  secondaryHref = siteConfig.phoneHref,
}: CTASectionProps) {
  return (
    <section className="bg-navy-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gold-500/20 bg-navy-900/50 p-10 text-center backdrop-blur-sm sm:p-14">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryHref}
              className="w-full rounded-md bg-gold-500 px-8 py-3.5 text-center font-semibold text-navy-950 transition-all hover:bg-gold-400 sm:w-auto"
            >
              {primaryLabel}
            </Link>
            <a
              href={secondaryHref}
              className="w-full rounded-md border border-white/20 px-8 py-3.5 text-center font-semibold text-white transition-all hover:border-gold-500/50 hover:bg-white/5 sm:w-auto"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
