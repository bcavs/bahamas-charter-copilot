// Static operator profile for the prototype.
//
// This stands in for the data a captain will eventually enter during operator
// setup (see docs/02-mvp-spec.md). The sample operator is Nassau-based — the
// first sales focus (see docs/03-go-to-market.md) — so trips, pickup areas,
// and routes reflect what a New Providence captain realistically runs.

export const ACTIVITIES = [
  "snorkeling",
  "swimming pigs",
  "fishing",
  "scuba",
  "island hopping",
  "sunset cruise",
  "sandbar",
] as const;

export type Activity = (typeof ACTIVITIES)[number];

export type Trip = {
  id: string;
  name: string;
  activities: Activity[];
  durationHours: number;
  // Per-charter pricing keeps quotes simple and avoids implying a per-person
  // commitment the captain has not configured.
  basePrice: number;
  priceBasis: "per charter" | "per guest";
  maxGuests: number;
  inclusions: string[];
};

export type OperatorProfile = {
  businessName: string;
  captainName: string;
  homeIsland: string;
  whatsappNumber: string;
  pickupAreas: string[];
  // Tone is a hint for the draft reply, not free-form instructions.
  tone: "warm" | "professional" | "casual";
  depositRule: string;
  cancellationPolicy: string;
  trips: Trip[];
};

export const sampleOperator: OperatorProfile = {
  businessName: "Cay Blue Charters",
  captainName: "Captain Andre",
  homeIsland: "Nassau",
  whatsappNumber: "+1 242 555 0123",
  pickupAreas: [
    "Nassau Harbour",
    "Paradise Island",
    "Atlantis Marina",
    "Palm Cay Marina",
  ],
  tone: "warm",
  depositRule: "30% deposit confirms the date",
  cancellationPolicy:
    "Full refund with 48 hours notice, weather reschedules are free",
  trips: [
    {
      id: "reef-snorkel-half-day",
      name: "Reef Snorkel Half-Day",
      activities: ["snorkeling", "sandbar"],
      durationHours: 4,
      basePrice: 750,
      priceBasis: "per charter",
      maxGuests: 8,
      inclusions: ["Snorkel gear", "Cold drinks", "Rose Island reef stops"],
    },
    {
      id: "rose-island-beach-day",
      name: "Rose Island Beach & Sandbar Day",
      activities: ["sandbar", "snorkeling"],
      durationHours: 6,
      basePrice: 1100,
      priceBasis: "per charter",
      maxGuests: 10,
      inclusions: ["Beach + sandbar stops", "Lunch & drinks", "Snorkel gear"],
    },
    {
      id: "exuma-pigs-day-trip",
      name: "Exuma Pigs & Cays Day Trip",
      activities: ["swimming pigs", "snorkeling", "island hopping", "sandbar"],
      durationHours: 9,
      basePrice: 2200,
      priceBasis: "per charter",
      maxGuests: 8,
      inclusions: [
        "Long-range powerboat from Nassau",
        "Pig Beach + multi-cay route",
        "Lunch & drinks",
      ],
    },
    {
      id: "offshore-fishing",
      name: "Offshore Sport Fishing",
      activities: ["fishing"],
      durationHours: 6,
      basePrice: 1200,
      priceBasis: "per charter",
      maxGuests: 6,
      inclusions: ["Rods & tackle", "Bait", "Catch cleaning"],
    },
    {
      id: "sunset-harbour-cruise",
      name: "Sunset Harbour Cruise",
      activities: ["sunset cruise"],
      durationHours: 2.5,
      basePrice: 600,
      priceBasis: "per charter",
      maxGuests: 12,
      inclusions: ["Drinks & music", "Paradise Island skyline", "Photos"],
    },
  ],
};
