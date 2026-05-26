"use client";

interface DemoPresetButtonProps {
  onClick: () => void;
}

export function DemoPresetButton({ onClick }: DemoPresetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/50 hover:bg-accent/20 hover:text-orange-100"
    >
      Load demo game
    </button>
  );
}
