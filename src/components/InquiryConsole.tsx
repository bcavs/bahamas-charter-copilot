"use client";

import { useMemo, useState } from "react";

import { buildDraftReply, buildWhatsAppLink } from "@/lib/draft";
import { extractLead } from "@/lib/extraction";
import { sampleOperator } from "@/lib/operator";

const SAMPLE_INQUIRIES = [
  "Hey can you take 6 people out next Friday for snorkeling maybe pigs too?",
  "Hi! Looking for a half day fishing trip for 4 of us tomorrow morning, pickup at Atlantis. What's the cost?",
  "Do you do sunset cruises? Party of 9 this Saturday evening for a birthday 🎉",
];

const CONFIDENCE_STYLES: Record<string, string> = {
  high: "bg-[#1b6b5f] text-white",
  medium: "bg-[#caa53d] text-[#14120f]",
  low: "bg-black/15 text-black/70",
};

export default function InquiryConsole() {
  const [inquiry, setInquiry] = useState(SAMPLE_INQUIRIES[0]);
  const [copied, setCopied] = useState(false);

  const trimmed = inquiry.trim();

  const lead = useMemo(
    () => (trimmed ? extractLead(trimmed, sampleOperator) : null),
    [trimmed],
  );

  const draft = useMemo(
    () => (lead ? buildDraftReply(lead, sampleOperator) : ""),
    [lead],
  );

  async function handleCopy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

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
          {lead && (
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
      </div>

      {lead && (
        <>
          <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b6b5f]">
              Extracted lead
            </p>
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
              {draft}
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
                href={buildWhatsAppLink(draft)}
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
