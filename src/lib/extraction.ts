// Deterministic lead extraction for the local prototype.
//
// This intentionally avoids AI. It pulls the obvious fields out of a pasted
// WhatsApp inquiry with plain rules so the workflow is fast, predictable, and
// testable. Milestone 2 (docs/02-mvp-spec.md) swaps this for an AI route behind
// the same shape, so keep the return type stable.

import type { Activity, OperatorProfile, Trip } from "./operator";

export type ExtractedLead = {
  rawText: string;
  datePhrase: string | null;
  groupSize: number | null;
  activities: Activity[];
  pickup: string | null;
  budget: number | null;
  timing: "morning" | "afternoon" | null;
  missing: string[];
  suggestedTrip: Trip | null;
  confidence: "low" | "medium" | "high";
};

const ACTIVITY_KEYWORDS: Record<Activity, string[]> = {
  snorkeling: ["snorkel", "snorkeling", "snorkelling", "reef"],
  "swimming pigs": ["pig", "pigs", "swimming pig", "pig beach"],
  fishing: ["fish", "fishing", "deep sea", "offshore", "reel"],
  scuba: ["scuba", "dive", "diving", "two tank"],
  "island hopping": ["island hop", "island hopping", "hop", "exuma tour"],
  "sunset cruise": ["sunset", "evening cruise", "champagne"],
  sandbar: ["sandbar", "sand bar", "starfish"],
};

const DAY_WORDS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const MONTH_WORDS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function detectActivities(text: string): Activity[] {
  const found: Activity[] = [];
  for (const activity of Object.keys(ACTIVITY_KEYWORDS) as Activity[]) {
    if (ACTIVITY_KEYWORDS[activity].some((kw) => text.includes(kw))) {
      found.push(activity);
    }
  }
  return found;
}

function detectGroupSize(text: string): number | null {
  // Patterns ordered from most specific to least, returning the first hit.
  const patterns: RegExp[] = [
    /(?:party|group)\s+of\s+(\d{1,2})/,
    /(?:we(?:'re| are)?|there(?:'s| is| are)?)\s+(\d{1,2})\s+of\s+us/,
    /(\d{1,2})\s+of\s+us/,
    /for\s+(\d{1,2})\s+(?:people|guests|pax|persons|adults)/,
    /(\d{1,2})\s+(?:people|guests|pax|persons|adults|of us)/,
    /take\s+(\d{1,2})/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const n = Number(match[1]);
      if (n > 0 && n < 100) return n;
    }
  }
  return null;
}

function detectDatePhrase(text: string): string | null {
  if (/\btomorrow\b/.test(text)) return "Tomorrow";
  if (/\btoday\b/.test(text)) return "Today";
  if (/\b(this|next)\s+weekend\b/.test(text)) {
    const m = text.match(/\b(this|next)\s+weekend\b/);
    return m ? capitalize(m[0]) : "Weekend";
  }
  const dayMatch = text.match(
    new RegExp(`\\b(this|next)?\\s*(${DAY_WORDS.join("|")})\\b`),
  );
  if (dayMatch) return capitalize(dayMatch[0].trim());

  const monthMatch = text.match(
    new RegExp(`\\b(${MONTH_WORDS.join("|")})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b`),
  );
  if (monthMatch) return capitalize(monthMatch[0]);

  const numericDate = text.match(/\b(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\b/);
  if (numericDate) return numericDate[1];

  return null;
}

function detectPickup(text: string, operator: OperatorProfile): string | null {
  for (const area of operator.pickupAreas) {
    if (text.includes(area.toLowerCase())) return area;
  }
  // Catch common landmarks even if they are not in the configured list.
  const landmarks = ["atlantis", "paradise island", "nassau", "marina", "downtown"];
  for (const landmark of landmarks) {
    if (text.includes(landmark)) return capitalize(landmark);
  }
  return null;
}

function detectBudget(text: string): number | null {
  const match = text.match(/(?:\$|usd\s?|budget\s+(?:of\s+|around\s+|is\s+)?)(\d{2,5})/);
  if (match) {
    const n = Number(match[1]);
    if (n >= 50) return n;
  }
  return null;
}

function detectTiming(text: string): "morning" | "afternoon" | null {
  if (/\b(morning|am|sunrise|early)\b/.test(text)) return "morning";
  if (/\b(afternoon|pm|sunset|evening|late)\b/.test(text)) return "afternoon";
  return null;
}

function matchTrip(
  activities: Activity[],
  groupSize: number | null,
  operator: OperatorProfile,
): Trip | null {
  if (activities.length === 0) return null;

  let best: Trip | null = null;
  let bestScore = 0;
  for (const trip of operator.trips) {
    const overlap = trip.activities.filter((a) => activities.includes(a)).length;
    if (overlap === 0) continue;
    // Reward more matched activities, lightly penalize trips that cannot seat
    // the group so an oversized party does not get an undersized boat.
    let score = overlap * 10;
    if (groupSize && groupSize > trip.maxGuests) score -= 5;
    if (score > bestScore) {
      bestScore = score;
      best = trip;
    }
  }
  return best;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function extractLead(
  rawText: string,
  operator: OperatorProfile,
): ExtractedLead {
  const text = rawText.toLowerCase();

  const datePhrase = detectDatePhrase(text);
  const groupSize = detectGroupSize(text);
  const activities = detectActivities(text);
  const pickup = detectPickup(text, operator);
  const budget = detectBudget(text);
  const timing = detectTiming(text);
  const suggestedTrip = matchTrip(activities, groupSize, operator);

  const missing: string[] = [];
  if (!datePhrase) missing.push("Preferred date");
  if (!groupSize) missing.push("Group size");
  if (!pickup) missing.push("Pickup area");
  if (!timing) missing.push("Morning or afternoon");

  // Confidence reflects how much of the core booking picture we have.
  const coreSignals = [datePhrase, groupSize, activities.length > 0].filter(
    Boolean,
  ).length;
  const confidence: ExtractedLead["confidence"] =
    coreSignals >= 3 ? "high" : coreSignals === 2 ? "medium" : "low";

  return {
    rawText,
    datePhrase,
    groupSize,
    activities,
    pickup,
    budget,
    timing,
    missing,
    suggestedTrip,
    confidence,
  };
}
