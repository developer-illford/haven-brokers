import { NextResponse } from "next/server";
import { Resend } from "resend";

interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  loanType?: string;
  loanAmount?: string;
  contactMethod?: string;
  message?: string;
  consent: boolean;
}

function validatePayload(body: unknown): EnquiryPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;

  if (
    typeof data.fullName !== "string" ||
    !data.fullName.trim() ||
    typeof data.email !== "string" ||
    !data.email.includes("@") ||
    typeof data.phone !== "string" ||
    !data.phone.trim() ||
    data.consent !== true
  ) {
    return null;
  }

  return {
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    loanType: typeof data.loanType === "string" ? data.loanType : undefined,
    loanAmount: typeof data.loanAmount === "string" ? data.loanAmount : undefined,
    contactMethod: typeof data.contactMethod === "string" ? data.contactMethod : undefined,
    message: typeof data.message === "string" ? data.message : undefined,
    consent: true,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validatePayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Please fill in all required fields and accept the consent checkbox." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us directly." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.RESEND_TO_EMAIL || "info@havenbrokers.com.au";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Haven Brokers <info@havenbrokers.com.au>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New Enquiry from ${payload.fullName} — Haven Brokers`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0B1D33; padding: 24px; text-align: center;">
            <h1 style="color: #C5A059; margin: 0; font-size: 24px;">New Website Enquiry</h1>
            <p style="color: #ffffff; margin: 8px 0 0; opacity: 0.8;">Haven Brokers</p>
          </div>
          <div style="padding: 24px; background: #faf8f5;">
            <h2 style="color: #0B1D33; font-size: 18px; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 160px;">Full Name</td><td style="padding: 8px 0; color: #0B1D33; font-weight: bold;">${payload.fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; color: #0B1D33;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0; color: #0B1D33;"><a href="tel:${payload.phone}">${payload.phone}</a></td></tr>
              ${payload.loanType ? `<tr><td style="padding: 8px 0; color: #666;">Loan Type</td><td style="padding: 8px 0; color: #0B1D33;">${payload.loanType}</td></tr>` : ""}
              ${payload.loanAmount ? `<tr><td style="padding: 8px 0; color: #666;">Estimated Amount</td><td style="padding: 8px 0; color: #0B1D33;">${payload.loanAmount}</td></tr>` : ""}
              ${payload.contactMethod ? `<tr><td style="padding: 8px 0; color: #666;">Preferred Contact</td><td style="padding: 8px 0; color: #0B1D33;">${payload.contactMethod}</td></tr>` : ""}
            </table>
            ${payload.message ? `<h2 style="color: #0B1D33; font-size: 18px;">Message</h2><p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${payload.message}</p>` : ""}
          </div>
          <div style="padding: 16px 24px; background: #0B1D33; text-align: center;">
            <p style="color: #ffffff; opacity: 0.6; font-size: 12px; margin: 0;">Submitted via havenbrokers.com.au contact form</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send enquiry. Please try again or call us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
