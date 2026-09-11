import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  calculateBorrowingCapacity,
  formatAud,
  validateBorrowingInput,
} from "@/lib/borrowingCapacity";
import { generateAssessmentPdf } from "@/lib/generateAssessmentPdf";
import { siteConfig } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = validateBorrowingInput(body);

    if (!input) {
      return NextResponse.json(
        { error: "Please complete all required fields and accept the consent checkbox." },
        { status: 400 }
      );
    }

    if (input.applicant1GrossAnnual <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid annual income for the primary applicant." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us directly." },
        { status: 503 }
      );
    }

    const result = calculateBorrowingCapacity(input);
    const pdfBuffer = await generateAssessmentPdf(input, result);
    const pdfBase64 = pdfBuffer.toString("base64");
    const fileName = `Haven-Brokers-Borrowing-Assessment-${input.fullName.replace(/\s+/g, "-")}.pdf`;

    const brokerEmail = process.env.RESEND_TO_EMAIL || siteConfig.email;
    const fromEmail = process.env.RESEND_FROM_EMAIL || `Haven Brokers <${siteConfig.email}>`;

    const resend = new Resend(apiKey);

    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1D33; padding: 24px; text-align: center;">
          <h1 style="color: #C5A059; margin: 0;">Your Borrowing Capacity Assessment</h1>
          <p style="color: #fff; opacity: 0.8; margin: 8px 0 0;">Haven Brokers</p>
        </div>
        <div style="padding: 24px; background: #faf8f5;">
          <p>Hi ${input.fullName},</p>
          <p>Thank you for using the Haven Brokers borrowing capacity calculator. Your personalised assessment is attached as a PDF.</p>
          <div style="background: #0B1D33; color: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; color: #C5A059; font-size: 14px;">Estimated Borrowing Capacity</p>
            <p style="margin: 8px 0 0; font-size: 28px; font-weight: bold;">${formatAud(result.estimatedBorrowingCapacity)}</p>
            <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.8;">Indicative purchase price: ${formatAud(result.indicativePurchasePrice)}</p>
          </div>
          <p>This is an estimate only — not a loan approval. A Haven Brokers adviser can review your full situation and compare lender options with you.</p>
          <p><a href="${siteConfig.url}/contact" style="color: #C5A059; font-weight: bold;">Book a free consultation →</a></p>
        </div>
        <div style="padding: 16px 24px; background: #0B1D33; text-align: center;">
          <p style="color: #fff; opacity: 0.6; font-size: 12px; margin: 0;">${siteConfig.disclaimer}</p>
        </div>
      </div>
    `;

    const { error: clientError } = await resend.emails.send({
      from: fromEmail,
      to: [input.email],
      replyTo: brokerEmail,
      subject: `Your Borrowing Capacity Assessment — Haven Brokers`,
      html: clientHtml,
      attachments: [{ filename: fileName, content: pdfBase64 }],
    });

    if (clientError) {
      console.error("Resend client email error:", clientError);
      return NextResponse.json(
        { error: "Failed to send your assessment. Please try again or call us directly." },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: fromEmail,
      to: [brokerEmail],
      replyTo: input.email,
      subject: `New Borrowing Assessment — ${input.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #0B1D33;">New Borrowing Capacity Assessment</h2>
          <p><strong>${input.fullName}</strong> completed the online borrowing assessment.</p>
          <ul>
            <li>Email: ${input.email}</li>
            <li>Phone: ${input.phone}</li>
            <li>Estimated capacity: ${formatAud(result.estimatedBorrowingCapacity)}</li>
            <li>Indicative purchase price: ${formatAud(result.indicativePurchasePrice)}</li>
          </ul>
          <p>The full assessment PDF is attached.</p>
        </div>
      `,
      attachments: [{ filename: fileName, content: pdfBase64 }],
    });

    return NextResponse.json({
      success: true,
      result: {
        estimatedBorrowingCapacity: result.estimatedBorrowingCapacity,
        estimatedMonthlyRepayment: result.estimatedMonthlyRepayment,
        indicativePurchasePrice: result.indicativePurchasePrice,
        loanToValueRatio: result.loanToValueRatio,
        assessmentRate: result.assessmentRate,
      },
    });
  } catch (err) {
    console.error("Borrowing assessment API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
