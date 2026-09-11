
import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "mortgage broker",
    "home loans Australia",
    "refinancing",
    "first home buyer",
    "investment property loans",
    "commercial finance",
    "Haven Brokers",
  ],

  // Google Search Console Verification
  verification: {
    google: "HvIiAUNIbPtYtw5_RBfEbUwcUJP_7svMp_HVXqso-hI",
  },

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${playfair.variable} ${sourceSans.variable}`}
    >
      <head>
        {/* =========================================
            Google Tag Manager
            ========================================= */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NMLWZZLD');
          `}
        </Script>
      </head>

      <body className="font-sans">
        {/* =========================================
            Google Tag Manager - NoScript
            ========================================= */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NMLWZZLD"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* =========================================
            Google Analytics 4
            ========================================= */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QVWXB6HXD9"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QVWXB6HXD9');
          `}
        </Script>

        {/* =========================================
            Website Header
            ========================================= */}
        <Header />

        {/* =========================================
            Main Website Content
            ========================================= */}
        <main>{children}</main>

        {/* =========================================
            Website Footer
            ========================================= */}
        <Footer />
      </body>
    </html>
  );
}

