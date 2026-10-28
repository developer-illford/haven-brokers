"use client";

import { useState, type FormEvent } from "react";
import { contactMethods, loanTypes } from "@/lib/constants";

interface ContactFormProps {
  variant?: "full" | "compact";
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  loanType: string;
  loanAmount: string;
  contactMethod: string;
  message: string;
  consent: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  loanType: "",
  loanAmount: "",
  contactMethod: "Either",
  message: "",
  consent: false,
};

export default function ContactForm({ variant = "full" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-navy-950">Enquiry Received</h3>
        <p className="mt-2 text-sm text-navy-900/70">
          Thank you for reaching out. A Haven Brokers team member will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-navy-900/40 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={variant === "full" ? "grid gap-5 sm:grid-cols-2" : "space-y-5"}>
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-navy-950">
            Full Name <span className="text-gold-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-950">
            Email <span className="text-gold-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-950">
            Phone <span className="text-gold-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="04XX XXX XXX"
          />
        </div>

        {variant === "full" && (
          <>
            <div>
              <label htmlFor="loanType" className="mb-1.5 block text-sm font-medium text-navy-950">
                Loan Type <span className="text-gold-600">*</span>
              </label>
              <select
                id="loanType"
                name="loanType"
                required
                value={formData.loanType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a loan type</option>
                {loanTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="loanAmount" className="mb-1.5 block text-sm font-medium text-navy-950">
                Estimated Loan Amount
              </label>
              <input
                type="text"
                id="loanAmount"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. $500,000"
              />
            </div>

            <div>
              <label htmlFor="contactMethod" className="mb-1.5 block text-sm font-medium text-navy-950">
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className={inputClass}
              >
                {contactMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-950">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={inputClass}
          placeholder="Tell us about your finance goals..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-navy-900/20 text-gold-500 focus:ring-gold-500/20"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-navy-900/70">
          I consent to Haven Brokers contacting me regarding my enquiry and understand my information will be handled in accordance with applicable privacy laws. <span className="text-gold-600">*</span>
        </label>
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Start Your Enquiry"}
      </button>
    </form>
  );
}
