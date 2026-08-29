import type { ExecutiveFunctionData } from '../../../types/assessment';
import { EXECUTIVE_FUNCTION_DOMAINS } from '../../../data/questions';
import { SectionHeader } from '../SectionHeader';
import { RatingScale } from '../RatingScale';
import { Card } from '../../ui/Card';

const FREQ_LABELS: Record<number, string> = { 0: 'No difficulty', 1: 'Slight', 2: 'Moderate', 3: 'Marked', 4: 'Severe' };

export function ExecutiveFunctionStep({
  data,
  onChange,
}: {
  data: ExecutiveFunctionData;
  onChange: (d: ExecutiveFunctionData) => void;
}) {
  function update(domain: string, rating: number) {
    onChange({ ratings: data.ratings.map((r) => (r.domain === domain ? { ...r, rating: rating as any } : r)) });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Optional profile"
        title="Executive function"
        description="Executive-function difficulties may be relevant to understanding someone's functioning but are not by themselves sufficient to diagnose ADHD. This section is optional and application-generated."
      />
      <div className="space-y-4">
        {EXECUTIVE_FUNCTION_DOMAINS.map((d) => {
          const rating = data.ratings.find((r) => r.domain === d.id)!;
          return (
            <Card key={d.id}>
              <p className="text-sm font-medium text-ink mb-3">{d.label}</p>
              <RatingScale name={d.label} value={rating.rating} onChange={(v) => update(d.id, v)} labels={FREQ_LABELS} compact />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
