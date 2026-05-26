"use client";

interface EmptyResultsPlaceholderProps {
  onLoadDemo: () => void;
}

export function EmptyResultsPlaceholder({
  onLoadDemo,
}: EmptyResultsPlaceholderProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-2xl shadow-black/15">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/10 p-6">
        <div className="pointer-events-none absolute inset-x-12 top-8 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-12 bottom-8 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-white/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

        <div className="relative max-w-2xl space-y-4">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Practice plan preview
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Pick what broke down. Get a practice plan in seconds.
          </h2>
          <p className="max-w-xl text-sm leading-6 text-slate-300">
            CoachLens turns your game issues into one weekly target, clear
            priorities, and drills you can run in the next practice.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Weekly target you can track",
              "Top 3 priorities for the next session",
              "Drills matched to the problem",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onLoadDemo}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Load demo game
            </button>
            <span className="inline-flex items-center text-sm text-slate-400">
              Built for post-game coaching decisions, not a generic chatbot.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
