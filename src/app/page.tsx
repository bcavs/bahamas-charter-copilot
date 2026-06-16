import InquiryConsole from "@/components/InquiryConsole";
import { sampleOperator } from "@/lib/operator";

const setupItems = [
  "Trips, routes, and max guest counts",
  "Base pricing and deposit rules",
  "Pickup locations and inclusions",
  "Cancellation policy and common FAQs",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f4ee] text-[#14120f]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-black/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b6b5f]">
              Bahamas Charter Copilot
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
              Turn messy WhatsApp inquiries into polished charter quotes.
            </h1>
          </div>
          <div className="hidden rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 sm:block">
            Live prototype
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <section className="flex flex-col gap-6">
            <div className="rounded-lg border border-[#1b6b5f]/25 bg-[#e5f3ed] p-5">
              <h2 className="text-lg font-semibold">First sales promise</h2>
              <p className="mt-2 text-sm leading-6 text-black/70">
                A captain can paste a real inquiry, review the extracted lead,
                and copy a professional WhatsApp reply in under 60 seconds.
              </p>
            </div>

            <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Operator setup</h2>
              <p className="mt-2 text-sm leading-6 text-black/60">
                This demo is preloaded with{" "}
                <span className="font-medium text-[#14120f]">
                  {sampleOperator.businessName}
                </span>{" "}
                on {sampleOperator.homeIsland}. Setup captures just enough to
                draft accurate replies:
              </p>
              <ul className="mt-5 grid gap-3">
                {setupItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-black/10 bg-[#faf8f1] px-3 py-2 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-black/50">
                {sampleOperator.trips.length} trips configured · pickup at{" "}
                {sampleOperator.pickupAreas.join(", ")}
              </p>
            </div>
          </section>

          <InquiryConsole />
        </div>
      </section>
    </main>
  );
}
