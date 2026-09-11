export const siteConfig = {
  name: "Haven Brokers",
  tagline: "Mortgage & Finance",
  domain: "havenbrokers.com.au",
  url: "https://havenbrokers.com.au",
  description:
    "Haven Brokers is an Australian mortgage and finance brokerage helping home buyers, refinancers, investors, and businesses find the right loan solutions.",
  phone: "+61 449 786 135",
  phoneHref: "tel:+61449786135",
  landline: "(03) 9999 7949",
  landlineHref: "tel:+61399997949",
  email: "info@havenbrokers.com.au",
  address: "5/50 Thomas Street, Dandenong, VIC 3175",
  hours: "Monday – Friday: 9:00am – 5:30pm",
  logo: "/images/haven-logo.png",
  disclaimer:
    "Information on this website is general in nature and does not take into account your personal objectives, financial situation or needs. Please speak with a qualified finance professional before making financial decisions.",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Calculator", href: "/calculator" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const loanTypes = [
  "Home Loan",
  "First Home Buyer",
  "Refinancing",
  "Investment Property",
  "Commercial Loan",
  "Asset Finance",
  "Personal Loan",
  "Other",
] as const;

export const contactMethods = ["Phone", "Email", "Either"] as const;

export const services = [
  {
    id: "home-loans",
    title: "Home Loans",
    slug: "home-loans",
    icon: "home",
    shortDescription:
      "As a dedicated home loan broker serving clients across Australia, we tailor home loan solutions from a wide panel of Australian lenders, helping owner-occupiers purchase or build residential properties.",
    whoFor: "Owner-occupiers purchasing or building a residential property.",
    benefits: [
      "Access to competitive rates across multiple lenders",
      "Guidance through pre-approval and settlement",
      "Clear comparison of loan features and fees",
    ],
  },
  {
    id: "first-home-buyers",
    title: "First Home Buyers",
    slug: "first-home-buyers",
    icon: "key",
    shortDescription:
      "Our first home buyer loans come with step-by-step support for Australians entering the property market — from understanding grants to comparing house loans for first time buyers side by side.",
    whoFor: "First-time buyers navigating grants, deposits, and lending criteria.",
    benefits: [
      "Help understanding government schemes and incentives",
      "Budget planning and borrowing capacity assessment",
      "Confidence through every stage of your first purchase",
    ],
  },
  {
    id: "refinancing",
    title: "Refinancing",
    slug: "refinancing",
    icon: "refresh",
    shortDescription:
      "Looking to refinance your home loan? Our experienced refinance broker team can review your existing loan, compare available options, and help you find better rates or features. We provide tailored mortgage refinancing solutions designed around your financial goals and individual circumstances, wherever you are in Australia.",
    whoFor: "Homeowners looking to reduce repayments or consolidate debt.",
    benefits: [
      "Potential savings through lower interest rates",
      "Flexible repayment and offset options",
      "Streamlined switch with minimal disruption",
    ],
  },
  {
    id: "investment-property",
    title: "Investment Property Loans",
    slug: "investment-property",
    icon: "chart",
    shortDescription:
      "As experienced mortgage brokers specialising in investment property finance, we help investors across Australia compare suitable investment property loans to build or expand their residential property portfolios.",
    whoFor: "Investors building or expanding a residential property portfolio.",
    benefits: [
      "Interest-only and portfolio lending options",
      "Structure advice aligned with your investment goals",
      "Access to specialist investor-friendly lenders",
    ],
  },
  {
    id: "commercial-loans",
    title: "Commercial Loans",
    slug: "commercial-loans",
    icon: "building",
    shortDescription:
      "As experienced commercial mortgage brokers in Australia, we help business owners and property developers secure suitable commercial property loans for growth, investment, and acquisition. From application through to settlement, our dedicated commercial loan broker team provides tailored guidance and support at every stage. ",
    whoFor: "Business owners, developers, and commercial property investors.",
    benefits: [
      "Tailored terms for commercial acquisitions and expansion",
      "Access to bank and non-bank commercial lenders",
      "Support with documentation and application process",
    ],
  },
  {
    id: "asset-finance",
    title: "Asset Finance",
    slug: "asset-finance",
    icon: "truck",
    shortDescription:
      "As an experienced business loan broker in Australia, we help companies secure funding for equipment, vehicles, and other business needs. We structure tailored asset finance solutions for businesses and individuals looking to finance cars, machinery, or equipment.",
    whoFor: "Businesses and individuals financing cars, machinery, or equipment.",
    benefits: [
      "Competitive chattel mortgage and lease options",
      "Flexible terms to match cash flow",
      "Fast turnaround for approved applications",
    ],
  },
  {
    id: "personal-loans",
    title: "Personal Loans",
    slug: "personal-loans",
    icon: "wallet",
    shortDescription:
      "Our personal loan broker team helps clients across Australia arrange suitable unsecured and secured personal loans for planned expenses such as home renovations, travel, or debt consolidation. We compare available options and tailor finance solutions to suit your individual circumstances and goals.",
    whoFor: "Individuals seeking finance for renovations, travel, or consolidation.",
    benefits: [
      "Competitive rates from trusted lenders",
      "Fixed and variable repayment options",
      "Simple application with broker support",
    ],
  },
] as const;

