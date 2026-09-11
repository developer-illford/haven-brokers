# Haven Brokers — Setup & Deployment Reference

Use this document when you need to update the website, redeploy, troubleshoot, or onboard someone to the project.

---

## 1. Business & brand overview

| Item | Details |
|------|---------|
| **Business name** | Haven Brokers |
| **Website domain** | [havenbrokers.com.au](https://havenbrokers.com.au) |
| **Tagline** | Mortgage & Finance |
| **Phone** | +61 449 786 135 |
| **Email** | info@havenbrokers.com.au |
| **Email alias** | majupc@havenbrokers.com.au |
| **Address** | 5/50 Thomas Street, Dandenong, VIC 3175 |
| **Business hours** | Monday – Friday: 9:00am – 5:30pm |

---

## 2. Platforms & what each one does

| Platform | Purpose | Login / account |
|----------|---------|-----------------|
| **GoDaddy** | Domain registration (`havenbrokers.com.au`) + business email | [godaddy.com](https://www.godaddy.com) |
| **Microsoft 365 (via GoDaddy)** | Business email inbox for `info@havenbrokers.com.au` | GoDaddy → Email & Office → Open Outlook |
| **GitHub** | Source code repository | Account: **deidikos-sketch** · Repo: **havenbrokers** |
| **Netlify** | Free website hosting (builds & serves the site) | [app.netlify.com](https://app.netlify.com) — sign in with GitHub |
| **Resend** | Sends contact form enquiry emails to your inbox | [resend.com](https://resend.com) |

### How they connect

```
Visitor → havenbrokers.com.au (GoDaddy DNS → Netlify)
       → Contact form → Netlify API → Resend → info@havenbrokers.com.au (Outlook)
       
You edit code → GitHub → Netlify auto-deploys
```

---

## 3. Email setup

### Business email (day-to-day use)

- **Address:** `info@havenbrokers.com.au`
- **Provider:** Microsoft 365 / Outlook (purchased through **GoDaddy**)
- **Used for:** Client emails, receiving website enquiry notifications, `RESEND_TO_EMAIL`

### Email aliases (Microsoft 365 via GoDaddy)

| Alias | Address | Notes |
|-------|---------|-------|
| Primary mailbox | `info@havenbrokers.com.au` | Main business inbox |
| Alias | `majupc@havenbrokers.com.au` | Forwards to / shares the same mailbox as configured in GoDaddy Microsoft 365 |

Both addresses can receive email in the same Outlook inbox (depending on your GoDaddy alias setup). Manage aliases in **GoDaddy → Email & Office → Manage → Aliases**.

**To access inbox:**
1. Log in to GoDaddy
2. Go to **Email & Office** → your Microsoft 365 plan
3. Open **Outlook** (web or desktop app)

### Transactional email (contact form only)

- **Provider:** **Resend** ([resend.com](https://resend.com))
- **From address:** `Haven Brokers <info@havenbrokers.com.au>`
- **To address:** `info@havenbrokers.com.au`
- **Domain:** `havenbrokers.com.au` — **verified** in Resend (DNS records added in GoDaddy)

Resend does **not** replace Outlook. It only sends automated emails when someone submits the website contact form.

---

## 4. GitHub (source code)

| Item | Value |
|------|-------|
| **Account** | deidikos-sketch |
| **Repository** | havenbrokers |
| **URL** | https://github.com/deidikos-sketch/havenbrokers |
| **Branch** | main |
| **Website code folder** | `haven-brokers/` |

### What is in the repo

- `haven-brokers/` — Next.js website (pages, components, styles)
- `netlify.toml` — Netlify build configuration (repo root)
- `.gitignore` — Excludes secrets and local Python projects

### What must NEVER be committed

- `haven-brokers/.env.local` (contains Resend API key)
- Root `.env` (local Python/database secrets)
- `node_modules/`

### Push changes to GitHub

```bash
cd /Users/asfakesra/Desktop/Level1-100x
git add haven-brokers/   # or specific files
git commit -m "Describe your change"
git push origin main
```

Or use **Cursor → Source Control** (`Cmd + Shift + G`) → **Push**.

---

## 5. Netlify (website hosting)

| Item | Value |
|------|-------|
| **Site name** | havenbrokers (or your Netlify site name) |
| **Plan** | Free |
| **Connected to** | GitHub repo `deidikos-sketch/havenbrokers` |
| **Auto-deploy** | Yes — every push to `main` triggers a new deploy |

### Required build settings

Go to **Project configuration → Build & deploy → Build settings:**

| Setting | Value |
|---------|-------|
| **Base directory** | `haven-brokers` |
| **Build command** | `npm run build` |
| **Publish directory** | **Leave blank** (empty) |
| **Node version** | 22 (set in `netlify.toml`) |

> **Important:** If Publish directory is set to `haven-brokers`, the deploy will **fail**. It must be blank — the Next.js plugin handles output automatically.

### Environment variables (Netlify)

Go to **Project configuration → Environment variables** and set:

| Variable | Example value |
|----------|---------------|
| `RESEND_API_KEY` | Your Resend API key (`re_...`) |
| `RESEND_TO_EMAIL` | `info@havenbrokers.com.au` |
| `RESEND_FROM_EMAIL` | `Haven Brokers <info@havenbrokers.com.au>` |

Apply to **Production** (and Preview if you want forms to work on preview deploys).

### Redeploy manually

**Deploys → Trigger deploy → Deploy site**

### Custom domain (GoDaddy → Netlify)

1. Netlify → **Domain management → Add a domain**
2. Add `havenbrokers.com.au` and `www.havenbrokers.com.au`
3. Netlify shows DNS records to add in **GoDaddy DNS**

Typical records:

| Type | Name | Value |
|------|------|-------|
| **A** | `@` | Netlify IP (shown in Netlify, e.g. `75.2.60.5`) |
| **CNAME** | `www` | Your Netlify site URL (e.g. `something.netlify.app`) |

Remove conflicting GoDaddy parking records for `@` and `www`.

DNS can take up to 24–48 hours; HTTPS is automatic once verified.

---

## 6. Resend (contact form emails)

| Item | Value |
|------|-------|
| **Dashboard** | [resend.com/emails](https://resend.com/emails) |
| **Domain** | havenbrokers.com.au (verified) |
| **API keys** | [resend.com/api-keys](https://resend.com/api-keys) |

### Environment variables (same on Netlify and local)

```env
RESEND_API_KEY=re_your_key_here
RESEND_TO_EMAIL=info@havenbrokers.com.au
RESEND_FROM_EMAIL=Haven Brokers <info@havenbrokers.com.au>
```

### Test email locally

```bash
cd haven-brokers
npm run test:email
```

### Test contact form live

1. Visit https://havenbrokers.com.au/contact
2. Submit a test enquiry
3. Check `info@havenbrokers.com.au` inbox (and spam/junk)

### Rotate API key (if exposed)

1. Resend → API Keys → create new key, revoke old one
2. Update Netlify environment variables
3. Update local `haven-brokers/.env.local`

---

## 7. Local development

### Prerequisites

- Node.js 20+ (22 recommended)
- npm

### First-time setup

```bash
cd haven-brokers
npm install
cp .env.example .env.local
# Edit .env.local with your Resend credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Common commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server |
| `npm run build` | Production build (test before deploy) |
| `npm run test:email` | Send test email via Resend |
| `npm run lint` | Check code quality |

---

## 8. Updating website content

Most editable content is in one file:

**`haven-brokers/src/lib/constants.ts`**

| What to change | Where |
|----------------|-------|
| Phone, email, address, hours | `siteConfig` object |
| Navigation links | `navLinks` |
| Services list | `services` |
| Testimonials | `testimonials` |
| Blog posts | `blogPosts` |
| Footer disclaimer | `siteConfig.disclaimer` |

**Logo:** replace `haven-brokers/public/images/haven-logo.png`

After editing:

```bash
git add haven-brokers/
git commit -m "Update contact details / content"
git push origin main
```

Netlify redeploys automatically.

---

## 9. Website pages

| Page | URL path |
|------|----------|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Contact | `/contact` |
| Loan calculator | `/calculator` |
| Resources / blog | `/resources` |

---

## 10. Troubleshooting

### Netlify deploy failed: “publish directory cannot be the same as base directory”

- **Fix:** Clear **Publish directory** in Netlify build settings (leave blank)
- Ensure `netlify.toml` exists at repo root with `base = "haven-brokers"`

### Contact form shows error on live site

1. Check Netlify env vars: `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `RESEND_FROM_EMAIL`
2. Confirm domain is verified in Resend
3. Check Resend dashboard for failed sends
4. Redeploy after changing env vars

### Emails go to spam

- Ensure `havenbrokers.com.au` DNS (SPF, DKIM) records from Resend are still in GoDaddy
- Check Resend domain status is “Verified”

### Git push fails from terminal

- Use Cursor Source Control → Push (uses GitHub login)
- Or install GitHub CLI: `brew install gh && gh auth login`

### Changes not showing on live site

1. Confirm push reached GitHub (`main` branch)
2. Netlify → Deploys — check latest deploy succeeded
3. Hard refresh browser (`Cmd + Shift + R`) or clear cache

---

## 11. Security checklist

- [ ] Never commit `.env.local` or real API keys to GitHub
- [ ] Rotate Resend API key if it was ever shared publicly
- [ ] Keep GitHub repo private until ready to go fully public
- [ ] Display **ABN** (and ACL/credit licence if applicable) on website before going live as a registered business
- [ ] Add a **Privacy Policy** page (contact form collects personal data)

---

## 12. Quick reference — logins

| Service | URL | Username / account |
|---------|-----|-------------------|
| GoDaddy | godaddy.com | Your GoDaddy account |
| Outlook email | outlook.com | info@havenbrokers.com.au |
| Outlook email alias | outlook.com | majupc@havenbrokers.com.au |
| GitHub | github.com | deidikos-sketch |
| Netlify | app.netlify.com | Sign in with GitHub |
| Resend | resend.com | Your Resend account |

### Login credentials (personal reference)

| Platform | Login email / username | Password |
|----------|------------------------|----------|
| **GoDaddy** | havenbrokersadmin@gmail.com | **** |
| **Microsoft 365** | (via GoDaddy) · recovery email: havenbrokersadmin@gmail.com | — |
| **GitHub** | deidikos@gmail.com | **** |
| **Netlify** | deidikos@gmail.com | **** |
| **Resend** | deidikos@gmail.com | **** |
| **Cursor** | asfakesra@gmail.com | *** |

> **Note:** Replace `****` / `***` with your actual passwords from your password manager. Do not commit real passwords to a public GitHub repo. Keep this file private or store passwords in a password manager instead.

---

## 13. Monthly / as-needed tasks

- Check contact form still delivers to `info@havenbrokers.com.au`
- Review Netlify deploy logs if site is down
- Update blog/resources content in `constants.ts` as needed
- Renew GoDaddy domain annually
- Renew Microsoft 365 email subscription via GoDaddy

---

*Last updated: July 2026 · Haven Brokers website (Next.js + Netlify + Resend)*
