
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home Loan Resources | Mortgage Guides & Tips | Haven Brokers",
  description:
    "Home loan and mortgage guides covering refinancing, first home buying, investment property finance and loan pre-approval from Haven Brokers, Melbourne. ",
  alternates: {
    canonical: "https://havenbrokers.com.au/resources",
  },
};

const resourcesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: "https://havenbrokers.com.au/resources",
  name: "Home Loan & Mortgage Resources",

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
        name: "Resources",
        item: "https://havenbrokers.com.au/resources",
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
          "@type": "Article",
          headline: "First Home Buyer's Guide: What You Need to Know in 2026",
          datePublished: "2026-03-15",
          url: "https://havenbrokers.com.au/resources/first-home-buyer-guide-2026",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Article",
          headline: "When Is the Right Time to Refinance Your Home Loan?",
          datePublished: "2026-02-28",
          url: "https://havenbrokers.com.au/resources/when-to-refinance-your-home-loan",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Article",
          headline: "Investment Property Finance: The Essentials",
          datePublished: "2026-02-10",
          url: "https://havenbrokers.com.au/resources/investment-property-finance-basics",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Article",
          headline: "Understanding Loan Pre-Approval: A Broker's Perspective",
          datePublished: "2026-01-22",
          url: "https://havenbrokers.com.au/resources/understanding-loan-pre-approval",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Article",
          headline: "Mortgage Broker Melbourne Australia: Tips for Property Investors",
          datePublished: "2026-10-28",
          url: "https://havenbrokers.com.au/resources/mortgage-broker-melbourne-australia-tips-for-property-investors",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Article",
          headline: "First Home Buyer Loans: A Complete Guide to Buying Your First Home",
          datePublished: "2026-10-28",
          url: "https://havenbrokers.com.au/resources/first-home-buyer-loans-a-complete-guide-to-buying-your-first-home",
        },
      },
    ],
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ResourcesPage() {
  return (
    <>
      {/* Resources CollectionPage Schema */}
      <Script
        id="haven-brokers-resources-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resourcesPageSchema),
        }}
      />

      <Hero
        headline="Resources & Insights"
        subheadline="Practical guides and articles to help you navigate the world of home loans, refinancing, and property finance in Australia."
        primaryCta={{
          label: "Speak to a Broker",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Loan Calculator",
          href: "/calculator",
        }}
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-xl border border-navy-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {"image" in post && post.image && (
                  <Link href={`/resources/${post.slug}`} className="block overflow-hidden rounded-t-xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-gold-500/10 px-3 py-1 font-semibold text-gold-600">
                      {post.category}
                    </span>

                    <span className="text-navy-900/50">
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="mt-4 font-serif text-xl font-semibold text-navy-950 transition-colors group-hover:text-gold-600">
                    <Link href={`/resources/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-900/70">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <time
                      className="text-xs text-navy-900/50"
                      dateTime={post.date}
                    >
                      {formatDate(post.date)}
                    </time>

                    <Link
                      href={`/resources/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
                    >
                      Read more

                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have Questions About Your Finance Options?"
        description="Our articles are a helpful starting point. For advice tailored to your situation, speak with one of our experienced brokers."
      />
    </>
  );
}

