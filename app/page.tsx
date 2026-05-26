"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { AnalysisResults } from "@/components/AnalysisResults";
import { AnalyzeButton } from "@/components/AnalyzeButton";
import { CoachNotes } from "@/components/CoachNotes";
import { DemoPresetButton } from "@/components/DemoPresetButton";
import { EmptyResultsPlaceholder } from "@/components/EmptyResultsPlaceholder";
import { ErrorState } from "@/components/ErrorState";
import { Header } from "@/components/Header";
import { InputSummaryBar } from "@/components/InputSummaryBar";
import { LoadingState } from "@/components/LoadingState";
import { IssueCheckboxes } from "@/components/IssueCheckboxes";
import { TeamIdentitySelect } from "@/components/TeamIdentitySelect";
import { ISSUE_GROUPS, TEAM_IDENTITIES } from "@/lib/constants";
import type {
  AnalysisApiResponse,
  AnalysisResponse,
  AnalysisSource,
} from "@/lib/types";
import { validateAnalysisInput } from "@/lib/validation";

const DEMO_PRESET = {
  teamIdentity: "Transition Focused",
  issues: ["Gave up fastbreak points", "Too many turnovers", "Fatigue"],
  notes:
    "Players stopped sprinting back. Too many lazy passes. Team looked tired in the second half.",
} as const;

export default function Home() {
  const [teamIdentity, setTeamIdentity] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [analysisSource, setAnalysisSource] = useState<AnalysisSource | null>(
    null,
  );
  const [rawFallback, setRawFallback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLElement | null>(null);

  const validationErrors = useMemo(
    () => validateAnalysisInput({ teamIdentity, issues: selectedIssues, notes }),
    [notes, selectedIssues, teamIdentity],
  );

  const isSubmitDisabled = Boolean(
    validationErrors.teamIdentity || validationErrors.issues,
  );
  const hasInputs = Boolean(teamIdentity || selectedIssues.length || notes);
  const hasPlanPanel = Boolean(loading || error || analysis || rawFallback);
  const shouldScrollResults = Boolean(loading || analysis || rawFallback);

  useEffect(() => {
    if (!shouldScrollResults || !resultsRef.current) {
      return;
    }

    resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [analysis, loading, rawFallback, shouldScrollResults]);

  function handleToggleIssue(issue: string) {
    setSelectedIssues((current) =>
      current.includes(issue)
        ? current.filter((item) => item !== issue)
        : [...current, issue],
    );
  }

  function handleLoadDemo() {
    setTeamIdentity(DEMO_PRESET.teamIdentity);
    setSelectedIssues([...DEMO_PRESET.issues]);
    setNotes(DEMO_PRESET.notes);
    setError(null);
    setAnalysis(null);
    setAnalysisSource(null);
    setRawFallback(null);
  }

  function handleReset() {
    setTeamIdentity("");
    setSelectedIssues([]);
    setNotes("");
    setAnalysis(null);
    setAnalysisSource(null);
    setRawFallback(null);
    setError(null);
    setLoading(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitDisabled) {
      setError(validationErrors.teamIdentity ?? validationErrors.issues ?? null);
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);
    setAnalysisSource(null);
    setRawFallback(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamIdentity,
          issues: selectedIssues,
          notes,
        }),
      });

      const payload = (await response.json()) as AnalysisApiResponse;

      if (payload.success) {
        setAnalysis(payload.data);
        setAnalysisSource(payload.source);
        return;
      }

      setRawFallback(payload.raw ?? null);
      setError(payload.raw ? payload.error ?? null : payload.error ?? "Analysis failed.");
    } catch {
      setError("Something went wrong while building the practice plan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <Header />

      <section className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">
            Start with what broke down.
          </p>
          <p className="text-sm text-slate-400">
            Pick the game issues first, then CoachLens will turn them into a plan
            coaches can actually run tomorrow.
          </p>
        </div>
        <DemoPresetButton onClick={handleLoadDemo} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.2fr)] xl:items-start">
        <form
          onSubmit={handleSubmit}
          className={`rounded-[28px] border border-white/10 bg-surface/85 p-5 shadow-2xl shadow-black/20 transition sm:p-6 lg:p-8 ${
            hasPlanPanel ? "xl:sticky xl:top-6" : ""
          }`}
        >
          <div className="grid gap-6">
            <IssueCheckboxes
              issueGroups={ISSUE_GROUPS}
              selectedIssues={selectedIssues}
              onToggle={handleToggleIssue}
              error={validationErrors.issues}
            />

            <CoachNotes value={notes} onChange={setNotes} />

            <TeamIdentitySelect
              options={TEAM_IDENTITIES}
              value={teamIdentity}
              onChange={setTeamIdentity}
              error={validationErrors.teamIdentity}
            />

            <InputSummaryBar
              teamIdentity={teamIdentity}
              selectedIssues={selectedIssues}
            />

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
              <p className="text-sm text-slate-400">
                We&apos;ll diagnose the cause first, then pick drills that fit.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-400">
                  {selectedIssues.length > 0
                    ? `${selectedIssues.length} issue${
                        selectedIssues.length === 1 ? "" : "s"
                      } selected`
                    : "Select at least one game issue to continue."}
                </div>
                <div className="flex flex-wrap gap-3">
                  {hasInputs || hasPlanPanel ? (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                    >
                      New game
                    </button>
                  ) : null}
                  <AnalyzeButton disabled={isSubmitDisabled} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <section ref={resultsRef} aria-live="polite" className="space-y-4">
          {error ? <ErrorState message={error} /> : null}

          {loading ? (
            <LoadingState
              teamIdentity={teamIdentity}
              selectedIssues={selectedIssues}
            />
          ) : null}

          {analysis || rawFallback ? (
            <AnalysisResults
              analysis={analysis}
              analysisSource={analysisSource}
              rawFallback={rawFallback}
              teamIdentity={teamIdentity}
              selectedIssues={selectedIssues}
              onReset={handleReset}
            />
          ) : null}

          {!loading && !analysis && !rawFallback ? (
            <EmptyResultsPlaceholder onLoadDemo={handleLoadDemo} />
          ) : null}
        </section>
      </section>
    </main>
  );
}
