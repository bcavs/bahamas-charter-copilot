import Workspace from "@/components/Workspace";

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
            Nassau · AI demo
          </div>
        </header>

        <Workspace />
      </section>
    </main>
  );
}
