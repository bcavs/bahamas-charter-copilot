// Server-only: AI-powered lead extraction and draft generation (Milestone 2).
//
// One Claude call both extracts the lead and writes the draft reply, using
// structured outputs so the result is schema-validated. This handles messy,
// varied inquiries the deterministic regex layer can't. The return shape
// matches the deterministic path (src/lib/extraction.ts) so the route can fall
// back to rules when no API key is configured or the call fails.
//
// Never import this from a Client Component — it reads the API key from the
// environment and must stay on the server.

import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod/v4";

import type { ExtractedLead } from "./extraction";
import type { Activity, OperatorProfile } from "./operator";

const ACTIVITIES: [Activity, ...Activity[]] = [
  "snorkeling",
  "swimming pigs",
  "fishing",
  "scuba",
  "island hopping",
  "sunset cruise",
  "sandbar",
];

// Default to the most capable model; let operators tune cost via env without a
// code change (e.g. ANTHROPIC_MODEL=claude-haiku-4-5).
const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";

const analysisSchema = z.object({
  datePhrase: z
    .string()
    .nullable()
    .describe("The date or date phrase the customer gave, e.g. 'next Friday'. Null if absent."),
  groupSize: z
    .number()
    .int()
    .nullable()
    .describe("Number of guests, if stated or clearly implied. Null if absent."),
  activities: z
    .array(z.enum(ACTIVITIES))
    .describe("Activities the customer is interested in, from the allowed set."),
  pickup: z
    .string()
    .nullable()
    .describe("Pickup location if mentioned. Null if absent."),
  budget: z
    .number()
    .nullable()
    .describe("Stated budget in USD, if any. Null if absent."),
  timing: z
    .enum(["morning", "afternoon"])
    .nullable()
    .describe("Preferred time of day if stated or implied. Null if absent."),
  missing: z
    .array(z.string())
    .describe(
      "Short labels for the still-needed details among: Preferred date, Group size, Pickup area, Morning or afternoon.",
    ),
  confidence: z
    .enum(["low", "medium", "high"])
    .describe("Confidence that there is enough to recommend a trip and reply well."),
  suggestedTripId: z
    .string()
    .nullable()
    .describe("The id of the best-matching trip from the operator's menu, or null if none fits."),
  draft: z
    .string()
    .describe("The WhatsApp-ready reply the captain can review and send."),
});

type Analysis = z.infer<typeof analysisSchema>;

function buildSystemPrompt(operator: OperatorProfile): string {
  return [
    `You are a sales copilot for ${operator.businessName}, a ${operator.homeIsland}-based charter operator run by ${operator.captainName}.`,
    "A customer has sent an inbound WhatsApp inquiry. Extract the lead details and draft a reply the captain can review before sending.",
    "",
    "Operator profile (the only facts you may rely on):",
    JSON.stringify(operator, null, 2),
    "",
    "Rules for the draft reply:",
    `- Tone: ${operator.tone}, friendly, and WhatsApp-length (a few short sentences).`,
    "- Recommend the single best-matching trip by name when the inquiry gives enough to choose; otherwise ask what they have in mind.",
    "- Ask only for details that are genuinely missing, grouped into one tidy question.",
    "- Frame price as a starting point using the trip's base price and price basis. Never promise a final or exact total.",
    "- Never invent availability, dates, prices, policies, trips, or inclusions that are not in the operator profile.",
    `- Mention the deposit rule ("${operator.depositRule}") when you recommend a trip.`,
    `- Sign off as "${operator.captainName}, ${operator.businessName}".`,
    "- If the group exceeds a trip's max guests, note that a second boat would be arranged rather than refusing.",
    "",
    "For 'missing', include only labels from this set that are truly absent: Preferred date, Group size, Pickup area, Morning or afternoon.",
    "For 'suggestedTripId', use an exact id from the operator's trips array, or null.",
  ].join("\n");
}

/**
 * Runs AI extraction + drafting. Throws when no API key is configured or the
 * request fails, so callers can fall back to the deterministic path.
 */
export async function analyzeInquiryWithAI(
  rawText: string,
  operator: OperatorProfile,
): Promise<{ lead: ExtractedLead; draft: string }> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const client = new Anthropic();

  const message = await client.messages.parse({
    model: MODEL,
    max_tokens: 2000,
    output_config: {
      effort: "low",
      format: zodOutputFormat(analysisSchema),
    },
    system: buildSystemPrompt(operator),
    messages: [{ role: "user", content: rawText }],
  });

  const parsed = message.parsed_output as Analysis | null;
  if (!parsed) {
    throw new Error("AI response could not be parsed");
  }

  const suggestedTrip =
    operator.trips.find((t) => t.id === parsed.suggestedTripId) ?? null;

  const lead: ExtractedLead = {
    rawText,
    datePhrase: parsed.datePhrase,
    groupSize: parsed.groupSize,
    activities: parsed.activities,
    pickup: parsed.pickup,
    budget: parsed.budget,
    timing: parsed.timing,
    missing: parsed.missing,
    suggestedTrip,
    confidence: parsed.confidence,
  };

  return { lead, draft: parsed.draft };
}
