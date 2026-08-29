interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export function ProgressBar({ currentStep, totalSteps, stepLabel }: ProgressBarProps) {
  const pct = Math.round(((currentStep + 1) / totalSteps) * 100);
  return (
    <div className="mb-8" role="group" aria-label="Assessment progress">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono-label text-[11px] uppercase text-verdigris-600">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="font-mono-label text-[11px] uppercase text-ink-faint">{pct}%</span>
      </div>
      <div
        className="h-1.5 w-full rounded-full bg-ink/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${stepLabel}, ${pct} percent complete`}
      >
        <div className="h-full bg-verdigris-500 transition-all duration-300 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <h1 className="font-display text-2xl sm:text-3xl text-ink mt-4">{stepLabel}</h1>
    </div>
  );
}
