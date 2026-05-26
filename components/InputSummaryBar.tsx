"use client";

interface InputSummaryBarProps {
  teamIdentity: string;
  selectedIssues: string[];
}

export function InputSummaryBar({
  teamIdentity,
  selectedIssues,
}: InputSummaryBarProps) {
  if (!teamIdentity && selectedIssues.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Current game snapshot
          </p>
          <p className="text-sm text-slate-300">
            These are the coaching signals CoachLens will use to build the next
            practice plan.
          </p>
        </div>
        {teamIdentity ? (
          <span className="inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-orange-100">
            Team style: {teamIdentity}
          </span>
        ) : null}
      </div>

      {selectedIssues.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedIssues.map((issue) => (
            <span
              key={issue}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {issue}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
