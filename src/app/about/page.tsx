
import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { siteConfig } from "@/lib/constants";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "About Haven Brokers | Top Mortgage Brokers in Australia",
  description:
    "Meet Haven Brokers, an independent mortgage and finance brokerage serving clients across Australia. Backed by 40+ lender partners, we help home buyers, investors and businesses find suitable finance solutions.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

/* =========================================================
   ABOUT PAGE SCHEMA
========================================================= */

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",

  url: "https://havenbrokers.com.au/about",

  name: "About Haven Brokers",

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
        name: "About",
        item: "https://havenbrokers.com.au/about",
      },
    ],
  },

  mainEntity: {
    "@type": "FinancialService",

    "@id": "https://havenbrokers.com.au/#organization",

    name: "Haven Brokers",

    slogan: "Finance That Feels Like Home",

    knowsAbout: [
      "Home Loans",
      "Refinancing",
      "Investment Property Finance",
      "Commercial Loans",
      "Asset Finance",
      "Personal Loans",
    ],

    areaServed: [
      {
        "@type": "City",
        name: "Melbourne",
      },
      {
        "@type": "Country",
        name: "Australia",
      },
    ],
  },
};

/* =========================================================
   VALUES
========================================================= */

const values = [
  {
    title: "Integrity",
    description:
      "We operate with honesty and transparency in every client interaction.",
  },
  {
    title: "Expertise",
    description:
      "Our brokers stay current with lending markets, regulatory changes, and product innovations to serve you better.",
  },
  {
    title: "Personalisation",
    description:
      "No two clients are alike. We tailor our recommendations to your unique financial situation and long-term goals.",
  },
  {
    title: "Accessibility",
    description:
      "Finance shouldn't be confusing. We explain options in plain language so you can make informed decisions.",
  },
];

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <Script
        id="haven-brokers-about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero
        headline="About Haven Brokers — Top Mortgage Brokers in Melbourne"
        subheadline="A trusted Australian finance brokerage built on transparency, expertise, and a genuine commitment to your financial wellbeing."
        primaryCta={{
          label: "Speak to a Broker",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Our Services",
          href: "/services",
        }}
        compact
      />

      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-navy-950">
              Who We Are
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
              Haven Brokers is an independent mortgage and finance brokerage
              serving clients across Australia. As one of the best Mortgage
              Brokers in Australia, we specialise in connecting individuals,
              families, investors, and businesses with loan solutions that
              align with their financial goals.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
              Whether you're purchasing your first home, refinancing to secure
              better rates, building a property portfolio, or seeking finance
              for commercial growth, our experienced brokers are here to help
              you navigate your options with confidence.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
              As independent brokers, we act in your best interest. We're not
              tied to any single lender, allowing us to compare loan options
              from a broad panel of banks, credit unions, and specialist
              financiers to help find a suitable solution for your
              circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION & VALUES
      ===================================================== */}

      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
              Our Mission &amp; Values
            </h2>

            <p className="mt-4 text-lg text-navy-900/70">
              To make quality finance advice accessible, understandable, and
              genuinely helpful for every Australian we serve.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-navy-900/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-serif text-xl font-semibold text-navy-950">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-navy-900/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TOP MORTGAGE BROKER
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-navy-950">
                Why We're Considered a Top Mortgage Broker in Melbourne
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
                Clients consistently describe Haven Brokers as home loan
                experts who take the time to explain every option clearly,
                rather than rushing to a recommendation. That reputation is
                built on three things: a genuinely wide lender panel, brokers
                who stay current with accreditation and market changes, and a
                process that keeps clients informed from first call to
                settlement and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFESSIONAL FINANCE BROKING
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* CONTENT */}

            <div>
              <h2 className="font-serif text-3xl font-bold text-navy-950">
                Professional Finance Broking You Can Trust
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
                Taking on a home loan or commercial finance facility is one of
                the most significant financial decisions you&apos;ll make. At
                Haven Brokers, we take that responsibility seriously.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
                Our team provides clear, unbiased guidance backed by years of
                industry experience. We manage the complexity — from
                application paperwork to lender negotiations — so you can focus
                on what matters most: achieving your property and finance
                goals.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Licensed and accredited finance professionals",
                  "Access to 40+ Australian lenders",
                  "Ongoing support beyond settlement",
                  "No direct cost to you in most cases",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-navy-900/80"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-gold-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>

                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* QUOTE */}

            <div className="rounded-xl bg-navy-950 p-10 text-center">
              <p className="font-serif text-2xl font-bold text-white">
                &ldquo;Your goals are our priority. We measure our success by
                yours.&rdquo;
              </p>

              <p className="mt-4 text-sm text-gold-400">
                — The Haven Brokers Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <CTASection
        title="Let's Start a Conversation"
        description="Whether you're exploring your options or ready to apply, our brokers are here to help."
        secondaryHref={siteConfig.phoneHref}
      />
    </>
  );
}

