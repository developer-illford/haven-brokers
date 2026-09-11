import Link from "next/link";

const icons: Record<string, React.ReactNode> = {
  home: (
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  ),
  key: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499a1.875 1.875 0 0 1 1.591-.659H15.75Z" />
  ),
  refresh: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  ),
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  ),
  building: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  ),
  truck: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a49.902 49.902 0 0 0-2.227-5.129M15 9.75V6.375a1.125 1.125 0 0 0-1.125-1.125H4.125A1.125 1.125 0 0 0 3 6.375V9.75" />
  ),
  wallet: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
  ),
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
  showCta?: boolean;
}

export default function ServiceCard({
  title,
  description,
  icon = "home",
  href = "/contact",
  showCta = true,
}: ServiceCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-navy-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-lg hover:shadow-navy-950/5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-950/5 text-gold-500 transition-colors group-hover:bg-gold-500/10">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          {icons[icon] ?? icons.home}
        </svg>
      </div>
      <h3 className="font-serif text-xl font-semibold text-navy-950">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-900/70">{description}</p>
      {showCta && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
        >
          Speak to a Broker
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      )}
    </div>
  );
}
