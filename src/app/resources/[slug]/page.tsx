import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const articleContent: Record<string, { sections: { heading?: string; paragraphs: string[] }[] }> = {
  "first-home-buyer-guide-2026": {
    sections: [
      {
        paragraphs: [
          "Buying your first home is an exciting milestone — but it can also feel overwhelming. Between saving a deposit, understanding lending criteria, and navigating government incentives, there's a lot to consider. This guide breaks down the essentials to help you start your journey with confidence.",
        ],
      },
      {
        heading: "Saving Your Deposit",
        paragraphs: [
          "Most lenders require a minimum deposit of 5–20% of the property purchase price. A larger deposit generally means better interest rates and avoids Lenders Mortgage Insurance (LMI) on loans above 80% LVR.",
          "Consider setting up a dedicated savings account, exploring the First Home Super Saver Scheme, and reviewing your budget to accelerate your deposit timeline.",
        ],
      },
      {
        heading: "Understanding Grants and Schemes",
        paragraphs: [
          "Australian first home buyers may be eligible for stamp duty concessions, grants, and other incentives depending on their state or territory. These programs change regularly, so it's worth speaking with a broker who stays up to date with current eligibility criteria.",
        ],
      },
      {
        heading: "Getting Pre-Approved",
        paragraphs: [
          "Pre-approval gives you a clear picture of your borrowing capacity before you start house hunting. It shows sellers and agents you're a serious buyer and helps you focus on properties within your budget.",
          "A Haven Brokers adviser can assess your financial situation, compare lender options, and guide you through the pre-approval process.",
        ],
      },
    ],
  },
  "when-to-refinance-your-home-loan": {
    sections: [
      {
        paragraphs: [
          "Refinancing involves switching your existing home loan to a new lender or renegotiating terms with your current lender. Done at the right time, it can save you thousands in interest and unlock better loan features.",
        ],
      },
      {
        heading: "Signs It Might Be Time",
        paragraphs: [
          "Your fixed rate period is ending and revert rates are significantly higher than current market rates.",
          "You've built substantial equity and could qualify for a lower LVR tier with better pricing.",
          "You want to access features like an offset account, redraw facility, or split loan structure that your current loan doesn't offer.",
          "Your financial situation has changed — perhaps you've received a pay rise, paid down other debts, or need to consolidate.",
        ],
      },
      {
        heading: "Costs to Consider",
        paragraphs: [
          "Before refinancing, weigh up any exit fees, break costs on fixed rates, and application fees with the potential savings. A broker can run a cost-benefit analysis to ensure refinancing makes financial sense for your situation.",
        ],
      },
    ],
  },
  "investment-property-finance-basics": {
    sections: [
      {
        paragraphs: [
          "Investment property loans differ from owner-occupier loans in several important ways. Lenders assess rental income, apply different LVR limits, and may offer interest-only repayment options tailored to investors.",
        ],
      },
      {
        heading: "Interest-Only vs Principal & Interest",
        paragraphs: [
          "Interest-only repayments can improve cash flow in the early years of an investment, allowing you to allocate funds elsewhere. However, you won't build equity through repayments during the interest-only period.",
          "Principal and interest repayments build equity faster and may qualify for lower rates with some lenders.",
        ],
      },
      {
        heading: "How Lenders Assess Rental Income",
        paragraphs: [
          "Most lenders use a portion of expected rental income (typically 70–80%) when calculating your serviceability. This means your personal income still plays a significant role in borrowing capacity.",
        ],
      },
    ],
  },
  "understanding-loan-pre-approval": {
    sections: [
      {
        paragraphs: [
          "Pre-approval (also called conditional approval) is an indication from a lender that they're willing to lend you a certain amount, subject to verification of your details and property valuation.",
        ],
      },
      {
        heading: "What You'll Need",
        paragraphs: [
          "Proof of identity, recent payslips or tax returns, bank statements, details of existing debts, and information about your assets and savings. Self-employed applicants may need additional documentation.",
        ],
      },
      {
        heading: "How Long Does It Last?",
        paragraphs: [
          "Pre-approval typically lasts 3–6 months depending on the lender. If you haven't found a property within that timeframe, you may need to reapply or update your application.",
        ],
      },
    ],
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = articleContent[slug];

  return (
    <>
      <section className="bg-navy-950 pt-28 pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm text-gold-400 transition-colors hover:text-gold-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Resources
          </Link>
          <span className="mt-6 block text-sm font-semibold text-gold-400">{post.category}</span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-white/60">
            {formatDate(post.date)} · {post.readTime}
          </p>
        </div>
      </section>

      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {content?.sections.map((section, i) => (
            <div key={i} className="mb-8">
              {section.heading && (
                <h2 className="font-serif text-2xl font-semibold text-navy-950">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className={`text-base leading-relaxed text-navy-900/80 ${section.heading || j > 0 ? "mt-4" : ""}`}>
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-12 rounded-xl border border-navy-900/10 bg-cream-100 p-8">
            <p className="text-sm leading-relaxed text-navy-900/70">
              This article is for general information only and does not constitute personal financial advice. Please speak with a qualified finance professional before making decisions based on this content.
            </p>
          </div>
        </div>
      </article>

      <CTASection
        title="Need Personalised Advice?"
        description="Every situation is different. Speak with a Haven Brokers adviser for guidance tailored to your goals."
      />
    </>
  );
}
