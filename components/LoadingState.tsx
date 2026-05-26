import { useEffect, useMemo, useState } from "react";

interface LoadingStateProps {
  teamIdentity: string;
  selectedIssues: string[];
}

export function LoadingState({
  teamIdentity,
  selectedIssues,
}: LoadingStateProps) {
  const messages = useMemo(() => {
    const leadIssue = selectedIssues[0]?.toLowerCase();

    return [
      leadIssue
        ? `Reviewing how ${leadIssue} showed up in the game.`
        : "Reviewing what broke down in the game.",
      "Diagnosing the root cause behind those possessions.",
      teamIdentity
        ? `Matching drills that fit a ${teamIdentity.toLowerCase()} team.`
        : "Matching drills that fit your team.",
      "Setting one weekly target you can track in the next game.",
    ];
  }, [selectedIssues, teamIdentity]);

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 950);

    return () => window.clearInterval(timer);
  }, [messages]);

  return (
    <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
        <div className="space-y-1">
          <p className="text-base font-semibold text-white">
            Building your practice plan
          </p>
          <p className="text-sm text-slate-400 transition">{messages[messageIndex]}</p>
        </div>
      </div>
    </div>
  );
}
