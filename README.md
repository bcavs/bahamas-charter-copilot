# Bahamas Charter Copilot

WhatsApp-first lead conversion copilot for Bahamas charter and tour operators.

## Start Here

This repo contains both the application and the business context for the idea.

Read these before making product decisions:

- [docs/00-overview.md](docs/00-overview.md) - business idea, customer, wedge, and long-term path
- [docs/01-product-strategy.md](docs/01-product-strategy.md) - sequencing, positioning, trust model, and moat
- [docs/02-mvp-spec.md](docs/02-mvp-spec.md) - first build scope and product requirements
- [docs/03-go-to-market.md](docs/03-go-to-market.md) - validation plan, first customers, pricing, and sales script
- [docs/04-research-notes.md](docs/04-research-notes.md) - assumptions, sources, and open questions
- [docs/05-agent-handoff.md](docs/05-agent-handoff.md) - compact context for Claude Code, Codex, or other agents

## Current Product Wedge

The first product should help a charter captain turn a messy WhatsApp inquiry into a professional reply and quote in under 60 seconds.

Phase 1 stays focused on lead capture and conversion:

- operator setup for trips, rates, routes, policies, and FAQs
- pasted or forwarded WhatsApp inquiry parsing
- lead extraction for date, group size, intent, and missing details
- AI-drafted reply and quote recommendation
- captain-approved copy/open-in-WhatsApp workflow
- quote link generation before full booking management

## Deliberately Out of Scope

- native mobile app
- full WhatsApp Business API onboarding
- booking calendar
- marketplace
- hotel and vacation rental integrations
- autonomous customer replies

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- npm
