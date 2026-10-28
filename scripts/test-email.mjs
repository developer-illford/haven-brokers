/**
 * Test Resend integration with verified domain.
 * Run: node scripts/test-email.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

function loadEnv() {
  const env = {};
  try {
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      env[key] = rest.join("=");
    }
  } catch {
    console.error("Could not read .env.local");
    process.exit(1);
  }
  return env;
}

const env = loadEnv();
const apiKey = env.RESEND_API_KEY;
const to = env.RESEND_TO_EMAIL || "info@havenbrokers.com.au";
const from = env.RESEND_FROM_EMAIL || "Haven Brokers <info@havenbrokers.com.au>";

if (!apiKey) {
  console.error("RESEND_API_KEY missing in .env.local");
  process.exit(1);
}

console.log("Sending test email...");
console.log(`  From: ${from}`);
console.log(`  To:   ${to}`);

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: "Haven Brokers — Contact Form Test",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0B1D33;padding:24px;text-align:center;">
          <h1 style="color:#C5A059;margin:0;">Test Successful</h1>
          <p style="color:#fff;opacity:0.8;">Haven Brokers enquiry notifications</p>
        </div>
        <div style="padding:24px;">
          <p>Your verified domain <strong>havenbrokers.com.au</strong> is sending correctly via Resend.</p>
          <p>Contact form submissions will arrive at <strong>${to}</strong>.</p>
        </div>
      </div>
    `,
  }),
});

const data = await response.json();

if (!response.ok) {
  console.error("\nFailed:", data);
  process.exit(1);
}

console.log("\nSuccess! Email sent.");
console.log("  Resend ID:", data.id);
console.log(`\nCheck ${to} (and spam folder if needed).`);
