"use client";

import { useMemo, useState } from "react";

import { CollapsibleDrillCard } from "@/components/CollapsibleDrillCard";
import { PracticePlanHero } from "@/components/PracticePlanHero";
import { ResultsReveal } from "@/components/ResultsReveal";
import type { AnalysisResponse, AnalysisSource, ConfidenceLevel } from "@/lib/types";

interface AnalysisResultsProps {
  analysis: AnalysisResponse | null;
  analysisSource: AnalysisSource | null;
  rawFallback: string | null;
  teamIdentity: string;
  selectedIssues: string[];
  onReset: () => void;
}

const confidenceClasses: Record<ConfidenceLevel, string> = {
  High: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Low: "border-slate-400/30 bg-slate-400/10 text-slate-200",
};

function formatAnalysisForClipboard(analysis: AnalysisResponse) {
  return [
    "Pivot Practice Plan",
    "",
    "Why it showed up",
    ...analysis.rootCauses.flatMap((cause, index) => [
      `${index + 1}. ${cause.cause} (${cause.confidence})`,
      `Explanation: ${cause.explanation}`,
      "",
    ]),
    "What to fix next",
    ...analysis.developmentPriorities.flatMap((priority) => [
      `${priority.rank}. ${priority.priority}`,
      `Why it matters: ${priority.whyItMatters}`,
      "",
    ]),
    "Drills for the next practice",
    ...analysis.drills.flatMap((drill, index) => [
      `${index + 1}. ${drill.name} - ${drill.timeBlock}`,
      `Purpose: ${drill.purpose}`,
      `Setup: ${drill.setup}`,
      `Coaching cue: ${drill.coachingCue}`,
      `Linked root cause: ${drill.linkedRootCause}`,
      `Linked priority: ${drill.linkedPriority}`,
      `Why it fits: ${drill.whyItFits}`,
      `Success metric: ${drill.successMetric}`,
      "",
    ]),
    "Weekly target",
    `Goal: ${analysis.weeklyTarget.goal}`,
    `Metric: ${analysis.weeklyTarget.metric}`,
    `How to track: ${analysis.weeklyTarget.howToTrack}`,
  ].join("\n");
}

export function AnalysisResults({
  analysis,
  analysisSource,
  rawFallback,
  teamIdentity,
  selectedIssues,
  onReset,
}: AnalysisResultsProps) {
  const [copyLabel, setCopyLabel] = useState("Copy plan");

  const copyText = useMemo(() => {
    if (analysis) {
      return formatAnalysisForClipboard(analysis);
    }

    return rawFallback ?? "";
  }, [analysis, rawFallback]);

  async function handleCopy() {
    if (!copyText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(copyText);
      setCopyLabel("Plan copied");
      window.setTimeout(() => setCopyLabel("Copy plan"), 1800);
    } catch {
      setCopyLabel("Copy failed");
      window.setTimeout(() => setCopyLabel("Copy plan"), 1800);
    }
  }

  const topPriority = analysis?.developmentPriorities[0];
  const remainingPriorities = analysis?.developmentPriorities.slice(1) ?? [];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Your practice plan
            </h2>
            {analysisSource === "ai" ? (
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                AI-generated
              </span>
            ) : analysisSource === "rules" ? (
              <span className="rounded-full border border-slate-400/30 bg-slate-400/10 px-3 py-1 text-xs font-semibold text-slate-300">
                Offline fallback
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Clear priorities and drills for the next session.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
          >
            New game
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!copyText}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-accent/40 hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copyLabel}
          </button>
        </div>
      </div>

      {analysis ? (
        <div className="grid gap-5">
          <ResultsReveal delay={0}>
            <PracticePlanHero
              analysis={analysis}
              teamIdentity={teamIdentity}
              selectedIssues={selectedIssues}
            />
          </ResultsReveal>

          <ResultsReveal delay={120}>
            <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Why it showed up</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Confidence reflects how closely your selected game issues and
                    notes matched each cause.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {analysis.rootCauses.map((cause) => (
                  <article
                    key={`${cause.cause}-${cause.confidence}`}
                    className="rounded-2xl border border-white/10 bg-black/10 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-base font-semibold text-white">
                        {cause.cause}
                      </h4>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${confidenceClasses[cause.confidence]}`}
                      >
                        {cause.confidence}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {cause.explanation}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </ResultsReveal>

          <ResultsReveal delay={240}>
            <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
              <h3 className="text-xl font-semibold text-white">What to fix next</h3>
              <p className="mt-2 text-sm text-slate-400">
                Start with the first priority, then layer in the next two.
              </p>

              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
                {topPriority ? (
                  <article className="rounded-3xl border border-accent/30 bg-accent/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      Priority 1
                    </p>
                    <h4 className="mt-3 text-2xl font-semibold text-white">
                      {topPriority.priority}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-100">
                      {topPriority.whyItMatters}
                    </p>
                  </article>
                ) : null}

                {remainingPriorities.length > 0 ? (
                  <div className="grid gap-4">
                    {remainingPriorities.map((priority) => (
                      <article
                        key={`${priority.rank}-${priority.priority}`}
                        className="rounded-2xl border border-white/10 bg-black/10 p-4"
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          Priority {priority.rank}
                        </span>
                        <h4 className="mt-2 text-base font-semibold text-white">
                          {priority.priority}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {priority.whyItMatters}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </ResultsReveal>

          <ResultsReveal delay={360}>
            <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
              <h3 className="text-xl font-semibold text-white">Drills for the next practice</h3>
              <p className="mt-2 text-sm text-slate-400">
                Open each drill for the setup and success metric. The coaching cue
                stays visible so you can scan the plan fast.
              </p>

              <div className="mt-4 grid gap-4">
                {analysis.drills.map((drill, index) => (
                  <CollapsibleDrillCard
                    key={`${drill.name}-${drill.timeBlock}`}
                    drill={drill}
                    defaultOpen={index === 0}
                  />
                ))}
              </div>
            </div>
          </ResultsReveal>
        </div>
      ) : null}

      {!analysis && rawFallback ? (
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <h3 className="text-lg font-semibold text-white">Unstructured response</h3>
          <p className="mt-2 text-sm text-slate-400">
            Pivot could not shape this response into the normal practice-plan
            format, so the raw response is shown below.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-4 text-sm whitespace-pre-wrap text-slate-200">
            {rawFallback}
          </pre>
        </div>
      ) : null}
    </section>
  );
}
