
import type { Metadata } from "next";
import Script from "next/script";
import CalculatorSection from "@/components/CalculatorSection";
import CTASection from "@/components/CTASection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Australian Home Loan Calculator | Haven Brokers Melbourne",
  description:
    "See how much you could borrow and estimate your repayments with Haven Brokers. Get a personalised PDF assessment and expert mortgage guidance in Melbourne.",
  alternates: {
    canonical: "https://havenbrokers.com.au/calculator",
  },
};

const calculatorPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Haven Brokers Home Loan Borrowing Power Calculator",
  url: "https://havenbrokers.com.au/calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",

  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AUD",
  },

  provider: {
    "@id": "https://havenbrokers.com.au/#organization",
  },

  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://havenbrokers.com.au/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculator",
        item: "https://havenbrokers.com.au/calculator",
      },
    ],
  },
};

export default function CalculatorPage() {
  return (
    <>
      {/* Calculator WebApplication Schema */}
      <Script
        id="haven-brokers-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorPageSchema),
        }}
      />

      <CalculatorSection />

      <section className="border-t border-navy-900/10 bg-cream-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gold-500/20 bg-white p-8 text-center transition-shadow duration-300 hover:shadow-md">
            <h3 className="font-serif text-xl font-semibold text-navy-950">
              Want a fully personalised assessment?
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm text-navy-900/70">
              Our brokers can assess your situation against real lender
              policies, compare products, and guide you through pre-approval.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-md"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for Expert Advice?"
        description="Online calculators are a helpful starting point. A Haven Brokers adviser can uncover options and borrowing capacity you may not find on your own."
      />
    </>
  );
}

