import type { DurationData, YesNoUnsure } from '../../../types/assessment';
import { SectionHeader } from '../SectionHeader';
import { Card } from '../../ui/Card';

const YES_NO_OPTIONS: { value: YesNoUnsure; label: string }[] = [
  { value: 'yes', label: 'Yes, persistent' },
  { value: 'no', label: 'No, temporary' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'prefer-not', label: 'Prefer not to answer' },
];

export function DurationStep({ duration, onChange }: { duration: DurationData; onChange: (d: DurationData) => void }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Duration"
        title="How long has this been going on?"
        description="A meaningful symptom pattern is expected to persist over time, not appear only during a temporary stressful period."
      />
      <Card className="mb-4">
        <p className="text-sm text-ink-soft mb-4">
          Have these difficulties persisted over time rather than occurring only temporarily?
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {YES_NO_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...duration, persistent: opt.value })}
              className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                duration.persistent === opt.value
                  ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                  : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <label className="block text-xs font-mono-label uppercase text-ink-faint mb-1.5" htmlFor="dur-months">
          Roughly how many months has this pattern lasted?
        </label>
        <input
          id="dur-months"
          type="number"
          min={0}
          max={1200}
          className="w-40 rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink focus:border-verdigris-400"
          value={duration.approximateMonths ?? ''}
          onChange={(e) => onChange({ ...duration, approximateMonths: e.target.value === '' ? null : Number(e.target.value) })}
        />

        <label className="block text-xs font-mono-label uppercase text-ink-faint mb-1.5 mt-5" htmlFor="dur-notes">
          Additional notes (optional)
        </label>
        <textarea
          id="dur-notes"
          rows={3}
          className="w-full rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-ink-faint/70 focus:border-verdigris-400"
          value={duration.notes ?? ''}
          onChange={(e) => onChange({ ...duration, notes: e.target.value })}
          placeholder="Anything else relevant to timing or onset"
        />
      </Card>
    </div>
  );
}
