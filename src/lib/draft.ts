// Draft reply generation from extracted lead data.
//
// Rules, not AI (Milestone 1). The draft must follow the trust model in
// docs/01-product-strategy.md: it never invents availability or a final price,
// asks only for genuinely missing details, and leaves the captain in control.

import type { ExtractedLead } from "./extraction";
import type { OperatorProfile } from "./operator";

const GREETINGS: Record<OperatorProfile["tone"], string> = {
  warm: "Hey there, thanks so much for reaching out!",
  professional: "Hello, thank you for your inquiry.",
  casual: "Hey! Thanks for the message.",
};

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

function listToProse(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function buildDraftReply(
  lead: ExtractedLead,
  operator: OperatorProfile,
): string {
  const lines: string[] = [];
  lines.push(GREETINGS[operator.tone]);

  const trip = lead.suggestedTrip;
  if (trip) {
    const groupNote =
      lead.groupSize && lead.groupSize > trip.maxGuests
        ? ` For ${lead.groupSize} guests we'd arrange a second boat, since each charter seats up to ${trip.maxGuests}.`
        : "";
    const dateNote = lead.datePhrase ? ` for ${lead.datePhrase.toLowerCase()}` : "";
    lines.push(
      `Based on what you're after, our ${trip.name}${dateNote} is the best fit — it runs about ${trip.durationHours} hours and includes ${listToProse(
        trip.inclusions,
      )}.${groupNote}`,
    );
    // Price is framed, never promised as final, since setup pricing is a base.
    lines.push(
      `It starts at ${formatPrice(trip.basePrice)} ${trip.priceBasis}, and ${operator.depositRule.toLowerCase()}.`,
    );
  } else {
    lines.push(
      "I'd love to help you put together the right trip. Tell me a bit more about what you have in mind and I'll line up the best option.",
    );
  }

  // Ask only for what's missing, in one tidy question.
  if (lead.missing.length > 0) {
    const asks = lead.missing.map((m) => m.toLowerCase());
    lines.push(
      `To send you a firm quote, could you let me know your ${listToProse(
        asks,
      )}?`,
    );
  } else {
    lines.push(
      "I have everything I need — I'll get a firm quote and deposit link over to you shortly.",
    );
  }

  lines.push(`— ${operator.captainName}, ${operator.businessName}`);

  return lines.join("\n\n");
}

export function buildWhatsAppLink(message: string): string {
  // Opens WhatsApp with the reply prefilled; the captain picks the contact and
  // reviews before sending. No customer number is assumed from a pasted message.
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
