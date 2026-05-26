import { useEffect, useMemo, useRef, useState } from "react";

interface IssueGroup {
  id: string;
  label: string;
  issues: readonly string[];
}

interface IssueCheckboxesProps {
  issueGroups: readonly IssueGroup[];
  selectedIssues: string[];
  onToggle: (issue: string) => void;
  error?: string;
}

export function IssueCheckboxes({
  issueGroups,
  selectedIssues,
  onToggle,
  error,
}: IssueCheckboxesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedSummary = useMemo(() => {
    if (selectedIssues.length === 0) {
      return "Select game issues";
    }

    if (selectedIssues.length <= 2) {
      return selectedIssues.join(", ");
    }

    return `${selectedIssues.slice(0, 2).join(", ")} +${selectedIssues.length - 2} more`;
  }, [selectedIssues]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white">What broke down?</h2>
        <p className="text-sm text-slate-400">
          Pick the problems that showed up in the game. CoachLens will work back
          from those issues before suggesting drills.
        </p>
      </div>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition ${
            isOpen
              ? "border-accent/50 bg-accent/10"
              : "border-white/10 bg-surface/70 hover:border-accent/30 hover:bg-white/5"
          }`}
          aria-expanded={isOpen}
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Multi-select issues
            </p>
            <p className="text-sm text-white">{selectedSummary}</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedIssues.length > 0 ? (
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-orange-100">
                {selectedIssues.length} selected
              </span>
            ) : null}
            <span className="text-sm font-medium text-slate-300">
              {isOpen ? "Close" : "Open"}
            </span>
          </div>
        </button>

        {isOpen ? (
          <div className="absolute left-0 right-0 z-20 mt-3 rounded-[26px] border border-white/10 bg-surface p-4 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  Choose every issue that showed up in the game.
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Mix offense, defense, and effort problems in one pass.
                </p>
              </div>
              {selectedIssues.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    selectedIssues.forEach((issue) => onToggle(issue));
                  }}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                >
                  Clear all
                </button>
              ) : null}
            </div>

            <div className="max-h-[min(70vh,42rem)] space-y-4 overflow-y-auto pr-1">
              {issueGroups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-2xl border border-white/10 bg-black/10 p-5"
                >
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {group.label}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.issues.map((issue) => {
                      const checked = selectedIssues.includes(issue);

                      return (
                        <label
                          key={issue}
                          className={`flex cursor-pointer items-start gap-4 rounded-xl border px-4 py-3.5 text-sm transition ${
                            checked
                              ? "border-accent/50 bg-accent/10 text-white"
                              : "border-white/10 bg-black/10 text-slate-300 hover:border-accent/30 hover:bg-white/5"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onToggle(issue)}
                            className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-transparent text-accent focus:ring-accent"
                          />
                          <span className="leading-5">{issue}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {selectedIssues.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedIssues.map((issue) => (
            <button
              key={issue}
              type="button"
              onClick={() => onToggle(issue)}
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-orange-100 transition hover:border-accent/50 hover:bg-accent/20"
            >
              {issue} ×
            </button>
          ))}
        </div>
      ) : null}

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </section>
  );
}
