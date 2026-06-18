# Decision Log

A running, chronological record of the major directions and pivots for Bahamas
Charter Copilot. Newest entries first. Each entry notes **what** was decided,
**why**, and the **date** it was decided.

This is the durable memory of *why* the product is shaped the way it is. When a
direction changes, do not delete the old entry — add a new one that supersedes
it, so the reasoning behind past pivots stays visible.

---

## 2026-06-18 — Drop the lead-tracking / CRM direction

**Decision:** Do not build lead tracking, contact CRM, or a status pipeline on
top of the current manual copy-paste flow.

**Why:** The copy-paste workflow relocates work rather than removing it (switch
apps, paste, copy, switch back, send). Adding tracking on top turns the captain
into a data-entry clerk — work added, not removed. "Be more automatic" and "don't
build a CRM" turn out to be the same problem: memory only feels like manual data
entry because messages don't flow through our system. Once a real channel
integration exists, contact/trip history becomes a byproduct of the message pipe
and the captain maintains nothing.

**What this means going forward:**

- The merged prototype is a **test rig** to answer one question: are the AI drafts
  good enough that a captain would actually send them? It is not the product.
- Next moves, in order: (1) build nothing more on the manual flow, (2) validate
  draft quality with one real Nassau captain, (3) only then pursue channel
  integration — and pressure-test the WhatsApp Business API friction first.

**See:** `docs/05-agent-handoff.md` → "Strategic Direction".

---

## 2026-06-17 — Merge the prototype to `main`

**Decision:** Merge the lead-to-quote prototype, AI extraction/drafting, and
editable operator setup into `main`.

**Why:** Milestones 1 and 2 plus operator setup were complete and verified
(`npm run lint`, `npm run build`). Consolidating onto `main` gives a single,
demo-able baseline to validate against. Profiles remain browser-local
(localStorage) — backend persistence stays deferred until there are design
partners.

---

## 2026-06-16 — Foundational strategy (project inception)

These decisions were set when the project's business strategy was first
documented. They remain in force unless a later entry supersedes them. Full
reasoning lives in `docs/00-overview.md` and `docs/01-product-strategy.md`.

- **Customer:** Bahamas charter and tour operators first; boutique hotels second;
  vacation-rental managers third.
- **Channel:** WhatsApp first.
- **Wedge:** Inbound lead capture and conversion, ending around quote/deposit
  intent — not full booking management.
- **Trust model:** Copilot, not autonomous bot. Captains approve every
  customer-facing message.
- **Form factor:** Mobile-first web companion before any native app or full
  WhatsApp Business API integration.
- **Explicitly deferred:** marketplace, native app, hotel/vacation-rental
  dashboards, full booking calendar, autonomous WhatsApp responder, complex
  availability engine, payments beyond simple links, broad travel planning.
