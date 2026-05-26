"use client";

import type { ReactNode } from "react";

interface ResultsRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ResultsReveal({
  children,
  delay = 0,
  className = "",
}: ResultsRevealProps) {
  return (
    <div
      className={`results-reveal ${className}`.trim()}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
