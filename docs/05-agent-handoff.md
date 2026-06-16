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

The app is a Next.js App Router project with a static prototype shell at `src/app/page.tsx`.

The prototype currently shows:

- operator setup inputs conceptually
- sample incoming WhatsApp message
- extracted fields
- draft reply
- copy/open WhatsApp actions

## Next Recommended Product Work

Build an interactive local prototype:

1. Add a textarea for pasted inquiry text.
2. Add static operator/trip data.
3. Implement deterministic extraction for obvious fields.
4. Generate a draft reply from local rules.
5. Add a working copy button.
6. Keep it mobile-first.

After that:

1. Add an AI route for extraction and drafting.
2. Add structured output validation.
3. Add operator setup persistence.
4. Add lead tracking.
5. Add quote links.

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
