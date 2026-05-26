import { useState } from "react";

interface CoachNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export function CoachNotes({ value, onChange }: CoachNotesProps) {
  const [expanded, setExpanded] = useState(false);
  const isExpanded = expanded || Boolean(value);

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => {
          if (!value) {
            setExpanded((current) => !current);
          }
        }}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-surface/70 px-4 py-4 text-left transition hover:border-accent/30 hover:bg-white/5"
        aria-expanded={isExpanded}
      >
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">Bench notes (optional)</h2>
          <p className="text-sm text-slate-400">
            Add quick context from the bench, locker room, or film notes only if it
            sharpens the diagnosis.
          </p>
        </div>
        <span className="text-sm font-medium text-slate-300">
          {value ? "Notes added" : isExpanded ? "Hide" : "Add notes"}
        </span>
      </button>

      {isExpanded ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
          placeholder="Players stopped sprinting back. Too many lazy passes. Team looked tired in the second half."
          className="w-full rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
        />
      ) : null}
    </section>
  );
}
