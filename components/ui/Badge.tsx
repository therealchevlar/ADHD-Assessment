import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'positive' | 'caution' | 'negative' | 'info';

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-ink/8 text-ink-soft',
  positive: 'bg-verdigris-100 text-verdigris-700',
  caution: 'bg-amber-100 text-amber-700',
  negative: 'bg-clay-100 text-clay-600',
  info: 'bg-verdigris-50 text-verdigris-600',
};

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-mono-label uppercase ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
}

export function statusToTone(status: string): BadgeTone {
  switch (status) {
    case 'met':
    case 'supported':
    case 'strongly-supported':
      return 'positive';
    case 'not-met':
    case 'not-supported':
      return 'negative';
    case 'unclear':
    case 'partially-supported':
      return 'caution';
    default:
      return 'neutral';
  }
}