export const whyChooseUs = [
  {
    title: "Wide Lender Panel",
    description:
      "We compare options from major banks, regional lenders, and specialist financiers to find a solution that fits your goals.",
  },
  {
    title: "Personalised Guidance",
    description:
      " Every client receives tailored advice, not a one-size-fits-all product.",
  },
  {
    title: "Transparent Process",
    description:
      "Clear communication at every step, so you always know where your application stands.",
  },
  {
    title: "Australian Expertise",
    description:
      "Our brokers understand local lending criteria, grants and market conditions.",
  },
  {
    title: "End-to-End Support",
    description:
      " From initial enquiry through to settlement and beyond.",
  },
  {
    title: "No Cost to You",
    description:
      "In most cases, our broker service is paid by the lender.",
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Initial Consultation",
    description:
      "Tell us about your goals, finances, and timeline.",
  },
  {
    step: 2,
    title: "Compare & Recommend",
    description:
      "We research and compare suitable loans from our lender panel.",
  },
  {
    step: 3,
    title: "Application & Approval",
    description:
      "We manage the paperwork and liaise with lenders until conditional approval.",
  },
  {
    step: 4,
    title: "Settlement & Beyond",
    description:
      "Settlement & Beyond — We coordinate settlement and remain available for future reviews.",
  },
] as const;

export const testimonials = [
  {
    name: "Sarah M.",
    location: "Melbourne, VIC",
    quote:
      "Haven Brokers made our first home purchase straightforward. They explained every option clearly and secured a great rate for us.",
    service: "First Home Buyer",
  },
  {
    name: "James & Priya T.",
    location: "Sydney, NSW",
    quote:
      "We refinanced through Haven and saved over $300 per month. The process was smooth and completely stress-free.",
    service: "Refinancing",
  },
  {
    name: "David L.",
    location: "Brisbane, QLD",
    quote:
      "As a property investor, I need a broker who understands portfolio lending. Haven delivered exactly that — professional and responsive.",
    service: "Investment Property",
  },
] as const;

export const blogPosts = [
  {
    slug: "first-home-buyer-guide-2026",
    title: "First Home Buyer's Guide: What You Need to Know in 2026",
    excerpt:
      "From saving your deposit to understanding grants and pre-approval, here's a practical roadmap for entering the property market.",
    category: "First Home Buyers",
    date: "2026-03-15",
    readTime: "6 min read",
  },
  {
    slug: "when-to-refinance-your-home-loan",
    title: "When Is the Right Time to Refinance Your Home Loan?",
    excerpt:
      "Refinancing can save you thousands — but timing matters. Learn the key signs that it might be time to review your current loan.",
    category: "Refinancing",
    date: "2026-02-28",
    readTime: "5 min read",
  },
  {
    slug: "investment-property-finance-basics",
    title: "Investment Property Finance: The Essentials",
    excerpt:
      "Interest-only vs principal & interest, LVR considerations, and how lenders assess rental income for investment loans.",
    category: "Investing",
    date: "2026-02-10",
    readTime: "7 min read",
  },
  {
    slug: "understanding-loan-pre-approval",
    title: "Understanding Loan Pre-Approval: A Broker's Perspective",
    excerpt:
      "Pre-approval gives you confidence when making an offer. Here's what it involves and how to strengthen your application.",
    category: "Home Loans",
    date: "2026-01-22",
    readTime: "4 min read",
  },
] as const;
