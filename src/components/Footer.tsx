import Link from "next/link";
import Image from "next/image";
import { navLinks, services, siteConfig } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Image
              src={siteConfig.logo}
              alt="Haven Brokers"
              width={160}
              height={48}
              className="h-12 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/70">
              Your trusted Australian mortgage and finance partner. We help you find the right loan with clarity and confidence.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-400">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-400">Our Services</h3>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-sm text-white/70 transition-colors hover:text-gold-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-400">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a href={siteConfig.landlineHref} className="transition-colors hover:text-gold-400">
                  {siteConfig.landline}
                </a>
              </li>
              <li>
                <a href={siteConfig.phoneHref} className="transition-colors hover:text-gold-400">
                  Mobile: {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-gold-400">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
              <li className="text-white/50">{siteConfig.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-white/50">{siteConfig.disclaimer}</p>
          <p className="mt-4 text-xs text-white/40">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
