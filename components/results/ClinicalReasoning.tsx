import type { DiagnosticReasoningResult } from '../../types/results';
import { Card, CardEyebrow } from '../ui/Card';
import { Badge, statusToTone } from '../ui/Badge';

const PRESENTATION_LABELS: Record<string, string> = {
  combined: 'Combined presentation',
  'predominantly-inattentive': 'Predominantly inattentive presentation',
  'predominantly-hyperactive-impulsive': 'Predominantly hyperactive/impulsive presentation',
  'threshold-not-established': 'Threshold not established',
  'insufficient-information': 'Insufficient information',
};

const SEVERITY_LABELS: Record<string, string> = {
  mild: 'Mild',
  moderate: 'Moderate',
  severe: 'Severe',
  'not-applicable': 'Not applicable',
};

const SIGNAL_LABELS: Record<string, string> = {
  'strongly-supported': 'Strongly supported',
  'partially-supported': 'Partially supported',
  unclear: 'Unclear',
  'not-supported': 'Not supported',
};

export function ClinicalReasoning({ result }: { result: DiagnosticReasoningResult }) {
  return (
    <Card>
      <CardEyebrow>Why this result?</CardEyebrow>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge tone={statusToTone(result.overallSignal)}>{SIGNAL_LABELS[result.overallSignal]}</Badge>
        <span className="text-ink-faint">&middot;</span>
        <span className="text-sm text-ink-soft">{PRESENTATION_LABELS[result.presentation]}</span>
        {result.severity !== 'not-applicable' && (
          <>
            <span className="text-ink-faint">&middot;</span>
            <span className="text-sm text-ink-soft">Severity (educational interpretation): {SEVERITY_LABELS[result.severity]}</span>
          </>
        )}
      </div>
      <p className="text-sm text-ink leading-relaxed mb-5">{result.narrative}</p>

      <div className="rule pt-4 mb-4">
        <p className="text-xs font-mono-label uppercase text-ink-faint mb-2">Suggested next steps</p>
        <ul className="space-y-1.5">
          {result.nextSteps.map((step, i) => (
            <li key={i} className="text-sm text-ink-soft flex gap-2">
              <span className="text-verdigris-500 mt-0.5">&bull;</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rule pt-4">
        <p className="text-xs font-mono-label uppercase text-ink-faint mb-2">Limitations of this simulation</p>
        <ul className="space-y-1.5">
          {result.limitations.map((l, i) => (
            <li key={i} className="text-xs text-ink-faint flex gap-2">
              <span className="mt-0.5">&bull;</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
