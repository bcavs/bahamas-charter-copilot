# Agent Handoff

## Project Summary

Bahamas Charter Copilot is a WhatsApp-first lead conversion copilot for Bahamas charter and tour operators.

The first product should help a captain turn a messy WhatsApp inquiry into a professional response and quote in under 60 seconds.

## Current Strategic Decisions

- SaaS first, curated experiences later.
- First customers are charter and tour operators.
- Boutique hotels come second.
- Vacation rental managers come third.
- First channel is WhatsApp.
- First workflow is lead capture and conversion.
- Booking management comes after lead-to-quote validation.
- Product starts as a copilot, not an autonomous bot.
- Captains approve customer-facing messages.
- Start with mobile web companion before native app or full WhatsApp API integration.

## What Not To Build Yet

- marketplace
- native app
- hotel dashboard
- vacation rental dashboard
- full booking calendar
- autonomous WhatsApp responder
- complex availability engine
- payment system beyond simple links
- broad travel planning app

## Current Repo State

The app is a Next.js App Router project. Milestones 1 (interactive prototype) and 2 (AI extraction + drafting) are built. The sample operator is Nassau-based — the first sales focus.

Structure:

- `src/lib/operator.ts` — static Nassau operator profile and trip menu (typed sample data).
- `src/lib/extraction.ts` — deterministic lead extraction (`extractLead`), no AI. Used as the offline fallback. Returns date phrase, group size, activities, pickup, budget, timing, missing fields, suggested trip, and confidence.
- `src/lib/draft.ts` — rule-based draft reply (`buildDraftReply`) plus `buildWhatsAppLink`. Used as the offline fallback. Never invents availability or a final price.
- `src/lib/ai.ts` — server-only AI analysis (`analyzeInquiryWithAI`). One Claude call (`messages.parse` + a Zod structured-output schema) extracts the lead and writes the draft. Returns the same `ExtractedLead` shape. Model defaults to `claude-opus-4-8`, overridable via `ANTHROPIC_MODEL`. Throws when no key/on error so the route can fall back.
- `src/app/api/analyze/route.ts` — `POST /api/analyze`. Tries AI, falls back to the deterministic rules engine; response includes `source: "ai" | "rules"`.
- `src/components/InquiryConsole.tsx` — client component: textarea, sample inquiries, "Generate reply" button that calls the API with a loading state, extracted-lead panel, draft reply, copy + open-in-WhatsApp.
- `src/app/page.tsx` — server component shell mounting the console.
- `.env.example` — `ANTHROPIC_API_KEY` (enables AI) and optional `ANTHROPIC_MODEL`.

Without `ANTHROPIC_API_KEY` the app still works end-to-end via the rules fallback (the demo never returns empty).

## Next Recommended Product Work

1. Operator setup persistence (database + real profile/trip editing) so the Nassau profile isn't hardcoded.
2. Lead tracking and a status pipeline (new / needs info / quoted / follow-up / won / lost).
3. Quote links (public quote page per lead).
4. Optional: prompt caching of the operator profile/system prompt once setup persistence lands, to cut per-inquiry cost.

## Design Principles

- Sell revenue recovery, not AI.
- Keep captain control visible.
- Avoid broad CRM complexity.
- Every feature should help convert inbound leads or prepare the next phase.
- UI should feel fast and phone-native.
- Prefer small, obvious workflows over dashboards full of empty tables.

## Verification

Before claiming code work is complete:

```bash
npm run lint
npm run build
```

## Important Docs

- `docs/00-overview.md`
- `docs/01-product-strategy.md`
- `docs/02-mvp-spec.md`
- `docs/03-go-to-market.md`
- `docs/04-research-notes.md`
