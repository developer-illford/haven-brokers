# Haven Brokers Website

A modern, responsive mortgage and finance broker website for **Haven Brokers** — built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Pages:** Home, About, Services, Contact, Loan Calculator, Resources/Blog
- **Components:** Header, Footer, Hero, ServiceCard, ProcessSteps, Testimonials, ContactForm, CTASection, LoanCalculator
- **Contact form:** Integrated with [Resend](https://resend.com) for email notifications
- **Design:** Navy blue & gold brand palette matching the Haven logo
- **Responsive:** Desktop, tablet, and mobile with sticky header and hamburger menu

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd haven-brokers
npm install
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local` with your Resend credentials:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_TO_EMAIL=info@havenbrokers.com.au
RESEND_FROM_EMAIL=Haven Brokers <info@havenbrokers.com.au>
```

> **Note:** For production, verify your domain in Resend and use a `@havenbrokers.com.au` from address. During development, you can use `onboarding@resend.dev` as the from address.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Deployment

### Netlify (recommended)

1. Sign in at [netlify.com](https://www.netlify.com) with GitHub (`deidikos-sketch`).
2. **Add new site → Import an existing project** → select the `havenbrokers` repo.
3. Netlify reads `netlify.toml` at the repo root (base directory: `haven-brokers`).
4. In **Project configuration → Build & deploy → Build settings**, ensure **Publish directory is blank** (do not set it to `haven-brokers` — that causes deploy failures).
5. Add **Environment variables** under Site settings → Environment variables:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_TO_EMAIL=info@havenbrokers.com.au
RESEND_FROM_EMAIL=Haven Brokers <info@havenbrokers.com.au>
```

5. Deploy. After the first successful build, go to **Domain management** → add `havenbrokers.com.au` and `www.havenbrokers.com.au`.
6. In **GoDaddy DNS**, add the records Netlify provides (usually an A record and CNAME for `www`).

### Other hosts

Deploy to Vercel or any Node.js host. Set the same environment variables in your deployment dashboard.

## Customisation

Update placeholder content in `src/lib/constants.ts`:

- Phone number, email, address, business hours in `src/lib/constants.ts`
- Service descriptions and testimonials
- Blog posts and resources

Replace the logo at `public/images/haven-logo.png` if needed.

## Disclaimer

The footer includes a general advice disclaimer as required for Australian finance broker websites. Review with your compliance adviser before going live.
