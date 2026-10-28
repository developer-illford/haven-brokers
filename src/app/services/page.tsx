
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/constants";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Home Loan Australia | Mortgage and Finance Service Australia",
  description:
    "Compare home loans Australia-wide with Haven Brokers. Explore mortgage loan lenders, refinancing, investment property, commercial and personal loan options from 40+ lenders.",
  alternates: {
    canonical: "https://havenbrokers.com.au/services",
  },
};

/* =========================================================
   SERVICES PAGE SCHEMA
========================================================= */

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",

  url: "https://havenbrokers.com.au/services",

  name: "Home Loans Australia | Mortgage & Finance Services",

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
        name: "Services",
        item: "https://havenbrokers.com.au/services",
      },
    ],
  },

  mainEntity: {
    "@type": "ItemList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Home Loans",
          provider: {
            "@id": "https://havenbrokers.com.au/#organization",
          },
          areaServed: "AU",
          url: "https://havenbrokers.com.au/services#home-loans",
        },
      },

      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "First Home Buyer Loans",
          provider: {
            "@id": "https://havenbrokers.com.au/#organization",
          },
          areaServed: "AU",
          url: "https://havenbrokers.com.au/services#first-home-buyers",
        },
      },

      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Refinancing",
          provider: {
            "@id": "https://havenbrokers.com.au/#organization",
          },
          areaServed: "AU",
          url: "https://havenbrokers.com.au/services#refinancing",
        },
      },

      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Investment Property Loans",
          provider: {
            "@id": "https://havenbrokers.com.au/#organization",
          },
          areaServed: "AU",
          url: "https://havenbrokers.com.au/services#investment-property",
        },
      },

      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "Commercial Loans",
          provider: {
            "@id": "https://havenbrokers.com.au/#organization",
          },
          areaServed: "AU",
          url: "https://havenbrokers.com.au/services#commercial-loans",
        },
      },

      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: "Asset Finance",
          provider: {
            "@id": "https://havenbrokers.com.au/#organization",
          },
          areaServed: "AU",
          url: "https://havenbrokers.com.au/services#asset-finance",
        },
      },

      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "Service",
          name: "Personal Loans",
          provider: {
            "@id": "https://havenbrokers.com.au/#organization",
          },
          areaServed: "AU",
          url: "https://havenbrokers.com.au/services#personal-loans",
        },
      },
    ],
  },
};

/* =========================================================
   SERVICES PAGE
========================================================= */

export default function ServicesPage() {
  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <Script
        id="haven-brokers-services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesPageSchema),
        }}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero
        headline="Home Loans in Australia — Finance Solutions Tailored to You"
        subheadline="From residential home loans to commercial and asset finance, we offer comprehensive broking solutions backed by a diverse panel of Australian lenders. We understand that every client's situation is unique, so we take the time to understand your goals, compare suitable products from trusted lenders Australia-wide, and recommend finance solutions that make sense for your circumstances — not ours."
        primaryCta={{
          label: "Book a Free Consultation",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Loan Calculator",
          href: "/calculator",
        }}
        compact
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-navy-900/70">
              Every client&apos;s situation is unique. We take the time to
              understand your goals, compare suitable products, and recommend
              finance solutions that make sense for your circumstances — not
              ours.
            </p>
          </div>

          {/* =================================================
              SERVICES LIST
          ================================================= */}

          <div className="mt-16 space-y-16">
            {services.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className={`scroll-mt-28 grid gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* ===========================================
                    SERVICE CONTENT
                =========================================== */}

                <div
                  className={
                    index % 2 === 1 ? "lg:order-2" : ""
                  }
                >
                  {/* SERVICE LABEL */}

                  <span className="text-sm font-semibold uppercase tracking-wider text-gold-600">
                    {service.title}
                  </span>

                  {/* SERVICE TITLE */}

                  <h2 className="mt-2 font-serif text-3xl font-bold text-navy-950">
                    {service.title}
                  </h2>

                  {/* DESCRIPTION */}

                  <p className="mt-4 text-lg leading-relaxed text-navy-900/70">
                    {service.shortDescription}
                  </p>

                  {/* WHO IT'S FOR */}

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-950">
                      Who It&apos;s For
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
                      {service.whoFor}
                    </p>
                  </div>

                  {/* KEY BENEFITS */}

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-950">
                      Key Benefits
                    </h3>

                    <ul className="mt-3 space-y-2">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-3 text-sm text-navy-900/80"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-gold-600"
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

                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-md"
                  >
                    Speak to a Broker
                  </Link>
                </div>

                {/* ===========================================
                    SERVICE VISUAL
                =========================================== */}

                <div
                  className={`flex items-center justify-center rounded-xl bg-navy-950 p-12 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="text-center">
                    {/* NUMBER */}

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/10">
                      <span className="font-serif text-3xl font-bold text-gold-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* TITLE */}

                    <p className="mt-4 font-serif text-xl font-semibold text-white">
                      {service.title}
                    </p>

                    {/* SUPPORTING TEXT */}

                    <p className="mt-2 text-sm text-white/60">
                      Expert guidance from enquiry to settlement
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <CTASection />
    </>
  );
}

