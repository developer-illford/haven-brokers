import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

import {
  processSteps,
  services,
  siteConfig,
  testimonials,
  whyChooseUs,
} from "@/lib/constants";

/* =========================================================
   PAGE SEO
========================================================= */

export const metadata: Metadata = {
  title: "Mortgage & Finance Broker Australia | Haven Brokers",
  description:
    "Haven Brokers is an independent mortgage and finance broker in Australia. Compare home loans, refinancing, investment, commercial and business finance from 40+ lenders.",
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
};

/* =========================================================
   STRUCTURED DATA / SCHEMA
========================================================= */

const schema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://havenbrokers.com.au/#organization",

  name: "Haven Brokers",

  url: "https://havenbrokers.com.au/",

  logo: "https://havenbrokers.com.au/images/haven-logo.png",

  image: "https://havenbrokers.com.au/images/haven-logo.png",

  description:
    "Independent Australian mortgage and finance brokerage helping home buyers, refinancers, investors and businesses compare loans from 40+ lenders.",

  telephone: "+61399997949",

  email: "info@havenbrokers.com.au",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 5, 50 Thomas Street",
    addressLocality: "Dandenong",
    addressRegion: "VIC",
    postalCode: "3175",
    addressCountry: "AU",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: -37.9901,
    longitude: 145.2098,
  },

  areaServed: [
    {
      "@type": "City",
      name: "Melbourne",
    },
    {
      "@type": "State",
      name: "Victoria",
    },
    {
      "@type": "Country",
      name: "Australia",
    },
  ],

  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "09:00",
    closes: "17:30",
  },

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Finance Services",

    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home Loans",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "First Home Buyer Loans",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Refinancing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Investment Property Loans",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Loans",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Asset Finance",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Personal Loans",
        },
      },
    ],
  },
};

/* =========================================================
   HOME PAGE
========================================================= */

export default function HomePage() {
  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        id="haven-brokers-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <Hero
        headline="Finance That Feels Like Home — Your Trusted Mortgage Broker in Australia"
        subheadline="Haven Brokers is an independent mortgage broker in Australia that families, investors, and business owners turn to when they want a loan that genuinely fits their needs — not simply whatever a single bank happens to offer. As a Melbourne-based finance broker working with a panel of 40+ lenders nationwide, we compare rates, loan structures, and features to help you find an option suited to your circumstances. In most cases, our advice comes at no cost to you."
      />

      {/* =====================================================
          TRUST INTRO
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* LEFT CONTENT */}

            <div>
              <h2 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
                Your Partner in Smart Finance Decisions
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
                At Haven Brokers, we believe finding the right loan should be
                clear, confident and stress-free. As independent home loan
                brokers Melbourne clients trust, we work for you — not the
                banks — to source competitive rates and loan structures
                tailored to your goals.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
                Whether you're buying your first home, refinancing for a better
                deal, growing an investment portfolio, or funding business
                assets, our experienced team is here to guide you every step of
                the way. As a finance broker Melbourne homeowners and
                investors have relied on for years, we bring the same level of
                care to every client, from first-time buyers to seasoned
                property investors.
              </p>

              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
              >
                Learn more about us

                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  stat: "40+",
                  label: "Lender Partners",
                },
                {
                  stat: "100+",
                  label: "Loans Facilitated",
                },
                {
                  stat: "98%",
                  label: "Client Satisfaction",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-navy-900/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="font-serif text-3xl font-bold text-gold-600">
                    {item.stat}
                  </p>

                  <p className="mt-1 text-sm text-navy-900/60">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES SECTION
      ===================================================== */}

      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADING */}

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
              Finance Solutions for Every Stage
            </h2>

            <p className="mt-4 text-lg text-navy-900/70">
              From first home purchases to commercial lending, we offer
              comprehensive broking services backed by a diverse lender panel.
            </p>
          </div>

          {/* SERVICE CARDS */}

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                href={`/services#${service.id}`}
              />
            ))}
          </div>

          {/* VIEW ALL */}

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 rounded-md border border-navy-950/20 px-6 py-3 text-sm font-semibold text-navy-950 transition-all duration-300 hover:border-gold-500/50 hover:bg-white hover:shadow-sm"
            >
              View All Services

              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HEADING */}

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
              Why Choose Haven Brokers
            </h2>

            <p className="mt-4 text-lg text-navy-900/70">
              We combine deep industry knowledge with a client-first approach
              to deliver finance outcomes you can trust.
            </p>
          </div>

          {/* FEATURES */}

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* ICON */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10">
                  <svg
                    className="h-5 w-5 text-gold-600"
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
                </div>

                {/* CONTENT */}

                <div>
                  <h3 className="font-serif text-lg font-semibold text-navy-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-navy-900/70">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <ProcessSteps steps={processSteps} />

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <Testimonials testimonials={testimonials} />

      {/* =====================================================
          CTA
      ===================================================== */}

      <CTASection secondaryHref={siteConfig.phoneHref} />
    </>
  );
}