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

The app is a Next.js App Router project. Built so far: Milestone 1 (interactive prototype), Milestone 2 (AI extraction + drafting), and editable operator setup. The default sample operator is Nassau-based — the first sales focus.

Structure:

- `src/lib/operator.ts` — operator/trip types, the `ACTIVITIES` tuple, and the Nassau `sampleOperator` default.
- `src/lib/operatorSchema.ts` — Zod schema (`operatorProfileSchema`) for validating profiles from storage and request bodies. Isomorphic (no server-only imports).
- `src/lib/operatorStore.ts` — browser-backed profile store read via `useSyncExternalStore` (hydration-safe, no setState-in-effect). `writeOperator` persists to localStorage and notifies subscribers.
- `src/lib/extraction.ts` — deterministic lead extraction (`extractLead`), the offline fallback.
- `src/lib/draft.ts` — rule-based draft reply (`buildDraftReply`) plus `buildWhatsAppLink`, the offline fallback. Never invents availability or a final price.
- `src/lib/ai.ts` — server-only AI analysis (`analyzeInquiryWithAI`). One Claude call (`messages.parse` + a Zod structured-output schema) extracts the lead and writes the draft, using whatever operator profile it's passed. Model defaults to `claude-opus-4-8`, overridable via `ANTHROPIC_MODEL`. Throws on no key/error so the route can fall back.
- `src/app/api/analyze/route.ts` — `POST /api/analyze`. Validates the `operator` in the body (falls back to `sampleOperator` if missing/malformed), tries AI, falls back to the rules engine; response includes `source: "ai" | "rules"`.
- `src/components/Workspace.tsx` — client parent that owns operator state (via the store) and renders the setup editor + console.
- `src/components/OperatorSetup.tsx` — editable profile + trip-menu form (collapsible, mobile-first, persisted to this device).
- `src/components/InquiryConsole.tsx` — takes the operator as a prop, sends it with each request; "Generate reply" button, lead panel, draft, copy + open-in-WhatsApp.
- `src/app/page.tsx` — server component shell mounting `Workspace`.
- `.env.example` — `ANTHROPIC_API_KEY` (enables AI) and optional `ANTHROPIC_MODEL`.

Operator setup is stored in the browser (localStorage) only — there is no backend persistence yet, so profiles don't sync across devices. Without `ANTHROPIC_API_KEY` the app still works end-to-end via the rules fallback.

## Next Recommended Product Work

1. Lead tracking and a status pipeline (new / needs info / quoted / follow-up / won / lost). Save each analyzed inquiry as a lead.
2. Quote links (public quote page per lead).
3. Backend persistence for operator profiles + leads (replace localStorage) once there are design partners; deploy to a URL for in-person demos.
4. Optional: prompt-cache the operator system prompt to cut per-inquiry cost.

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
