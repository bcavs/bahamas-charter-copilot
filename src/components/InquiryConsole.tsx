"use client";

import { useState } from "react";

import type { ExtractedLead } from "@/lib/extraction";

const SAMPLE_INQUIRIES = [
  "Hey can you take 6 people out next Friday for snorkeling maybe pigs too?",
  "Hi! Looking for a half day fishing trip for 4 of us tomorrow morning, pickup at Atlantis. What's the cost?",
  "good afternoon 👋 my husband and i are celebrating our anniversary sat, would love something chilled on the water around sunset, maybe 8-10 of us incl friends. do u have anything?",
];

const CONFIDENCE_STYLES: Record<string, string> = {
  high: "bg-[#1b6b5f] text-white",
  medium: "bg-[#caa53d] text-[#14120f]",
  low: "bg-black/15 text-black/70",
};

type AnalyzeResponse = {
  lead: ExtractedLead;
  draft: string;
  source: "ai" | "rules";
};

export default function InquiryConsole() {
  const [inquiry, setInquiry] = useState(SAMPLE_INQUIRIES[0]);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleAnalyze() {
    const text = inquiry.trim();
    if (!text || loading) return;

    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiry: text }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: AnalyzeResponse = await res.json();
      setResult(data);
    } catch {
      setError("Could not generate a reply. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result?.draft) return;
    try {
      await navigator.clipboard.writeText(result.draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const lead = result?.lead ?? null;

  const fields: Array<[string, string]> = lead
    ? [
        ["Date", lead.datePhrase ?? "—"],
        ["Group", lead.groupSize ? `${lead.groupSize} guests` : "—"],
        [
          "Activity",
          lead.activities.length > 0 ? lead.activities.join(", ") : "—",
        ],
        ["Pickup", lead.pickup ?? "—"],
        ["Timing", lead.timing ?? "—"],
        ["Budget", lead.budget ? `$${lead.budget.toLocaleString("en-US")}` : "—"],
      ]
    : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="inquiry"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b6b5f]"
          >
            Paste a WhatsApp inquiry
          </label>
          {result && lead && (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${CONFIDENCE_STYLES[lead.confidence]}`}
            >
              {lead.confidence} confidence
            </span>
          )}
        </div>
        <textarea
          id="inquiry"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          rows={4}
          placeholder="Paste or type a customer's message here…"
          className="mt-3 w-full resize-none rounded-md border border-black/15 bg-[#faf8f1] p-3 text-sm leading-6 outline-none focus:border-[#1b6b5f] focus:ring-1 focus:ring-[#1b6b5f]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {SAMPLE_INQUIRIES.map((sample, i) => (
            <button
              key={sample}
              type="button"
              onClick={() => setInquiry(sample)}
              className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-medium text-black/70 transition hover:border-[#1b6b5f] hover:text-[#1b6b5f]"
            >
              Sample {i + 1}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || inquiry.trim().length === 0}
          className="mt-4 h-11 w-full rounded-md bg-[#1b6b5f] px-4 text-sm font-semibold text-white transition active:scale-[0.99] disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Reading inquiry…" : "Generate reply"}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {result && lead && (
        <>
          <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b6b5f]">
                Extracted lead
              </p>
              <span className="text-[11px] text-black/45">
                {result.source === "ai" ? "AI" : "Offline rules"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {fields.map(([label, value]) => (
                <div key={label} className="rounded-md bg-[#faf8f1] p-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-black/45">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>

            {lead.suggestedTrip && (
              <div className="mt-3 rounded-md border border-[#1b6b5f]/25 bg-[#e5f3ed] p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#1b6b5f]">
                  Suggested trip
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {lead.suggestedTrip.name}
                </p>
              </div>
            )}

            {lead.missing.length > 0 && (
              <div className="mt-3 rounded-md border border-[#caa53d]/40 bg-[#fbf3dc] p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8a6a18]">
                  Still needed
                </p>
                <p className="mt-1 text-sm font-medium text-[#5c4a14]">
                  {lead.missing.join(" · ")}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b6b5f]">
                Draft reply
              </p>
              <span className="text-[11px] text-black/45">
                You approve before anything is sent
              </span>
            </div>
            <p className="mt-3 whitespace-pre-line rounded-md bg-[#faf8f1] p-3 text-sm leading-6">
              {result.draft}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCopy}
                className="h-11 rounded-md bg-[#1b6b5f] px-4 text-sm font-semibold text-white transition active:scale-[0.99]"
              >
                {copied ? "Copied ✓" : "Copy reply"}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(result.draft)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center rounded-md border border-black/15 px-4 text-sm font-semibold transition hover:border-[#1b6b5f] hover:text-[#1b6b5f]"
              >
                Open in WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
