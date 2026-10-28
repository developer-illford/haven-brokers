"use client";

import { useState, useMemo } from "react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateRepayment(
  principal: number,
  annualRate: number,
  years: number
): { monthly: number; fortnightly: number; weekly: number; totalInterest: number; totalRepaid: number } {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    const monthly = principal / numPayments;
    return {
      monthly,
      fortnightly: (monthly * 12) / 26,
      weekly: (monthly * 12) / 52,
      totalInterest: 0,
      totalRepaid: principal,
    };
  }

  const monthly =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalRepaid = monthly * numPayments;
  const totalInterest = totalRepaid - principal;

  return {
    monthly,
    fortnightly: (monthly * 12) / 26,
    weekly: (monthly * 12) / 52,
    totalInterest,
    totalRepaid,
  };
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);
  const [repaymentFreq, setRepaymentFreq] = useState<"monthly" | "fortnightly" | "weekly">("monthly");

  const results = useMemo(
    () => calculateRepayment(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );

  const repayment =
    repaymentFreq === "monthly"
      ? results.monthly
      : repaymentFreq === "fortnightly"
        ? results.fortnightly
        : results.weekly;

  const freqLabel =
    repaymentFreq === "monthly" ? "Monthly" : repaymentFreq === "fortnightly" ? "Fortnightly" : "Weekly";

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <label htmlFor="loanAmount" className="mb-2 flex items-center justify-between text-sm font-medium text-navy-950">
            <span>Loan Amount</span>
            <span className="font-semibold text-gold-600">{formatCurrency(loanAmount)}</span>
          </label>
          <input
            type="range"
            id="loanAmount"
            min={50000}
            max={2000000}
            step={10000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="mt-1 flex justify-between text-xs text-navy-900/50">
            <span>$50,000</span>
            <span>$2,000,000</span>
          </div>
        </div>

        <div>
          <label htmlFor="interestRate" className="mb-2 flex items-center justify-between text-sm font-medium text-navy-950">
            <span>Interest Rate (p.a.)</span>
            <span className="font-semibold text-gold-600">{interestRate.toFixed(2)}%</span>
          </label>
          <input
            type="range"
            id="interestRate"
            min={2}
            max={12}
            step={0.05}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="mt-1 flex justify-between text-xs text-navy-900/50">
            <span>2.00%</span>
            <span>12.00%</span>
          </div>
        </div>

        <div>
          <label htmlFor="loanTerm" className="mb-2 flex items-center justify-between text-sm font-medium text-navy-950">
            <span>Loan Term</span>
            <span className="font-semibold text-gold-600">{loanTerm} years</span>
          </label>
          <input
            type="range"
            id="loanTerm"
            min={5}
            max={30}
            step={1}
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="mt-1 flex justify-between text-xs text-navy-900/50">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-navy-950">Repayment Frequency</span>
          <div className="flex gap-2">
            {(["monthly", "fortnightly", "weekly"] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setRepaymentFreq(freq)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  repaymentFreq === freq
                    ? "bg-navy-950 text-gold-400"
                    : "bg-navy-950/5 text-navy-900/70 hover:bg-navy-950/10"
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-navy-900/10 bg-white p-8 shadow-sm">
        <h3 className="font-serif text-xl font-semibold text-navy-950">Estimated Repayments</h3>
        <p className="mt-1 text-sm text-navy-900/60">
          Principal &amp; interest repayments based on your inputs.
        </p>

        <div className="mt-8 rounded-lg bg-navy-950 p-6 text-center">
          <p className="text-sm text-gold-400">{freqLabel} Repayment</p>
          <p className="mt-1 font-serif text-4xl font-bold text-white">{formatCurrency(repayment)}</p>
        </div>

        <dl className="mt-6 space-y-4">
          <div className="flex justify-between border-b border-navy-900/10 pb-3">
            <dt className="text-sm text-navy-900/70">Loan Amount</dt>
            <dd className="text-sm font-semibold text-navy-950">{formatCurrency(loanAmount)}</dd>
          </div>
          <div className="flex justify-between border-b border-navy-900/10 pb-3">
            <dt className="text-sm text-navy-900/70">Total Interest</dt>
            <dd className="text-sm font-semibold text-navy-950">{formatCurrency(results.totalInterest)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-navy-900/70">Total Amount Repaid</dt>
            <dd className="text-sm font-semibold text-navy-950">{formatCurrency(results.totalRepaid)}</dd>
          </div>
        </dl>

        <p className="mt-6 text-xs leading-relaxed text-navy-900/50">
          This calculator provides estimates only and does not constitute a loan offer. Actual repayments may vary based on fees, loan features, and lender criteria. Speak with a Haven Brokers adviser for personalised advice.
        </p>
      </div>
    </div>
  );
}
