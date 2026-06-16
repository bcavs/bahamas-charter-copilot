# MVP Spec

## MVP Goal

A charter captain can paste a real WhatsApp inquiry, review extracted lead details, and copy a professional reply in under 60 seconds.

## Primary User

The primary user is an owner-operator or small fleet operator who handles sales directly, often from a phone.

User assumptions:

- uses WhatsApp heavily
- is busy during the day
- may not trust automation immediately
- wants more bookings, not more software
- values speed, clarity, and fewer missed opportunities

## First User Journey

1. Operator sets up their business.
2. Operator pastes a WhatsApp inquiry into the tool.
3. Tool extracts lead fields.
4. Tool flags missing information.
5. Tool recommends the best matching trip.
6. Tool drafts a WhatsApp-ready reply.
7. Operator copies the reply or opens WhatsApp.
8. Operator marks lead status.

## Core Screens

### Landing / Demo Surface

Purpose: make the concept obvious.

Must show:

- incoming inquiry
- extracted details
- draft reply
- quote or next-step action

### Operator Setup

Purpose: collect enough context for useful quoting.

Fields:

- business name
- WhatsApp number
- home island or operating area
- pickup locations
- trip types
- trip durations
- base pricing
- max guests
- inclusions
- add-ons
- policies
- FAQs
- preferred tone

### Inquiry Parser

Purpose: turn unstructured customer text into lead data.

Input:

- pasted WhatsApp message

Output:

- date or date phrase
- group size
- desired activity
- route or destination intent
- pickup location if present
- budget if present
- missing details
- suggested trip match
- confidence level

### Draft Reply

Purpose: give the captain a useful response without taking control.

Requirements:

- clear, friendly, WhatsApp-length response
- asks only for missing information
- includes a recommended trip when enough data exists
- does not invent availability
- does not promise final price unless pricing is configured
- can be copied
- later can open WhatsApp with prefilled text

### Lead Status

Purpose: lightweight pipeline, not a full CRM.

Statuses:

- new
- needs info
- quoted
- follow-up due
- won
- lost

## Data Model Draft

Early entities:

- `Operator`
- `Trip`
- `PickupLocation`
- `Policy`
- `Lead`
- `LeadMessage`
- `QuoteDraft`

Avoid overbuilding:

- no complex calendar yet
- no availability engine yet
- no marketplace inventory model yet
- no multi-operator routing yet

## AI Behavior

AI should be used for:

- extraction from messy inquiry text
- missing-detail detection
- trip matching
- draft reply generation

AI should not initially:

- send customer messages automatically
- make final availability commitments
- invent policies
- invent exact prices
- replace captain approval

## First Technical Milestones

### Milestone 1: Interactive Local Prototype

- paste inquiry
- deterministic mock extraction
- static operator data
- generated reply from local rules
- copy reply button

### Milestone 2: AI Extraction and Drafting

- add server route for extraction/drafting
- use structured output
- return extracted fields plus draft reply
- handle missing API key gracefully

### Milestone 3: Operator Setup Persistence

- add database
- save operator profile
- save trip menu
- use saved setup in drafting

### Milestone 4: Lead Pipeline

- save leads
- show lead list
- update statuses
- show follow-up due reminders

### Milestone 5: Quote Link

- generate public quote page
- include trip summary, price range, inclusions, policies, and CTA
- payment link can remain manual initially

## Non-Goals For MVP

- native mobile app
- full WhatsApp Business API onboarding
- full booking calendar
- hotel dashboards
- rental manager dashboards
- marketplace search
- autonomous WhatsApp bot
- multi-language support
- payment processing beyond simple links

## Definition of Done For First Sellable Demo

The demo is ready for operator conversations when:

- a real inquiry can be pasted
- fields are extracted or convincingly mocked
- the reply is useful enough to send
- the operator can copy it in one tap
- the screen works well on mobile
- the value prop is understandable without explanation
