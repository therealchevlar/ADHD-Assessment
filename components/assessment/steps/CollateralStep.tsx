import type { CollateralReport, Informant } from '../../../types/symptoms';
import { INATTENTION_SYMPTOMS, HYPERACTIVITY_IMPULSIVITY_SYMPTOMS } from '../../../data/symptoms';
import { FREQUENCY_LABELS } from '../../../types/symptoms';
import { SectionHeader } from '../SectionHeader';
import { RatingScale } from '../RatingScale';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

const INFORMANT_OPTIONS: { value: Informant; label: string }[] = [
  { value: 'parent', label: 'Parent' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'partner', label: 'Partner' },
  { value: 'friend', label: 'Friend' },
  { value: 'employer', label: 'Employer' },
  { value: 'other', label: 'Other' },
];

// A representative subset of items, to keep the optional observer form light.
const SAMPLE_ITEMS = [...INATTENTION_SYMPTOMS.slice(0, 3), ...HYPERACTIVITY_IMPULSIVITY_SYMPTOMS.slice(0, 3)];

export function CollateralStep({
  collateral,
  onChange,
}: {
  collateral: CollateralReport | null;
  onChange: (c: CollateralReport | null) => void;
}) {
  if (!collateral) {
    return (
      <div>
        <SectionHeader
          eyebrow="Optional"
          title="Collateral / observer report"
          description="Input from someone who knows the person well — a parent, teacher, partner, friend, or employer — can add a useful outside perspective. This step is entirely optional."
        />
        <Card className="text-center py-10">
          <p className="text-sm text-ink-soft mb-5">No observer report added yet.</p>
          <Button
            onClick={() =>
              onChange({
                informant: 'parent',
                responses: SAMPLE_ITEMS.map((s) => ({ symptomId: s.id, frequency: null, impact: null })),
              })
            }
          >
            Add an observer report
          </Button>
        </Card>
      </div>
    );
  }

  function updateResponse(symptomId: string, frequency: number) {
    if (!collateral) return;
    onChange({
      ...collateral,
      responses: collateral.responses.map((r) => (r.symptomId === symptomId ? { ...r, frequency: frequency as any } : r)),
    });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Optional"
        title="Collateral / observer report"
        description="Rate these representative items from the observer's point of view. Differences from self-report are not treated as errors — they can provide useful information for further clinical assessment."
      />
      <Card className="mb-4">
        <label className="block text-xs font-mono-label uppercase text-ink-faint mb-2">Who is this observer?</label>
        <div className="flex flex-wrap gap-2">
          {INFORMANT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...collateral, informant: opt.value })}
              className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                collateral.informant === opt.value
                  ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                  : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        {SAMPLE_ITEMS.map((s) => {
          const response = collateral.responses.find((r) => r.symptomId === s.id)!;
          return (
            <Card key={s.id}>
              <p className="text-sm font-medium text-ink mb-3">{s.title}</p>
              <RatingScale
                name={`Observer rating for ${s.title}`}
                value={response.frequency}
                onChange={(v) => updateResponse(s.id, v)}
                labels={FREQUENCY_LABELS}
                compact
              />
            </Card>
          );
        })}
      </div>

      <Button variant="ghost" className="mt-4" onClick={() => onChange(null)}>
        Remove observer report
      </Button>
    </div>
  );
}
