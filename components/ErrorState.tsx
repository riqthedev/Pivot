interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose-300">
        Practice plan error
      </p>
      <p className="mt-2 text-sm leading-6 text-rose-100">{message}</p>
    </div>
  );
}
