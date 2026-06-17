// Zod schema for the operator profile.
//
// Used to validate (a) profiles restored from the browser's localStorage and
// (b) the operator object the client sends to /api/analyze. Keeping it isomorphic
// (no server-only imports) lets both the client editor and the API route share it.

import { z } from "zod/v4";

import { ACTIVITIES, type OperatorProfile } from "./operator";

export const tripSchema = z.object({
  id: z.string(),
  name: z.string(),
  activities: z.array(z.enum(ACTIVITIES)),
  durationHours: z.number(),
  basePrice: z.number(),
  priceBasis: z.enum(["per charter", "per guest"]),
  maxGuests: z.number().int(),
  inclusions: z.array(z.string()),
});

export const operatorProfileSchema = z.object({
  businessName: z.string(),
  captainName: z.string(),
  homeIsland: z.string(),
  whatsappNumber: z.string(),
  pickupAreas: z.array(z.string()),
  tone: z.enum(["warm", "professional", "casual"]),
  depositRule: z.string(),
  cancellationPolicy: z.string(),
  trips: z.array(tripSchema),
});

// Compile-time guarantee that the schema stays in sync with the OperatorProfile type.
type SchemaProfile = z.infer<typeof operatorProfileSchema>;
const _typeCheck: SchemaProfile extends OperatorProfile
  ? OperatorProfile extends SchemaProfile
    ? true
    : never
  : never = true;
void _typeCheck;
