import type { AssociatedFeatureData, YesNoUnsure } from '../../../types/assessment';
import { ASSOCIATED_FEATURES } from '../../../data/questions';
import { SectionHeader } from '../SectionHeader';
import { Card, CardEyebrow } from '../../ui/Card';

const OPTIONS: { value: YesNoUnsure; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'prefer-not', label: 'Prefer not to answer' },
];

export function AssociatedFeaturesStep({
  data,
  onChange,
}: {
  data: AssociatedFeatureData;
  onChange: (d: AssociatedFeatureData) => void;
}) {
  function update(id: string, present: YesNoUnsure) {
    onChange({ ratings: data.ratings.map((r) => (r.id === id ? { ...r, present } : r)) });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Optional"
        title="Commonly discussed associated features"
        description="These are frequently discussed alongside ADHD but are not, by themselves, standalone DSM-5-TR diagnostic criteria."
      />
      <div className="space-y-3">
        {ASSOCIATED_FEATURES.map((f) => {
          const rating = data.ratings.find((r) => r.id === f.id)!;
          return (
            <Card key={f.id}>
              <CardEyebrow>Not a standalone DSM-5-TR criterion</CardEyebrow>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{f.title}</p>
                  <p className="text-xs text-ink-faint mt-0.5">{f.description}</p>
                </div>
                <div className="flex gap-1.5 flex-wrap shrink-0">
                  {OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update(f.id, opt.value)}
                      className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                        rating.present === opt.value
                          ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                          : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
