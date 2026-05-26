export function Header() {
  return (
    <header className="space-y-5">
      <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        Post-game to practice plan
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Pivot
        </h1>
        <p className="max-w-3xl text-lg leading-7 text-slate-100 sm:text-xl">
          Find what changes games.
        </p>
        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
          Turn the issues you saw on the floor into a clear diagnosis, the next
          three practice priorities, and one weekly target coaches can actually
          track.
        </p>
      </div>
    </header>
  );
}
