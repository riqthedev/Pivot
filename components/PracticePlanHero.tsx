"use client";

import type { AnalysisResponse } from "@/lib/types";

interface PracticePlanHeroProps {
  analysis: AnalysisResponse;
  teamIdentity: string;
  selectedIssues: string[];
}

export function PracticePlanHero({
  analysis,
  teamIdentity,
  selectedIssues,
}: PracticePlanHeroProps) {
  const topPriority = analysis.developmentPriorities[0];

  return (
    <section className="overflow-hidden rounded-[28px] border border-accent/30 bg-linear-to-br from-accent/20 via-accent/10 to-surface/90 p-6 shadow-glow">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-accent/30 bg-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-100">
            Your practice plan
          </span>
          {teamIdentity ? (
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100">
              {teamIdentity}
            </span>
          ) : null}
          {selectedIssues.slice(0, 3).map((issue) => (
            <span
              key={issue}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {issue}
            </span>
          ))}
          {selectedIssues.length > 3 ? (
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
              +{selectedIssues.length - 3} more
            </span>
          ) : null}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
          <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100">
              Weekly target
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {analysis.weeklyTarget.goal}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              {analysis.weeklyTarget.metric}
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                How to track it
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {analysis.weeklyTarget.howToTrack}
              </p>
            </div>
          </div>

          {topPriority ? (
            <aside className="rounded-3xl border border-white/10 bg-surface/85 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Priority #1
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {topPriority.priority}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {topPriority.whyItMatters}
              </p>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
