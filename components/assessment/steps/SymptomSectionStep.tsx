import type { SymptomDefinition, SymptomResponse } from '../../../types/symptoms';
import { SymptomQuestion } from '../SymptomQuestion';
import { SectionHeader } from '../SectionHeader';

interface SymptomSectionStepProps {
  title: string;
  eyebrow: string;
  description: string;
  symptoms: SymptomDefinition[];
  responses: SymptomResponse[];
  onChange: (responses: SymptomResponse[]) => void;
}

export function SymptomSectionStep({ title, eyebrow, description, symptoms, responses, onChange }: SymptomSectionStepProps) {
  function updateResponse(updated: SymptomResponse) {
    onChange(responses.map((r) => (r.symptomId === updated.symptomId ? updated : r)));
  }

  return (
    <div>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="space-y-4">
        {symptoms.map((symptom) => {
          const response = responses.find((r) => r.symptomId === symptom.id)!;
          return <SymptomQuestion key={symptom.id} symptom={symptom} response={response} onChange={updateResponse} />;
        })}
      </div>
    </div>
  );
}
