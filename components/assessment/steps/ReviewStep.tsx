import type { AssessmentState } from '../../../types/assessment';
import { SectionHeader } from '../SectionHeader';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { runConsistencyChecks } from '../../../engine/consistency';

const SELF_HARM_PATTERN = /\b(suicid|kill myself|end my life|self[- ]?harm|hurt myself)\b/i;

export function ReviewStep({ state }: { state: AssessmentState }) {
  const flags = runConsistencyChecks(state);
  const safetyConcern = SELF_HARM_PATTERN.test(state.differential.additionalConcerns ?? '');

  return (
    <div>
      <SectionHeader
        eyebrow="Final check"
        title="Review before finishing"
        description="Take a moment to review the notes below before generating your results."
      />

      {safetyConcern && (
        <Card className="mb-4 border-clay-400 bg-clay-100/40">
          <p className="text-sm text-ink font-medium mb-2">A note on what you entered</p>
          <p className="text-sm text-ink-soft leading-relaxed">
            Something you wrote may relate to thoughts of self-harm. This simulator cannot provide crisis support. If
            you are in the U.S., you can call or text 988 (Suicide & Crisis Lifeline) anytime. If you are elsewhere,
            please contact your local emergency number or a crisis line in your country. Your wellbeing matters more
            than finishing this assessment.
          </p>
        </Card>
      )}

      {flags.length === 0 ? (
        <Card>
          <p className="text-sm text-ink-soft">No response-quality concerns were detected. You're ready to view your results.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {flags.map((f) => (
            <Card key={f.id} className="flex items-start gap-3">
              <Badge tone={f.severity === 'caution' ? 'caution' : 'info'}>
                {f.severity === 'caution' ? 'Clarification recommended' : 'Note'}
              </Badge>
              <p className="text-sm text-ink-soft flex-1">{f.message}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
