import type { ReactNode } from 'react';

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow && <div className="font-mono-label text-[11px] uppercase text-verdigris-600 mb-1">{eyebrow}</div>}
      <h2 className="font-display text-xl text-ink mb-1.5">{title}</h2>
      {description && <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">{description}</p>}
    </div>
  );
}
