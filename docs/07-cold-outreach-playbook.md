# Cold Outreach Playbook

How we run first-touch outreach to the operators in [`docs/leads/`](leads/).
Companion to `docs/03-go-to-market.md` (strategy) — this is the tactical
execution layer. **Decisions baked in:** WhatsApp-first channel, a pre-built
mini-demo for every High-priority captain.

## Objective

Convert **1–3 design partners**, not run a campaign. Success is a captain
saying "Can I use this?" / "Does it work with my trips?" / "How much?" /
"Can it follow up for me?" — not praise. Volume is low, personalization is high,
founder-led.

## Why WhatsApp-first

These captains book on WhatsApp. A clean, fast, personalized WhatsApp message
**is** the product demo — it shows "I reply fast and professionally" before we
explain anything. It also dogfoods the exact workflow we're selling. Cold
WhatsApp to a public business number is normal in this market.

- Reachable now (~30 leads with a WhatsApp/phone number): start here.
- IG/web-only leads (WHW 242, Fishing 242, KeepItSalty, Crazy Bahamian, Exuma
  Boat Tours, Eleuthera's Salty Discoveries, Capt. Kid, Abaco Off The Charts):
  parked for a later Instagram-DM pass; fill in a number first where possible.

## The core mechanic: show, don't ask

Do **not** open by asking for their real inquiries (that's homework on a cold
contact). Instead, pre-build a 20-second mock for each High-priority captain:

1. Pull their public trip info (website / IG / 3P listing) — trip types, group
   sizes, island.
2. Write a realistic inbound customer inquiry for one of their trips.
3. Run it through the copilot (or hand-craft output that matches what the
   product actually produces) and screenshot the result: extracted lead details,
   the one or two missing questions, and the drafted reply + quote format.

**Stay on-brand with the product:** the copilot never invents availability or a
final price. The mock reply gathers details, recommends the right trip, flags
missing info, and leaves the rate as the captain's to confirm. Showing a fake
hard price undercuts the trust model and looks dishonest to a captain who knows
their own pricing.

## Message sequence (WhatsApp)

Keep each message short — phone-native, no walls of text. Send during Bahamas
daytime hours. One demo per captain.

**Message 1 — opener (revenue/speed hook, no AI talk):**

> Hi Captain [Name], this is Ben. I build a little WhatsApp helper for Bahamas
> charter captains so inquiries turn into clean replies + quotes in under a
> minute — so you don't lose leads while you're on the water. Mind if I show you
> a quick 20-sec example using one of your own trips? 🎣

**Message 2 — the demo (send right after they say "sure," or after a short
beat if no reply):** the screenshot/mock built for their business, with one line:

> Here's what it would've replied to a message like *"[their mock inquiry]"* —
> drafted in seconds, you just tap approve before it sends.

**Message 3 — the ask:**

> Would you have sent that? Happy to set it up on your real trips and rates so
> you can try it on your next few inquiries — no charge while we're testing.

## Follow-up cadence

Map to the `Last Contact Date` / `Next Follow-up` columns in the lead sheet.

- **Day 0** — Message 1 (+ Message 2 if they engage).
- **Day 3** — if no reply, send the demo anyway: *"Built this for you anyway,
  Captain — [screenshot]. No worries if it's not useful, just thought it'd save
  you time on the busy days."*
- **Day 7** — one soft final touch, then stop. Three touches max; do not spam.
  These are real businesses and reputation matters in a small market.

## Tiering by priority

- **High** (already books via WhatsApp/phone/DM): full pre-built demo. Best fit,
  worth the effort.
- **Medium** (IG/3P-only, or details unverified): lighter touch — opener + offer
  to build a demo if they bite. Verify a contact number first.
- **Low** (HHH Charters — already has a booking flow): deprioritize; revisit only
  after design partners are signed.

## Warm beachhead: Get Hooked

Capt. Lance (familial connection) is the warm start, not cold. Use him to:

- Pressure-test the demo and messaging honestly before going cold.
- Be design partner #1 if the drafts are good.
- Ask for 2–3 captain introductions — a warm intro outperforms any cold message
  in this market.

## Objection handling

- **"How much?"** — "While we're testing, free. After that I'm thinking simple
  monthly, but I'd rather get it working for you first." (Pricing lives in
  `docs/03-go-to-market.md`; don't over-commit on a cold chat.)
- **"Does it work with my trips?"** — "Yes — I set it up with your actual trips,
  rates, and policies. That's the demo I just sent." 
- **"Can it follow up for me?"** — note the interest (strong buying signal) but
  stay honest: today it drafts, you approve and send. Auto follow-up is on the
  roadmap, not built.
- **"Is this a bot replying to my customers?"** — "No — it drafts, you approve
  every message before it goes out. You stay in control." (Copilot, not bot.)

## Tracking

Log every touch back into [`docs/leads/captain-outreach-list.csv`](leads/captain-outreach-list.csv):

- `Status`: `New Lead` → `Contacted` → `Demo Sent` → `In Conversation` →
  `Design Partner` / `Not Interested`.
- `Last Contact Date` / `Next Follow-up`: keep current so the cadence above runs
  itself.
- `Response`: paste their actual reply — it's the raw validation signal.

---

## Worked example A — warm (Get Hooked, Capt. Lance)

> Hey Lance, it's Ben. Been building that WhatsApp tool I mentioned — it turns a
> customer's messy inquiry into a ready-to-send reply + quote in seconds, you
> just approve it. Can I set it up with your trips and have you try it on a few
> real messages this week? Would love your honest take, and if it's any good,
> who else should I show?

## Worked example B — cold High-priority (Jackson's Charters, Eleuthera)

Public trips: private charters, turtle feeding, sandbar stops, snorkel reefs,
fishing. WhatsApp on file: +1-242-802-3896.

**Mock inquiry (what a customer might send):**

> "Hi! Family of 4 (kids are 10 and 13) in Harbour Island March 14–18. Want to
> see the turtles and do some easy snorkeling — what do you offer?"

**Copilot output to screenshot:**

- **Lead:** party of 4 (2 adults, 2 kids ~10 & 13) · Mar 14–18 · Harbour Island ·
  interest: turtles + beginner snorkel
- **Missing:** preferred day, pickup point
- **Suggested reply (captain approves before sending):**
  > "Hi! 🐢 Perfect — for a family of 4 I'd recommend my half-day private
  > charter: turtle feeding at the flats plus an easy reef snorkel the kids will
  > love, gear included. Which day Mar 14–18 works best, and where are you
  > staying for pickup? Half-day private runs **[Capt. Jackson's rate]** — I'll
  > confirm the exact quote once I have your day."

Note the rate stays Jackson's to fill — the copilot frames the quote, it doesn't
fabricate a price.

**Send sequence:** opener → screenshot of the above → "Would you have sent that?"
