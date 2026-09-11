import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 pt-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">404</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-navy-950">Page Not Found</h1>
        <p className="mt-4 text-navy-900/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-all hover:bg-gold-400"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
