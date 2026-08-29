import type { DifferentialData, YesNoUnsure } from '../../../types/assessment';
import { DIFFERENTIAL_CATEGORIES } from '../../../data/questions';
import { SectionHeader } from '../SectionHeader';
import { Card, CardEyebrow } from '../../ui/Card';

const OPTIONS: { value: YesNoUnsure; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'prefer-not', label: 'Prefer not to answer' },
];

export function DifferentialStep({ data, onChange }: { data: DifferentialData; onChange: (d: DifferentialData) => void }) {
  function updateItem(categoryId: string, itemId: string, value: YesNoUnsure) {
    onChange({
      ...data,
      categories: data.categories.map((c) =>
        c.categoryId === categoryId ? { ...c, itemResponses: { ...c.itemResponses, [itemId]: value } } : c
      ),
    });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Differential considerations"
        title="Other factors that can look similar"
        description="These factors can overlap with ADHD symptoms and may warrant consideration during professional assessment. This section never diagnoses these conditions — it only notes what a clinician might want to explore."
      />
      <div className="space-y-5">
        {DIFFERENTIAL_CATEGORIES.map((cat) => {
          const catResponse = data.categories.find((c) => c.categoryId === cat.id)!;
          return (
            <Card key={cat.id}>
              <CardEyebrow>{cat.title}</CardEyebrow>
              <p className="text-sm text-ink-soft mb-4">{cat.blurb}</p>
              <div className="space-y-2.5">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-sm text-ink flex-1">{item.label}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateItem(cat.id, item.id, opt.value)}
                          className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                            catResponse.itemResponses[item.id] === opt.value
                              ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                              : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}

        <Card>
          <label className="block text-xs font-mono-label uppercase text-ink-faint mb-1.5" htmlFor="diff-notes">
            Anything else you'd like to note? (optional)
          </label>
          <textarea
            id="diff-notes"
            rows={3}
            className="w-full rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-ink-faint/70 focus:border-verdigris-400"
            value={data.additionalConcerns ?? ''}
            onChange={(e) => onChange({ ...data, additionalConcerns: e.target.value })}
            placeholder="This field is not scored."
          />
        </Card>
      </div>
    </div>
  );
}
