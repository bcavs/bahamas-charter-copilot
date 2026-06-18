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

## Strategic Direction (2026-06-18)

We pressure-tested the previously-recommended "lead tracking + CRM" direction and
**decided against it.** The reasoning matters, so it is recorded here:

- The current copy-paste flow does not take work off the captain's plate — it
  relocates it. Captain switches apps, pastes the inquiry, reads the draft,
  copies it, switches back, pastes, sends. For quick inquiries that is *more*
  steps, not fewer.
- Layering lead/contact tracking on top of a manual flow makes it worse: it asks
  the captain to also be a data-entry clerk. That is a CRM, i.e. work added, not
  removed. It is the dashboard-of-empty-tables trap the design principles warn
  about.
- "The product must be more automatic" and "do not build a CRM" are the same
  problem with the same fix. Memory feels like manual data entry only because
  messages do not flow through our system. Once they do (real channel
  integration), inbound arrives automatically, the draft is waiting for one-tap
  approval, and contact/trip history becomes a **byproduct of the message pipe** —
  the captain maintains nothing. The "CRM" builds itself.

### What the merged prototype actually is

A **test rig for one question: are the AI drafts good enough that a captain would
actually send them?** It is not the product. It validates the intelligence, not
the workflow.

### Next moves (in order)

1. **Do not build more features on the manual copy-paste flow.** Specifically: no
   lead tracking, no contact CRM, no status pipeline.
2. **Validate draft quality with one real Nassau captain.** Near-zero build, a few
   days. Answers whether the intelligence is worth automating before any
   integration work is sunk.
3. **If drafts are send-ready, the next build is channel integration, not CRM** —
   the version that actually removes labor and makes the memory layer free.
   Before committing, pressure-test the WhatsApp path: real cost/friction of the
   Business API (business verification, template-message rules, 24-hour session
   window, possible number migration — the reasons it was deferred) and whether a
   lighter-weight automatic channel exists.

Deferred (revisit only after the above): quote links, backend persistence,
prompt-caching the operator system prompt.

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
