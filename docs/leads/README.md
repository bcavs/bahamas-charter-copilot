# Captain Outreach List

Sales prospect list of Bahamas charter and tour operators for the Phase 1
validation push (see `docs/03-go-to-market.md` → "Sales Sequence"). This is the
business source of truth for outreach targets; keep it current as leads progress.

- **File:** [`captain-outreach-list.csv`](captain-outreach-list.csv)
- **Last updated:** 2026-06-18
- **Count:** 38 operators (9 originally pulled into Notion + 29 researched)

## Schema

Matches the original Notion "Lead Tracking" export so the CSV can be re-imported
into Notion (columns match by name; `Island` is an added property):

`Priority`, `Priority Reasoning`, `Lead Name`, `Contact Person`, `WhatsApp`,
`Phone`, `Email`, `Instagram Handle`, `Website`, `3P Website`, `Status`,
`Last Contact Date`, `Next Follow-up`, `Response`, `Island`

## Priority logic

Reflects the ICP in `docs/03-go-to-market.md` — fit is highest for owner-operated
captains who already take bookings by WhatsApp/phone/DM and lack a polished
automated checkout.

- **High** — already books via WhatsApp / phone / DM, no polished checkout (best fit for the wedge).
- **Medium** — Instagram- or third-party-only, or contact details still need verifying.
- **Low** — already has a self-serve booking flow (lower urgency for our pitch).

## Data quality caveats

- **No fabricated contact data.** Every phone, email, and handle was taken from a
  real source. Unverified fields are left **blank** rather than guessed.
- Most operator sites and Instagram blocked automated fetching, so many details
  came from search-result snippets quoting the real pages. Glance at the source
  before outreach.
- `WhatsApp` is filled only where a page explicitly stated a WhatsApp number; many
  other 242 mobiles are likely WhatsApp-capable but were left blank.
- Rows flagged in `Priority Reasoning` still need a field verified before contact
  (e.g. Delfin's IG handle, Tropic Sea's local WhatsApp, and the contact details
  for Crazy Bahamian, Exuma Boat Tours, Eleuthera's Salty Discoveries, Capt. Kid,
  and Abaco Off The Charts).
- Two distinct "Island Boy" businesses exist (Exuma vs. Abaco) and are separate rows.
