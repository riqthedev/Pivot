interface AnalyzeButtonProps {
  disabled: boolean;
  loading: boolean;
}

export function AnalyzeButton({ disabled, loading }: AnalyzeButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-accent/40 disabled:text-white/70"
    >
      {loading ? "Building practice plan..." : "Build Practice Plan"}
    </button>
  );
}
