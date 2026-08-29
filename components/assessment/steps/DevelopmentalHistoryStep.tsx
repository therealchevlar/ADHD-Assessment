import type { DevelopmentalHistory, YesNoUnsure } from '../../../types/assessment';
import { SectionHeader } from '../SectionHeader';
import { Card } from '../../ui/Card';

const OPTIONS: { value: YesNoUnsure; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'prefer-not', label: 'Prefer not to answer' },
];

export function DevelopmentalHistoryStep({
  history,
  onChange,
}: {
  history: DevelopmentalHistory;
  onChange: (h: DevelopmentalHistory) => void;
}) {
  function updateItem(id: string, response: YesNoUnsure) {
    onChange({ ...history, items: history.items.map((i) => (i.id === id ? { ...i, response } : i)) });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Childhood history"
        title="Before age 12"
        description="A childhood-onset pattern is one factor clinicians look for. If you're unsure, that's a completely normal and valid answer — childhood recall is often imperfect."
      />
      <div className="space-y-3">
        {history.items.map((item) => (
          <Card key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-ink flex-1">{item.label}</p>
            <div className="flex gap-1.5 flex-wrap">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateItem(item.id, opt.value)}
                  className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                    item.response === opt.value
                      ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                      : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-ink mb-2">Do you have access to old school reports or records?</p>
            <div className="flex gap-1.5 flex-wrap">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ ...history, hasSchoolRecords: opt.value })}
                  className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                    history.hasSchoolRecords === opt.value
                      ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                      : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-ink mb-2">Could a parent, sibling, or old teacher speak to your childhood behavior?</p>
            <div className="flex gap-1.5 flex-wrap">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ ...history, hasCollateralChildhoodInformant: opt.value })}
                  className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                    history.hasCollateralChildhoodInformant === opt.value
                      ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                      : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
