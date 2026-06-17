// POST /api/analyze — turn a pasted WhatsApp inquiry into an extracted lead
// plus a draft reply. Uses Claude when configured, and falls back to the
// deterministic rules engine when there is no API key or the AI call fails, so
// the demo always returns something useful.

import { NextResponse } from "next/server";

import { analyzeInquiryWithAI } from "@/lib/ai";
import { buildDraftReply } from "@/lib/draft";
import { extractLead } from "@/lib/extraction";
import { sampleOperator } from "@/lib/operator";
import { operatorProfileSchema } from "@/lib/operatorSchema";

export async function POST(request: Request) {
  let inquiry = "";
  let operator = sampleOperator;
  try {
    const body = await request.json();
    inquiry = typeof body?.inquiry === "string" ? body.inquiry.trim() : "";
    // The operator profile is edited in the browser, so validate it before use
    // and fall back to the sample if it's missing or malformed.
    const parsedOperator = operatorProfileSchema.safeParse(body?.operator);
    if (parsedOperator.success) operator = parsedOperator.data;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!inquiry) {
    return NextResponse.json({ error: "Missing inquiry text" }, { status: 400 });
  }

  try {
    const { lead, draft } = await analyzeInquiryWithAI(inquiry, operator);
    return NextResponse.json({ lead, draft, source: "ai" });
  } catch (error) {
    // Fall back to deterministic logic — keeps the workflow working offline and
    // without an API key. Log on the server for debugging.
    console.warn(
      "AI analysis unavailable, using deterministic fallback:",
      error instanceof Error ? error.message : error,
    );
    const lead = extractLead(inquiry, operator);
    const draft = buildDraftReply(lead, operator);
    return NextResponse.json({ lead, draft, source: "rules" });
  }
}
