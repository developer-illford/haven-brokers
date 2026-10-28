
import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Haven Brokers | Mortgage Broker Dandenong, Melbourne",
  description:
    "Contact Haven Brokers, your local mortgage broker Dandenong and Melbourne VIC clients trust. Call, email or book a free consultation — we respond within one business day.",
  alternates: {
    canonical: "https://havenbrokers.com.au/contact",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://havenbrokers.com.au/contact",
  name: "Contact Haven Brokers",

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
        name: "Contact",
        item: "https://havenbrokers.com.au/contact",
      },
    ],
  },

  mainEntity: {
    "@type": "FinancialService",
    "@id": "https://havenbrokers.com.au/#organization",
    name: "Haven Brokers",

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

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+61399997949",
        contactType: "customer service",
        areaServed: "AU",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: "+61449786135",
        contactType: "sales",
        areaServed: "AU",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        email: "info@havenbrokers.com.au",
        contactType: "customer service",
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
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Contact Page SEO Schema */}
      <Script
        id="haven-brokers-contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />

      <Hero
        headline="Contact Haven Brokers — Mortgage Broker Dandenong, Melbourne"
        subheadline="Ready to explore your finance options? Reach out to our team for a free, no-obligation consultation with a mortgage broker Melbourne VIC, clients across the region already trust."
        primaryCta={{
          label: "Call Us Now",
          href: siteConfig.landlineHref,
        }}
        secondaryCta={{
          label: "View Services",
          href: "/services",
        }}
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-navy-950">
                Contact Details
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-navy-900/70">
                We&apos;re here to help with all your mortgage and finance
                enquiries. Reach out by phone, email, or the form and
                we&apos;ll respond promptly.
              </p>

              <dl className="mt-8 space-y-6">

                {/* Phone */}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Phone
                  </dt>

                  <dd className="mt-1 space-y-1">
                    <a
                      href={siteConfig.landlineHref}
                      className="block text-lg font-semibold text-navy-950 transition-colors hover:text-gold-600"
                    >
                      {siteConfig.landline}
                    </a>

                    <a
                      href={siteConfig.phoneHref}
                      className="block text-sm text-navy-900/80 transition-colors hover:text-gold-600"
                    >
                      Mobile: {siteConfig.phone}
                    </a>
                  </dd>
                </div>

                {/* Email */}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Email
                  </dt>

                  <dd className="mt-1">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-lg font-semibold text-navy-950 transition-colors hover:text-gold-600"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>

                {/* Office */}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Office
                  </dt>

                  <dd className="mt-1 text-sm text-navy-900/80">
                    {siteConfig.address}
                  </dd>
                </div>

                {/* Business Hours */}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Business Hours
                  </dt>

                  <dd className="mt-1 text-sm text-navy-900/80">
                    {siteConfig.hours}
                  </dd>
                </div>

              </dl>

              {/* Google Map */}
              <div className="mt-10 overflow-hidden rounded-xl border border-navy-900/10 shadow-sm">
                <iframe
                  title="Haven Brokers office location"
                  src="https://maps.google.com/maps?q=5%2F50+Thomas+Street+Dandenong+VIC+3175&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-xl border border-navy-900/10 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md lg:col-span-3">
              <h2 className="font-serif text-2xl font-bold text-navy-950">
                Start Your Enquiry
              </h2>

              <p className="mt-2 text-sm text-navy-900/70">
                Fill in the form below and a broker will be in touch within
                one business day.
              </p>

              <div className="mt-8">
                <ContactForm variant="full" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

