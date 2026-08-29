import type { AssessmentState } from '../../types/assessment';
import type { DiagnosticReasoningResult } from '../../types/results';
import { SymptomChart } from './SymptomChart';
import { ImpairmentChart } from './ImpairmentChart';
import { ExecutiveFunctionChart } from './ExecutiveFunctionChart';
import { EvidenceMatrix } from './EvidenceMatrix';
import { ClinicalReasoning } from './ClinicalReasoning';
import { Card, CardEyebrow } from '../ui/Card';
import { CriterionExplanation } from '../education/CriterionExplanation';
import { domainFrequencyScore } from '../../engine/scoring';

export function ResultsDashboard({ state, result }: { state: AssessmentState; result: DiagnosticReasoningResult }) {
  const iaRaw = domainFrequencyScore(state.inattention);
  const hiRaw = domainFrequencyScore(state.hyperactivityImpulsivity);

  return (
    <div className="space-y-6">
      <Card className="bg-amber-100/50 border-amber-300">
        <p className="text-sm text-ink font-medium">
          This is an educational assessment profile, not a medical diagnosis.
        </p>
      </Card>

      <ClinicalReasoning result={result} />

      <div className="grid md:grid-cols-2 gap-6">
        <SymptomChart
          inattentionCount={result.criterionA.inattentionCount}
          hyperactivityCount={result.criterionA.hyperactivityCount}
          threshold={result.criterionA.inattentionThreshold}
        />
        <ImpairmentChart impairment={state.impairment} />
      </div>

      <Card>
        <CardEyebrow>Application-generated descriptive scores</CardEyebrow>
        <h3 className="font-display text-lg text-ink mb-1">Raw frequency scores</h3>
        <p className="text-xs text-ink-faint mb-4">
          Not a DSM-5-TR diagnostic score. Sum of 0\u20134 ratings across 9 items per domain (range 0\u201336).
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded border border-ink/10 p-4 bg-white/50">
            <p className="text-xs font-mono-label uppercase text-ink-faint mb-1">Inattention</p>
            <p className="font-display text-3xl text-verdigris-700">{iaRaw} <span className="text-base text-ink-faint">/ 36</span></p>
          </div>
          <div className="rounded border border-ink/10 p-4 bg-white/50">
            <p className="text-xs font-mono-label uppercase text-ink-faint mb-1">Hyperactivity / Impulsivity</p>
            <p className="font-display text-3xl text-clay-600">{hiRaw} <span className="text-base text-ink-faint">/ 36</span></p>
          </div>
        </div>
      </Card>

      <EvidenceMatrix result={result} />

      <ExecutiveFunctionChart data={state.executiveFunction} />

      {state.differential.categories.some((c) => Object.values(c.itemResponses).includes('yes')) && (
        <Card>
          <CardEyebrow>Differential considerations flagged</CardEyebrow>
          <h3 className="font-display text-lg text-ink mb-2">Factors worth discussing with a professional</h3>
          <div className="flex flex-wrap gap-2">
            {result.criterionE.flaggedFactors.map((f) => (
              <span key={f} className="px-3 py-1 rounded-sm text-xs bg-clay-100 text-clay-600 font-mono-label uppercase">
                {f}
              </span>
            ))}
          </div>
        </Card>
      )}

      {state.collateral && (
        <Card>
          <CardEyebrow>Collateral / observer report on file</CardEyebrow>
          <p className="text-sm text-ink-soft">
            An observer report was included. Differences between self-report and observer report are not treated as
            errors \u2014 they may provide useful information for further clinical assessment.
          </p>
        </Card>
      )}

      {state.studentMode && <CriterionExplanation />}
    </div>
  );
}
