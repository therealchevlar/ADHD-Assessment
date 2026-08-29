import type { ImpairmentData, ImpairmentArea } from '../../../types/assessment';
import { IMPAIRMENT_AREA_LABELS, IMPAIRMENT_AREA_ORDER } from '../../../data/questions';
import { IMPACT_LABELS } from '../../../types/symptoms';
import { SectionHeader } from '../SectionHeader';
import { RatingScale } from '../RatingScale';
import { Card } from '../../ui/Card';

export function ImpairmentStep({ impairment, onChange }: { impairment: ImpairmentData; onChange: (i: ImpairmentData) => void }) {
  function update(area: ImpairmentArea, rating: number) {
    onChange({
      ratings: impairment.ratings.map((r) => (r.area === area ? { ...r, rating: rating as any } : r)),
    });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Functional impact"
        title="How much does this get in the way?"
        description="This is a separate dimension from how often symptoms occur. Frequent symptoms with little real-world impact are treated differently from symptoms that meaningfully disrupt daily life."
      />
      <div className="space-y-4">
        {IMPAIRMENT_AREA_ORDER.map((area) => {
          const rating = impairment.ratings.find((r) => r.area === area)!;
          return (
            <Card key={area}>
              <p className="text-sm font-medium text-ink mb-3">{IMPAIRMENT_AREA_LABELS[area]}</p>
              <RatingScale
                name={IMPAIRMENT_AREA_LABELS[area]}
                value={rating.rating}
                onChange={(v) => update(area, v)}
                labels={IMPACT_LABELS}
                compact
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
