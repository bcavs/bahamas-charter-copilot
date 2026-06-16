const setupItems = [
  "Trips, routes, and max guest counts",
  "Base pricing and deposit rules",
  "Pickup locations and inclusions",
  "Cancellation policy and common FAQs",
];

const leadSignals = [
  ["Date", "Next Friday"],
  ["Group", "6 guests"],
  ["Intent", "Snorkeling + pigs"],
  ["Missing", "Pickup point, budget, timing"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f4ee] text-[#14120f]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-black/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b6b5f]">
              Bahamas Charter Copilot
            </p>
            <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Turn messy WhatsApp inquiries into polished charter quotes.
            </h1>
          </div>
          <div className="hidden rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 sm:block">
            MVP shell
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <section className="flex flex-col gap-6">
            <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Operator setup</h2>
              <p className="mt-2 text-sm leading-6 text-black/60">
                The first version needs just enough operator context to draft
                accurate replies without pretending to run the whole business.
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
            </div>

            <div className="rounded-lg border border-[#1b6b5f]/25 bg-[#e5f3ed] p-5">
              <h2 className="text-lg font-semibold">First sales promise</h2>
              <p className="mt-2 text-sm leading-6 text-black/70">
                A captain can paste a real inquiry, review the extracted lead,
                and copy a professional WhatsApp reply in under 60 seconds.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-black/10 bg-[#14120f] p-4 text-white shadow-sm sm:p-5">
            <div className="rounded-md bg-[#24211d] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8dd7c4]">
                Incoming WhatsApp
              </p>
              <p className="mt-3 rounded-2xl rounded-tl-sm bg-[#2f5f55] p-4 text-sm leading-6">
                Hey can you take 6 people out next Friday for snorkeling maybe
                pigs too?
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {leadSignals.map(([label, value]) => (
                <div key={label} className="rounded-md bg-white/8 p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-md bg-white p-4 text-[#14120f]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b6b5f]">
                Draft reply
              </p>
              <p className="mt-3 text-sm leading-6">
                Absolutely, we can help with that. For 6 guests next Friday,
                our half-day snorkeling and Pig Beach route is the best fit. I
                just need your preferred pickup area and whether you want a
                morning or afternoon departure, then I can send the quote and
                deposit link.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button className="h-11 rounded-md bg-[#1b6b5f] px-4 text-sm font-semibold text-white">
                  Copy reply
                </button>
                <button className="h-11 rounded-md border border-black/15 px-4 text-sm font-semibold">
                  Open WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
