"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  calculateBorrowingCapacity,
  formatAud,
  formatPercent,
  type BorrowingAssessmentInput,
  type EmploymentType,
  type LoanPurpose,
} from "@/lib/borrowingCapacity";

const inputClass =
  "w-full rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-navy-900/40 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20";

interface ApiResult {
  estimatedBorrowingCapacity: number;
  estimatedMonthlyRepayment: number;
  indicativePurchasePrice: number;
  loanToValueRatio: number;
  assessmentRate: number;
}

type FormState = Omit<BorrowingAssessmentInput, "consent" | "otherMonthlyCommitments" | "interestRate"> & {
  consent: boolean;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  numberOfApplicants: 1,
  dependants: 0,
  loanPurpose: "owner-occupier",
  firstHomeBuyer: false,
  employmentType: "payg-full-time",
  applicant1GrossAnnual: 90000,
  applicant2GrossAnnual: 0,
  supplementaryIncomeMonthly: 0,
  rentalIncomeMonthly: 0,
  otherIncomeMonthly: 0,
  monthlyLivingExpenses: 3200,
  existingLoanRepayments: 0,
  creditCardLimit: 0,
  depositAvailable: 80000,
  loanTermYears: 30,
  consent: false,
};

function CurrencyInput({
  id,
  label,
  hint,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-950">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-navy-900/40">$</span>
        <input
          id={id}
          type="number"
          min={0}
          step={1}
          required={required}
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className={`${inputClass} pl-8`}
        />
      </div>
      {hint && <p className="mt-1 text-xs text-navy-900/50">{hint}</p>}
    </div>
  );
}

function PillGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            value === opt.value
              ? "bg-navy-950 text-gold-400 shadow-sm"
              : "bg-navy-950/5 text-navy-900/70 hover:bg-navy-950/10"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function BorrowingCapacityCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [apiResult, setApiResult] = useState<ApiResult | null>(null);

  const preview = useMemo(() => {
    if (form.applicant1GrossAnnual <= 0) return null;
    return calculateBorrowingCapacity({
      ...form,
      consent: true,
      otherMonthlyCommitments: 0,
      interestRate: 6.25,
    });
  }, [form]);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        ...form,
        otherMonthlyCommitments: 0,
        interestRate: 6.25,
      };

      const response = await fetch("/api/borrowing-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setApiResult(data.result);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success" && apiResult) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-2xl font-semibold text-navy-950">You&apos;re All Done!</h3>
        <p className="mt-2 text-sm text-navy-900/70">
          Your assessment PDF is on its way to <strong>{form.email}</strong>. A Haven Brokers adviser may also follow up to help with next steps.
        </p>
        <div className="mt-8 rounded-xl bg-navy-950 p-6">
          <p className="text-sm text-gold-400">Your Estimated Borrowing Capacity</p>
          <p className="mt-1 font-serif text-4xl font-bold text-white">
            {formatAud(apiResult.estimatedBorrowingCapacity)}
          </p>
          <p className="mt-2 text-sm text-white/70">
            Could buy up to {formatAud(apiResult.indicativePurchasePrice)} · {formatAud(apiResult.estimatedMonthlyRepayment)}/mo
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setStatus("idle");
            setApiResult(null);
          }}
          className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500"
        >
          Start another assessment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Form — single scrollable page, 3 short sections */}
        <div className="space-y-8 lg:col-span-3">
          <p className="rounded-lg bg-gold-500/10 px-4 py-3 text-sm text-navy-900/80">
            <strong>Free &amp; takes about 2 minutes.</strong> Enter a few details and we&apos;ll email your personalised borrowing capacity assessment as a PDF.
          </p>

          {/* Section 1: Contact */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-semibold text-navy-950">1. Your contact details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-navy-950">
                  Full Name <span className="text-gold-600">*</span>
                </label>
                <input id="fullName" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-950">
                  Email <span className="text-gold-600">*</span>
                </label>
                <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="you@email.com" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-950">
                  Mobile <span className="text-gold-600">*</span>
                </label>
                <input id="phone" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="04XX XXX XXX" />
              </div>
            </div>
          </fieldset>

          {/* Section 2: Loan goals */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-semibold text-navy-950">2. What are you looking to do?</legend>
            <div>
              <span className="mb-2 block text-sm font-medium text-navy-950">Loan purpose</span>
              <PillGroup
                value={form.loanPurpose}
                onChange={(v) => update("loanPurpose", v)}
                options={[
                  { value: "owner-occupier", label: "Buy a home" },
                  { value: "investment", label: "Investment" },
                  { value: "refinance", label: "Refinance" },
                ]}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="mb-2 block text-sm font-medium text-navy-950">First home buyer?</span>
                <PillGroup
                  value={form.firstHomeBuyer ? "yes" : "no"}
                  onChange={(v) => update("firstHomeBuyer", v === "yes")}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
              <div>
                <span className="mb-2 block text-sm font-medium text-navy-950">Applying with a partner?</span>
                <PillGroup
                  value={form.numberOfApplicants === 2 ? "yes" : "no"}
                  onChange={(v) => {
                    update("numberOfApplicants", v === "yes" ? 2 : 1);
                    if (v === "no") update("applicant2GrossAnnual", 0);
                  }}
                  options={[
                    { value: "no", label: "Just me" },
                    { value: "yes", label: "Two of us" },
                  ]}
                />
              </div>
            </div>
          </fieldset>

          {/* Section 3: Financials */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-semibold text-navy-950">3. Your finances</legend>
            <div>
              <label htmlFor="employmentType" className="mb-1.5 block text-sm font-medium text-navy-950">Your employment</label>
              <select id="employmentType" value={form.employmentType} onChange={(e) => update("employmentType", e.target.value as EmploymentType)} className={inputClass}>
                <option value="payg-full-time">Full-time PAYG</option>
                <option value="payg-part-time">Part-time PAYG</option>
                <option value="casual">Casual / Contract</option>
                <option value="self-employed">Self-employed</option>
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <CurrencyInput
                id="applicant1GrossAnnual"
                label="Your annual income (before tax)"
                value={form.applicant1GrossAnnual}
                onChange={(v) => update("applicant1GrossAnnual", v)}
                required
              />
              {form.numberOfApplicants === 2 && (
                <CurrencyInput
                  id="applicant2GrossAnnual"
                  label="Partner's annual income"
                  value={form.applicant2GrossAnnual}
                  onChange={(v) => update("applicant2GrossAnnual", v)}
                />
              )}
            </div>

            <div className="rounded-lg border border-navy-900/10 bg-cream-50 p-4">
              <p className="text-sm font-medium text-navy-950">Additional monthly income <span className="font-normal text-navy-900/50">(optional)</span></p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <CurrencyInput
                  id="supplementaryIncomeMonthly"
                  label="Supplementary income"
                  hint="Regular bonuses, commissions & overtime (monthly avg.)"
                  value={form.supplementaryIncomeMonthly}
                  onChange={(v) => update("supplementaryIncomeMonthly", v)}
                />
                <CurrencyInput
                  id="rentalIncomeMonthly"
                  label="Rental income"
                  hint="From a property you own or plan to buy"
                  value={form.rentalIncomeMonthly}
                  onChange={(v) => update("rentalIncomeMonthly", v)}
                />
                <CurrencyInput
                  id="otherIncomeMonthly"
                  label="Other income"
                  hint="Allowances, Centrelink or other benefits"
                  value={form.otherIncomeMonthly}
                  onChange={(v) => update("otherIncomeMonthly", v)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <CurrencyInput
                id="depositAvailable"
                label="Savings / deposit available"
                hint="Helps estimate your purchase price range"
                value={form.depositAvailable}
                onChange={(v) => update("depositAvailable", v)}
              />
              <CurrencyInput
                id="monthlyLivingExpenses"
                label="Monthly living expenses"
                hint="Food, bills, transport, insurance etc."
                value={form.monthlyLivingExpenses}
                onChange={(v) => update("monthlyLivingExpenses", v)}
              />
              <CurrencyInput
                id="existingLoanRepayments"
                label="Current home loan repayments / month"
                hint="All existing home loan repayments for all borrowers. Enter $0 if none."
                value={form.existingLoanRepayments}
                onChange={(v) => update("existingLoanRepayments", v)}
              />
              <CurrencyInput
                id="creditCardLimit"
                label="Total credit card limits"
                hint="Enter $0 if none"
                value={form.creditCardLimit}
                onChange={(v) => update("creditCardLimit", v)}
              />
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-navy-950">Preferred loan term</span>
              <PillGroup
                value={String(form.loanTermYears) as "25" | "30"}
                onChange={(v) => update("loanTermYears", Number(v) as 25 | 30)}
                options={[
                  { value: "25", label: "25 years" },
                  { value: "30", label: "30 years" },
                ]}
              />
            </div>
          </fieldset>

          {/* Submit */}
          <div className="rounded-xl border border-navy-900/10 bg-cream-100 p-5">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-navy-900/20 text-gold-500"
              />
              <label htmlFor="consent" className="text-xs leading-relaxed text-navy-900/70">
                I&apos;d like to receive my free assessment by email and consent to Haven Brokers contacting me about my enquiry. This is an estimate only — not a loan approval. <span className="text-gold-600">*</span>
              </label>
            </div>

            {status === "error" && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-4 w-full rounded-md bg-gold-500 px-8 py-4 text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 disabled:opacity-60 sm:w-auto"
            >
              {status === "loading" ? "Sending your assessment..." : "Get My Free Assessment →"}
            </button>
          </div>
        </div>

        {/* Sticky live preview — instant gratification for lead gen */}
        <div className="lg:col-span-2">
          <div className="sticky top-28 rounded-xl border border-navy-900/10 bg-white p-6 shadow-sm">
            {preview ? (
              <>
                <p className="text-center text-xs font-semibold uppercase tracking-wider text-gold-600">Live estimate</p>
                <div className="mt-4 rounded-xl bg-navy-950 p-6 text-center">
                  <p className="text-sm text-gold-400">You could borrow up to</p>
                  <p className="mt-1 font-serif text-4xl font-bold text-white">
                    {formatAud(preview.estimatedBorrowingCapacity)}
                  </p>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-navy-900/70">Purchase price range</dt>
                    <dd className="font-semibold text-navy-950">{formatAud(preview.indicativePurchasePrice)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-900/70">Est. monthly repayment</dt>
                    <dd className="font-semibold text-navy-950">{formatAud(preview.estimatedMonthlyRepayment)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-900/70">Indicative LVR</dt>
                    <dd className="font-semibold text-navy-950">{formatPercent(preview.loanToValueRatio)}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="font-serif text-lg text-navy-950">Your estimate appears here</p>
                <p className="mt-2 text-sm text-navy-900/50">Enter your income to see how much you could borrow</p>
              </div>
            )}
            <p className="mt-5 text-center text-xs text-navy-900/50">
              {preview
                ? `Estimate only · ${form.loanTermYears}-year P&I loan · Repayment at 6.25% · Capacity assessed at ${formatPercent(preview.assessmentRate)}`
                : "Estimate only · A broker can confirm your exact capacity"}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
