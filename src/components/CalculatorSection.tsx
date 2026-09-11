"use client";

import Link from "next/link";
import { useState } from "react";
import BorrowingCapacityCalculator from "@/components/BorrowingCapacityCalculator";
import LoanCalculator from "@/components/LoanCalculator";

type Tab = "borrowing" | "repayments";

const tabs = [
  { id: "borrowing" as const, label: "Borrowing Power Check", description: "Free PDF assessment emailed to you" },
  { id: "repayments" as const, label: "Repayment Calculator", description: "Estimate your loan repayments" },
];

export default function CalculatorSection() {
  const [activeTab, setActiveTab] = useState<Tab>("borrowing");

  return (
    <>
      {/* Hero with calculator tabs as primary action */}
      <section className="relative overflow-hidden bg-navy-950 pt-24 pb-12 lg:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,160,89,0.12)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Main — headline + calculator tabs */}
            <div className="lg:col-span-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
                Haven Brokers — Calculators
              </p>
              <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
                How Much Could You Borrow?
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
                Choose a calculator below. Get an instant estimate — or complete the borrowing power check and receive a personalised PDF by email.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-xl px-5 py-4 text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/25"
                        : "border border-white/15 bg-white/5 text-white hover:border-gold-500/40 hover:bg-white/10"
                    }`}
                  >
                    <span className="block font-semibold">{tab.label}</span>
                    <span
                      className={`mt-1 block text-xs ${
                        activeTab === tab.id ? "text-navy-900/70" : "text-white/60"
                      }`}
                    >
                      {tab.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Side — secondary broker CTAs */}
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-white/10 bg-navy-900/50 p-6 backdrop-blur-sm lg:mt-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
                  Prefer to talk?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Our brokers can assess your situation against real lender policies and guide you through pre-approval.
                </p>
                <div className="mt-5 space-y-3">
                  <Link
                    href="/contact"
                    className="block w-full rounded-md bg-gold-500 px-5 py-3 text-center text-sm font-semibold text-navy-950 transition-all hover:bg-gold-400"
                  >
                    Speak to a Broker
                  </Link>
                  <Link
                    href="/services"
                    className="block w-full rounded-md border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:border-gold-500/50 hover:bg-white/5"
                  >
                    Compare Loan Options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {activeTab === "borrowing" ? <BorrowingCapacityCalculator /> : <LoanCalculator />}
        </div>
      </section>
    </>
  );
}
