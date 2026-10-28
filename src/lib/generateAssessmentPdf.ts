import PDFDocument from "pdfkit";
import {
  type BorrowingAssessmentInput,
  type BorrowingAssessmentResult,
  EMPLOYMENT_LABELS,
  INCOME_SHADING,
  LOAN_PURPOSE_LABELS,
  formatAud,
  formatPercent,
} from "./borrowingCapacity";
import { siteConfig } from "./constants";

function drawSectionTitle(doc: InstanceType<typeof PDFDocument>, title: string) {
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor("#0B1D33").font("Helvetica-Bold").text(title);
  doc.moveDown(0.3);
  doc.font("Helvetica").fontSize(10).fillColor("#333333");
}

function drawRow(doc: InstanceType<typeof PDFDocument>, label: string, value: string) {
  const y = doc.y;
  doc.fontSize(10).fillColor("#666666").text(label, 50, y, { width: 220, continued: false });
  doc.fontSize(10).fillColor("#0B1D33").font("Helvetica-Bold").text(value, 280, y, {
    width: 250,
    align: "right",
  });
  doc.font("Helvetica");
  doc.moveDown(0.4);
}

export async function generateAssessmentPdf(
  input: BorrowingAssessmentInput,
  result: BorrowingAssessmentResult
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.rect(0, 0, doc.page.width, 90).fill("#0B1D33");
    doc.fillColor("#C5A059").fontSize(22).font("Helvetica-Bold").text("HAVEN BROKERS", 50, 32);
    doc.fillColor("#FFFFFF").fontSize(11).font("Helvetica").text("Borrowing Capacity Assessment", 50, 58);
    doc.fillColor("#C5A059").fontSize(9).text(siteConfig.tagline, 50, 74);

    doc.y = 110;
    doc.fillColor("#666666").fontSize(9).text(
      `Prepared for ${input.fullName} · ${new Date().toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
      50
    );

    doc.moveDown(1);
    doc.rect(50, doc.y, doc.page.width - 100, 70).fill("#F3EFE8");
    const boxY = doc.y + 12;
    doc.fillColor("#0B1D33").fontSize(10).font("Helvetica-Bold").text("Estimated Borrowing Capacity", 62, boxY);
    doc.fontSize(24).fillColor("#C5A059").text(formatAud(result.estimatedBorrowingCapacity), 62, boxY + 16);
    doc.fontSize(10).fillColor("#666666").font("Helvetica").text(
      `Indicative purchase price: ${formatAud(result.indicativePurchasePrice)}`,
      62,
      boxY + 46
    );

    doc.y = boxY + 85;

    drawSectionTitle(doc, "Your Details");
    drawRow(doc, "Full Name", input.fullName);
    drawRow(doc, "Email", input.email);
    drawRow(doc, "Phone", input.phone);
    drawRow(doc, "Applicants", String(input.numberOfApplicants));
    drawRow(doc, "Dependants", String(input.dependants));
    drawRow(doc, "Loan Purpose", LOAN_PURPOSE_LABELS[input.loanPurpose]);
    drawRow(doc, "First Home Buyer", input.firstHomeBuyer ? "Yes" : "No");
    drawRow(doc, "Employment", EMPLOYMENT_LABELS[input.employmentType]);

    const grossAnnualIncome =
      input.applicant1GrossAnnual +
      (input.numberOfApplicants === 2 ? input.applicant2GrossAnnual : 0);
    const assessableSalaryMonthly = (grossAnnualIncome / 12) * INCOME_SHADING[input.employmentType];

    drawSectionTitle(doc, "Income (Monthly)");
    drawRow(doc, "Assessable Salary/Wages", formatAud(assessableSalaryMonthly));
    if (input.supplementaryIncomeMonthly > 0) {
      drawRow(doc, "Supplementary Income", formatAud(input.supplementaryIncomeMonthly));
    }
    if (input.rentalIncomeMonthly > 0) {
      drawRow(doc, "Rental Income (80% shaded)", formatAud(input.rentalIncomeMonthly * 0.8));
    }
    if (input.otherIncomeMonthly > 0) {
      drawRow(doc, "Other Income", formatAud(input.otherIncomeMonthly));
    }
    drawRow(doc, "Total Assessable Income", formatAud(result.grossMonthlyIncome));

    drawSectionTitle(doc, "Expenses & Commitments (Monthly)");
    drawRow(doc, "Living Expenses", formatAud(input.monthlyLivingExpenses));
    drawRow(doc, "Existing Home Loan Repayments", formatAud(input.existingLoanRepayments));
    drawRow(doc, "Credit Card Commitments (3%)", formatAud(input.creditCardLimit * 0.03));
    drawRow(doc, "Other Commitments", formatAud(input.otherMonthlyCommitments));
    drawRow(doc, "Surplus for Repayments", formatAud(result.netMonthlySurplus));

    drawSectionTitle(doc, "Assessment Results");
    drawRow(doc, "Estimated Borrowing Capacity", formatAud(result.estimatedBorrowingCapacity));
    drawRow(doc, "Est. Monthly Repayment", formatAud(result.estimatedMonthlyRepayment));
    drawRow(doc, "Deposit Available", formatAud(input.depositAvailable));
    drawRow(doc, "Indicative Purchase Price", formatAud(result.indicativePurchasePrice));
    drawRow(doc, "Indicative LVR", formatPercent(result.loanToValueRatio));
    drawRow(doc, "Assessment Rate Used", formatPercent(result.assessmentRate));
    drawRow(doc, "Indicative Rate", formatPercent(input.interestRate));
    drawRow(doc, "Loan Term", `${input.loanTermYears} years`);

    doc.moveDown(1);
    doc.fontSize(8).fillColor("#666666").font("Helvetica").text(
      "Important: This assessment is an estimate only and does not constitute a loan approval or pre-approval. " +
        "Lenders apply their own serviceability criteria, living expense benchmarks (HEM), credit checks, and policy rules. " +
        "Actual borrowing capacity may differ. Please speak with a Haven Brokers finance professional before making decisions.",
      50,
      doc.y,
      { width: doc.page.width - 100, align: "justify" }
    );

    doc.moveDown(1);
    doc.fontSize(8).fillColor("#666666").text(
      `${siteConfig.name} · ${siteConfig.landline} · ${siteConfig.phone} · ${siteConfig.email} · ${siteConfig.address}`,
      50,
      doc.y,
      { width: doc.page.width - 100, align: "center" }
    );

    doc.end();
  });
}
