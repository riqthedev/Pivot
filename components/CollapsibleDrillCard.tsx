"use client";

import { useState } from "react";

import type { DrillRecommendation } from "@/lib/types";

interface CollapsibleDrillCardProps {
  drill: DrillRecommendation;
  defaultOpen?: boolean;
}

export function CollapsibleDrillCard({
  drill,
  defaultOpen = false,
}: CollapsibleDrillCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <article className="rounded-3xl border border-white/10 bg-surface/80 p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-semibold text-white">{drill.name}</h4>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              {drill.timeBlock}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-200">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
              Root cause: {drill.linkedRootCause}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Priority: {drill.linkedPriority}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-accent/30 hover:bg-accent/10"
          aria-expanded={isOpen}
        >
          {isOpen ? "Hide details" : "Show details"}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Coaching cue
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-100">{drill.coachingCue}</p>
      </div>

      {isOpen ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Purpose
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{drill.purpose}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Success metric
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {drill.successMetric}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Setup
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{drill.setup}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Why this fits
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{drill.whyItFits}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
