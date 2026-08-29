import { STUDENT_MODE_TOPICS } from '../../data/educationalContent';
import { Card, CardEyebrow } from '../ui/Card';

export function CriterionExplanation() {
  return (
    <Card className="border-verdigris-200 bg-verdigris-50/40">
      <CardEyebrow>Student Mode \u2014 reasoning behind each criterion</CardEyebrow>
      <div className="space-y-5 mt-2">
        {STUDENT_MODE_TOPICS.map((t) => (
          <div key={t.id}>
            <p className="text-sm font-medium text-ink mb-1">{t.question}</p>
            <p className="text-sm text-ink-soft leading-relaxed">{t.answer}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
