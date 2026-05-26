interface TeamIdentitySelectProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TeamIdentitySelect({
  options,
  value,
  onChange,
  error,
}: TeamIdentitySelectProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-white">Team style</h2>
        <p className="text-sm text-slate-400">
          Choose the style your team is built around so the plan stays grounded in
          how you want to play.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => {
          const isSelected = option === value;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-2xl border px-4 py-4 text-left transition duration-200 ${
                isSelected
                  ? "border-accent bg-accent/10 text-white shadow-glow"
                  : "border-white/10 bg-surface/70 text-slate-300 hover:border-accent/40 hover:bg-white/5"
              }`}
            >
              <div className="text-sm font-semibold">{option}</div>
            </button>
          );
        })}
      </div>

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </section>
  );
}
