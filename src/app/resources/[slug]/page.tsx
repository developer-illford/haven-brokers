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
    title: `${post.title} | Haven Brokers`,
    description: post.excerpt,
    alternates: {
      canonical: `https://havenbrokers.com.au/resources/${post.slug}`,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const articleContent: Record<string, { sections: { heading?: string; paragraphs: string[]; image?: string }[] }> = {
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
  "first-home-buyer-loans-a-complete-guide-to-buying-your-first-home": {
    sections: [
      {
        paragraphs: [
          "Purchasing your first home is an important financial goal. But knowing the options, eligibility and commitments around a mortgage can be daunting. First Home Buyer Loans are intended to assist eligible Australians to consider their financing options when buying their first home. It is important to understand the application process and loan features before committing.",
          "Haven Brokers helps you examine home financing choices appropriate for your situation. Understanding home loan eligibility and comparing home loan interest rates can help first-time buyers make informed decisions.",
        ],
      },
      {
        heading: "Understand First Home Buyer Loans",
        paragraphs: [
          "Gain an understanding of the various home loan products before applying. Lenders consider your financial situation to help decide whether you qualify for a loan and how much you may be able to borrow. Getting prepared early can help you feel more confident when entering the property market.",
          `Some key factors to remember:
• Establish your budget and the price range you are looking for.
• Estimate your deposit and upfront costs.
• Examine your cash flow, obligations and regular expenses.
• Look into government programs that may help first-time home buyers.
• Review whether fixed or variable repayments may suit you.`,
          "Knowing these factors can help narrow your choices and prepare you for the next step in the purchasing process.",
        ],
      },
      {
        heading: "Determine Your Home Loan Eligibility",
        image: "/images/home-loan-eligibility.jpg",
        paragraphs: [
          "Home loan eligibility can depend on income stability, employment, credit history, living expenses and existing liabilities. Requirements vary between lenders, so reviewing your finances can help identify areas that may need attention.",
          `When preparing an application:
• Check your income and collect payslips, tax returns and other financial statements.
• Review existing debts, including credit cards and personal loans, as these may affect borrowing power.
• Review your credit report and correct inaccuracies where possible.
• Organise your deposit and understand any mortgage insurance expenses that may apply.
• Find out what pre-approval means and what you may be able to afford before making offers.`,
          "A mortgage broker can help you understand lender requirements and identify financing options that may fit your situation.",
        ],
      },
      {
        heading: "Understand Your Home Loan Terms and Conditions",
        paragraphs: [
          "Home loan interest rates affect the overall cost of borrowing and the repayments you make over time. The lowest advertised rate may not be the best choice for every borrower, so compare rates alongside fees, loan features and repayment flexibility.",
          `As you compare first home buyer loans, consider:
• Fixed interest rates, which keep the rate unchanged for an agreed period.
• Variable interest rates, which can change and affect repayments.
• Comparison rates, which include interest and certain loan fees.
• Application, ongoing and other charges that may apply.
• Whether extra repayments and offset account features suit your needs.`,
          "Reviewing these details can help you understand the financial implications of different loan products over the long term.",
        ],
      },
      {
        heading: "Choose the Right Mortgage Broker",
        paragraphs: [
          "Understanding lender policies and procedures can be complex, especially for first-time buyers. A mortgage broker can explain possible options, compare products and guide you through the mortgage process.",
          "Haven Brokers provides home finance broking services to help clients explore and better understand home loans and financing options.",
          `When choosing a broker, look for:
• Experience with first home buyer applications.
• Clear explanations of loan products and eligibility.
• Transparency about costs and charges.
• Help throughout the application process.`,
          "With this knowledge, you can approach your home purchase with a better understanding of the options available.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Buying a first home calls for careful budgeting, preparation and an understanding of your finances. Comparing first home buyer loans, checking your eligibility and reviewing home loan interest rates can help you make better-informed financing decisions.",
          "Haven Brokers can help you navigate the available home loan choices. Review your budget and loan terms, and seek independent financial or legal advice where appropriate before committing.",
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
  "mortgage-broker-melbourne-australia-tips-for-property-investors": {
    sections: [
      {
        paragraphs: [
          "Investing in real estate is a good method of accumulating wealth over the long term. But it does take planning to select the right property and financing to ensure that it is the right choice for your needs. A mortgage broker in Melbourne can help investors understand different loan options, compare loan features and evaluate readiness for investment. Investors at Haven Brokers can discuss financing options that suit their property objectives and individual situation.",
          "From first-home investing to building a property portfolio, understanding investment property loans and property investment finance can help investors make informed decisions.",
        ],
      },
      {
        heading: "Define Your Investment Goals",
        paragraphs: [
          "Set financial goals before you buy a property. Some investors look for rental income, while others are interested in long-term capital gains. Your goals influence the type of property, location, budget and financing you choose.",
          "Key issues to take into account:",
          `• Set investment goals and a possible time horizon.
• Set a realistic budget for your purchase.
• Conduct a rental market analysis.
• Factor in costs such as maintenance, insurance and property management.
• Evaluate the investment in relation to your overall financial plans.`,
          "With clear goals established first, properties can be evaluated more consistently, helping you avoid decisions based only on short-term market trends.",
        ],
      },
      {
        heading: "Compare Investment Property Loans Carefully",
        paragraphs: [
          "There is more to selecting appropriate investment property loans than comparing advertised interest rates. Loan terms, total costs, repayment terms and eligibility can all affect the overall cost of borrowing. Review the entire loan package before committing.",
          `Factors to consider when comparing loans:
• Interest rates: determine the applicable rates and, if variable, understand how they may change.
• Loan fees: review application charges, ongoing charges and other possible fees.
• Repayment flexibility: consider whether additional repayment options or features suit your plan.
• Loan-to-value ratio: understand how your deposit and property valuation may affect borrowing.
• Lender guidelines: check income, expenses, credit history and other eligibility criteria.`,
          "A mortgage broker in Melbourne can help you discuss available options and the possibilities offered by different loan structures.",
        ],
      },
      {
        heading: "Plan Your Property Investment Finance",
        image: "/images/investment-property-loans.jpg",
        paragraphs: [
          "Successful property investment finance involves being realistic about initial costs and ongoing commitments. Apart from the deposit, investors should also prepare for stamp duty, conveyancing, inspections, insurance and property management.",
          `To reinforce your financial planning:
• Calculate the overall initial expenses involved in the purchase.
• Estimate rental income conservatively rather than assuming the property will always be occupied.
• Leave room for repairs, maintenance and unforeseen costs.
• Check whether you could afford repayments if interest rates rise or rents fall.
• Keep an emergency fund to help manage cash flow during vacancies.`,
          "Talk to a professional tax adviser about the tax consequences of owning and borrowing for property. This can help you understand how a financing choice may affect your investment strategy.",
        ],
      },
      {
        heading: "Choose an Experienced Mortgage Broker",
        paragraphs: [
          "Understanding lender requirements can be difficult, especially when comparing different lenders. A mortgage broker in Melbourne can explain available products, discuss criteria you may be eligible for and organise the information needed to apply for a loan.",
          "Haven Brokers offers finance broking services to help clients explore home loans, investment property finance and other finance options.",
          `When choosing a broker, look for:
• Experience with investment property purchases and lending.
• Clear fee and commission disclosures, and transparent lender relationships.
• A proper explanation of loan terms and conditions.
• Guidance through the application process.`,
          "With the right information, it becomes easier to compare options and determine which financing methods match your investment goals.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "The key fundamentals of successful property investing are thorough research, realistic budgeting and an appropriate financing approach. Investors can make informed decisions by comparing investment property loans, planning property investment finance and understanding lender requirements.",
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
  const articleImage = "image" in post ? post.image : undefined;

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

      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {articleImage && (
            <img
              src={articleImage}
              alt={post.title}
              className="mb-10 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg"
              fetchPriority="high"
            />
          )}
          <div className="mx-auto max-w-3xl">
          {content?.sections.map((section, i) => (
            <div key={i} className="mb-10">
              {section.heading && (
                <h2 className="font-serif text-2xl font-semibold text-navy-950 sm:text-3xl">{section.heading}</h2>
              )}
              {"image" in section && section.image && (
                <img src={section.image} alt={section.heading ?? post.title} className="my-6 aspect-[16/9] w-full rounded-xl object-cover" loading="lazy" />
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className={`whitespace-pre-line text-base leading-8 text-navy-900/80 ${section.heading || j > 0 ? "mt-4" : ""}`}>
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-12 rounded-xl border border-navy-900/10 bg-cream-100 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-navy-900/70">
              This article is for general information only and does not constitute personal financial advice. Please speak with a qualified finance professional before making decisions based on this content.
            </p>
          </div>
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
