import { useState } from 'react';
import type { SymptomDefinition } from '../../types/symptoms';
import type { SymptomResponse } from '../../types/symptoms';
import { FREQUENCY_LABELS, IMPACT_LABELS } from '../../types/symptoms';
import { QuestionCard } from './QuestionCard';
import { RatingScale } from './RatingScale';
import { Tooltip } from '../ui/Tooltip';

interface SymptomQuestionProps {
  symptom: SymptomDefinition;
  response: SymptomResponse;
  onChange: (response: SymptomResponse) => void;
}

export function SymptomQuestion({ symptom, response, onChange }: SymptomQuestionProps) {
  const [showExample, setShowExample] = useState(!!response.example);

  return (
    <QuestionCard index={`(${symptom.letter})`} title={symptom.title}>
      <p className="text-sm text-ink-soft mb-4 leading-relaxed">{symptom.description}</p>

      <label className="block text-xs font-mono-label uppercase text-ink-faint mb-2" id={`freq-label-${symptom.id}`}>
        Frequency
      </label>
      <RatingScale
        name={`Frequency for ${symptom.title}`}
        value={response.frequency}
        onChange={(v) => onChange({ ...response, frequency: v as SymptomResponse['frequency'] })}
        labels={FREQUENCY_LABELS}
      />

      <div className="mt-4 flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => setShowExample((s) => !s)}
          className="text-xs text-verdigris-600 hover:text-verdigris-700 underline underline-offset-2"
        >
          {showExample ? 'Hide example field' : 'Add a real-life example (optional)'}
        </button>
        <Tooltip label={symptom.examples.join(' \u00b7 ')}>
          <span className="text-xs text-ink-faint underline decoration-dotted cursor-help">See sample contexts</span>
        </Tooltip>
      </div>

      {showExample && (
        <textarea
          value={response.example ?? ''}
          onChange={(e) => onChange({ ...response, example: e.target.value })}
          placeholder="Describe a real situation where this happens (optional)"
          className="mt-3 w-full rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-ink-faint/70 focus:border-verdigris-400"
          rows={2}
          aria-label={`Example for ${symptom.title}`}
        />
      )}

      {response.frequency !== null && response.frequency >= 2 && (
        <div className="mt-4 pt-4 rule">
          <label className="block text-xs font-mono-label uppercase text-ink-faint mb-2">
            How much does this interfere with functioning?
          </label>
          <RatingScale
            name={`Impact for ${symptom.title}`}
            value={response.impact}
            onChange={(v) => onChange({ ...response, impact: v as SymptomResponse['impact'] })}
            labels={IMPACT_LABELS}
            compact
          />
        </div>
      )}
    </QuestionCard>
  );
}
