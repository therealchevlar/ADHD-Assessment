import type { DiagnosticReasoningResult } from '../../types/results';
import { Card, CardEyebrow } from '../ui/Card';
import { Badge, statusToTone } from '../ui/Badge';

function labelFor(status: string): string {
  const map: Record<string, string> = {
    met: 'Met',
    'not-met': 'Not met',
    unclear: 'Unclear',
    supported: 'Supported',
    'not-supported': 'Not supported',
  };
  return map[status] ?? status;
}

export function EvidenceMatrix({ result }: { result: DiagnosticReasoningResult }) {
  const rows = [
    { label: 'Criterion A \u2014 Symptom threshold', status: result.criterionA.status, detail: result.criterionA.detail },
    { label: 'Criterion B \u2014 Developmental onset', status: result.criterionB.status, detail: result.criterionB.detail },
    { label: 'Criterion C \u2014 Multiple settings', status: result.criterionC.status, detail: result.criterionC.detail },
    { label: 'Criterion D \u2014 Functional impairment', status: result.criterionD.status, detail: result.criterionD.detail },
    { label: 'Criterion E \u2014 Differential considerations', status: result.criterionE.status, detail: result.criterionE.detail },
  ];

  return (
    <Card>
      <CardEyebrow>Criterion-by-criterion</CardEyebrow>
      <h3 className="font-display text-lg text-ink mb-4">Evidence matrix</h3>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="rule pt-3 first:pt-0 first:border-t-0">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span className="text-sm font-medium text-ink">{row.label}</span>
              <Badge tone={statusToTone(row.status)}>{labelFor(row.status)}</Badge>
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">{row.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
