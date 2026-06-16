// Static operator profile for the local prototype.
//
// This stands in for the data a captain will eventually enter during operator
// setup (see docs/02-mvp-spec.md). Keeping it as plain data lets the extraction
// and drafting logic stay deterministic and easy to test before any AI or
// persistence is added.

export type Activity =
  | "snorkeling"
  | "swimming pigs"
  | "fishing"
  | "scuba"
  | "island hopping"
  | "sunset cruise"
  | "sandbar";

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
  pickupAreas: ["Nassau Harbour", "Paradise Island", "Atlantis Marina"],
  tone: "warm",
  depositRule: "30% deposit confirms the date",
  cancellationPolicy: "Full refund with 48 hours notice, weather reschedules are free",
  trips: [
    {
      id: "pig-beach-snorkel",
      name: "Pig Beach & Snorkel Day",
      activities: ["swimming pigs", "snorkeling", "sandbar"],
      durationHours: 8,
      basePrice: 1450,
      priceBasis: "per charter",
      maxGuests: 8,
      inclusions: ["Snorkel gear", "Lunch & drinks", "Pig Beach + sandbar stops"],
    },
    {
      id: "reef-snorkel-half-day",
      name: "Reef Snorkel Half-Day",
      activities: ["snorkeling", "sandbar"],
      durationHours: 4,
      basePrice: 750,
      priceBasis: "per charter",
      maxGuests: 8,
      inclusions: ["Snorkel gear", "Cold drinks", "Two reef stops"],
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
      id: "sunset-sandbar-cruise",
      name: "Sunset Sandbar Cruise",
      activities: ["sunset cruise", "sandbar"],
      durationHours: 3,
      basePrice: 650,
      priceBasis: "per charter",
      maxGuests: 10,
      inclusions: ["Drinks & music", "Sandbar stop", "Photos"],
    },
    {
      id: "island-hopping-full-day",
      name: "Exuma Island Hopping",
      activities: ["island hopping", "swimming pigs", "snorkeling", "sandbar"],
      durationHours: 9,
      basePrice: 1650,
      priceBasis: "per charter",
      maxGuests: 8,
      inclusions: ["Multi-island route", "Lunch & drinks", "Snorkel gear"],
    },
  ],
};
