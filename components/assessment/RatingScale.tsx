interface RatingScaleProps {
  name: string;
  value: number | null;
  onChange: (value: number) => void;
  labels: Record<number, string>;
  compact?: boolean;
}

export function RatingScale({ name, value, onChange, labels, compact = false }: RatingScaleProps) {
  const options = Object.entries(labels).map(([k, v]) => ({ value: Number(k), label: v }));
  return (
    <div role="radiogroup" aria-label={name} className={`grid grid-cols-5 gap-1.5 ${compact ? '' : 'sm:gap-2'}`}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center justify-center rounded border px-1.5 transition-colors text-center ${
              compact ? 'py-2' : 'py-3'
            } ${
              selected
                ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                : 'bg-white/50 border-ink/15 text-ink-soft hover:border-verdigris-400 hover:bg-verdigris-50'
            }`}
          >
            <span className="font-mono-label text-sm font-semibold">{opt.value}</span>
            <span className={`text-[10px] leading-tight mt-0.5 ${compact ? 'hidden sm:block' : ''}`}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
