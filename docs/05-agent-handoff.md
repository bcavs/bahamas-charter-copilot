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

The app is a Next.js App Router project. Milestone 1 (interactive local prototype) is built.

Structure:

- `src/lib/operator.ts` — static operator profile and trip menu (typed sample data).
- `src/lib/extraction.ts` — deterministic lead extraction (`extractLead`), no AI. Returns date phrase, group size, activities, pickup, budget, timing, missing fields, suggested trip, and confidence.
- `src/lib/draft.ts` — rule-based draft reply (`buildDraftReply`) plus `buildWhatsAppLink`. Never invents availability or a final price; asks only for missing details.
- `src/components/InquiryConsole.tsx` — client component: textarea, sample inquiries, live extracted-lead panel, draft reply, working copy button, open-in-WhatsApp link.
- `src/app/page.tsx` — server component shell (setup context + sales promise) mounting the console.

The extraction return type is deliberately stable so Milestone 2 can swap in an AI route behind the same shape.

## Next Recommended Product Work

Milestone 2 — AI extraction and drafting:

1. Add a server route that takes inquiry text + operator profile and returns the same `ExtractedLead` shape plus a draft reply.
2. Use structured output validation; fall back to the deterministic logic when no API key is configured.
3. Keep the captain-approval trust model intact.

After that:

1. Add operator setup persistence (database + real profile/trip editing).
2. Add lead tracking and status pipeline.
3. Add quote links.

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
