export type LoanPurpose = "owner-occupier" | "investment" | "refinance";
export type EmploymentType = "payg-full-time" | "payg-part-time" | "self-employed" | "casual" | "other";

export interface BorrowingAssessmentInput {
  fullName: string;
  email: string;
  phone: string;
  numberOfApplicants: 1 | 2;
  dependants: number;
  loanPurpose: LoanPurpose;
  firstHomeBuyer: boolean;
  employmentType: EmploymentType;
  applicant1GrossAnnual: number;
  applicant2GrossAnnual: number;
  supplementaryIncomeMonthly: number;
  rentalIncomeMonthly: number;
  otherIncomeMonthly: number;
  monthlyLivingExpenses: number;
  existingLoanRepayments: number;
  creditCardLimit: number;
  otherMonthlyCommitments: number;
  depositAvailable: number;
  loanTermYears: number;
  interestRate: number;
  consent: boolean;
}

export interface BorrowingAssessmentResult {
  grossMonthlyIncome: number;
  netMonthlySurplus: number;
  assessmentRate: number;
  estimatedBorrowingCapacity: number;
  estimatedMonthlyRepayment: number;
  indicativePurchasePrice: number;
  loanToValueRatio: number;
}

export const INCOME_SHADING: Record<EmploymentType, number> = {
  "payg-full-time": 1,
  "payg-part-time": 0.9,
  "self-employed": 0.8,
  casual: 0.8,
  other: 0.85,
};

const LENDER_BUFFER = 3;
const MIN_ASSESSMENT_RATE = 8.5;
const CREDIT_CARD_REPAYMENT_FACTOR = 0.03;
const RENTAL_INCOME_SHADING = 0.8;

export function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function maxLoanFromMonthlyRepayment(
  monthlyRepayment: number,
  annualRate: number,
  years: number
): number {
  if (monthlyRepayment <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    return monthlyRepayment * numPayments;
  }

  return (
    (monthlyRepayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
  );
}

function monthlyRepaymentForLoan(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / numPayments;
  }

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export function calculateBorrowingCapacity(
  input: BorrowingAssessmentInput
): BorrowingAssessmentResult {
  const shading = INCOME_SHADING[input.employmentType];

  const grossAnnualIncome =
    input.applicant1GrossAnnual +
    (input.numberOfApplicants === 2 ? input.applicant2GrossAnnual : 0);

  const grossMonthlyIncome =
    (grossAnnualIncome / 12) * shading +
    input.supplementaryIncomeMonthly +
    input.rentalIncomeMonthly * RENTAL_INCOME_SHADING +
    input.otherIncomeMonthly;

  const creditCardMonthly = input.creditCardLimit * CREDIT_CARD_REPAYMENT_FACTOR;

  const totalMonthlyCommitments =
    input.monthlyLivingExpenses +
    input.existingLoanRepayments +
    creditCardMonthly +
    input.otherMonthlyCommitments;

  const netMonthlySurplus = Math.max(0, grossMonthlyIncome - totalMonthlyCommitments);

  const assessmentRate = Math.max(input.interestRate + LENDER_BUFFER, MIN_ASSESSMENT_RATE);

  const estimatedBorrowingCapacity = maxLoanFromMonthlyRepayment(
    netMonthlySurplus,
    assessmentRate,
    input.loanTermYears
  );

  const estimatedMonthlyRepayment = monthlyRepaymentForLoan(
    estimatedBorrowingCapacity,
    input.interestRate,
    input.loanTermYears
  );

  const indicativePurchasePrice = estimatedBorrowingCapacity + input.depositAvailable;

  const loanToValueRatio =
    indicativePurchasePrice > 0
      ? (estimatedBorrowingCapacity / indicativePurchasePrice) * 100
      : 0;

  return {
    grossMonthlyIncome,
    netMonthlySurplus,
    assessmentRate,
    estimatedBorrowingCapacity,
    estimatedMonthlyRepayment,
    indicativePurchasePrice,
    loanToValueRatio,
  };
}

export const LOAN_PURPOSE_LABELS: Record<LoanPurpose, string> = {
  "owner-occupier": "Owner Occupier",
  investment: "Investment Property",
  refinance: "Refinancing",
};

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  "payg-full-time": "PAYG — Full Time",
  "payg-part-time": "PAYG — Part Time",
  "self-employed": "Self Employed",
  casual: "Casual / Contract",
  other: "Other",
};

export function validateBorrowingInput(body: unknown): BorrowingAssessmentInput | null {
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

  const numberOfApplicants = data.numberOfApplicants === 2 ? 2 : 1;
  const loanPurpose = data.loanPurpose as LoanPurpose;
  const employmentType = data.employmentType as EmploymentType;

  const validPurposes: LoanPurpose[] = ["owner-occupier", "investment", "refinance"];
  const validEmployment: EmploymentType[] = [
    "payg-full-time",
    "payg-part-time",
    "self-employed",
    "casual",
    "other",
  ];

  if (!validPurposes.includes(loanPurpose) || !validEmployment.includes(employmentType)) {
    return null;
  }

  return {
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    numberOfApplicants,
    dependants: Math.max(0, Number(data.dependants) || 0),
    loanPurpose,
    firstHomeBuyer: data.firstHomeBuyer === true,
    employmentType,
    applicant1GrossAnnual: Math.max(0, Number(data.applicant1GrossAnnual) || 0),
    applicant2GrossAnnual: Math.max(0, Number(data.applicant2GrossAnnual) || 0),
    supplementaryIncomeMonthly: Math.max(0, Number(data.supplementaryIncomeMonthly) || 0),
    rentalIncomeMonthly: Math.max(0, Number(data.rentalIncomeMonthly) || 0),
    otherIncomeMonthly: Math.max(0, Number(data.otherIncomeMonthly) || 0),
    monthlyLivingExpenses: Math.max(0, Number(data.monthlyLivingExpenses) || 0),
    existingLoanRepayments: Math.max(0, Number(data.existingLoanRepayments) || 0),
    creditCardLimit: Math.max(0, Number(data.creditCardLimit) || 0),
    otherMonthlyCommitments: Math.max(0, Number(data.otherMonthlyCommitments) || 0),
    depositAvailable: Math.max(0, Number(data.depositAvailable) || 0),
    loanTermYears: Math.min(30, Math.max(5, Number(data.loanTermYears) || 30)),
    interestRate: Math.min(15, Math.max(2, Number(data.interestRate) || 6.25)),
    consent: true,
  };
}
