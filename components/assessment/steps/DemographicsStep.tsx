import type { Demographics, LifeStage } from '../../../types/assessment';
import { calculateAgeFromDob, isValidAge } from '../../../utils/validation';
import { SectionHeader } from '../SectionHeader';
import { Card } from '../../ui/Card';

const LIFE_STAGE_OPTIONS: { value: LifeStage; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'employed', label: 'Employed' },
  { value: 'both', label: 'Both' },
  { value: 'other', label: 'Other' },
];

interface DemographicsStepProps {
  demographics: Demographics;
  onChange: (d: Demographics) => void;
  showValidation: boolean;
}

const inputClass =
  'w-full rounded border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-ink-faint/70 focus:border-verdigris-400';
const labelClass = 'block text-xs font-mono-label uppercase text-ink-faint mb-1.5';

export function DemographicsStep({ demographics, onChange, showValidation }: DemographicsStepProps) {
  const ageInvalid = showValidation && !isValidAge(demographics.age);

  function handleDobChange(dob: string) {
    const derivedAge = calculateAgeFromDob(dob);
    onChange({ ...demographics, dateOfBirth: dob, age: derivedAge ?? demographics.age });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Getting started"
        title="About you"
        description="This information helps the application apply the correct age-based threshold and ask age-appropriate follow-up questions. Only age is required."
      />
      <Card className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="dem-name">Name (optional)</label>
          <input
            id="dem-name"
            className={inputClass}
            value={demographics.name ?? ''}
            onChange={(e) => onChange({ ...demographics, name: e.target.value })}
            placeholder="Not required"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="dem-age">Age *</label>
          <input
            id="dem-age"
            type="number"
            min={4}
            max={110}
            className={`${inputClass} ${ageInvalid ? 'border-clay-400' : ''}`}
            value={demographics.age ?? ''}
            onChange={(e) => onChange({ ...demographics, age: e.target.value === '' ? null : Number(e.target.value) })}
            aria-invalid={ageInvalid}
            aria-describedby={ageInvalid ? 'age-error' : undefined}
          />
          {ageInvalid && (
            <p id="age-error" className="text-xs text-clay-600 mt-1">
              Please enter a valid age (between 4 and 110).
            </p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="dem-dob">Date of birth (optional)</label>
          <input
            id="dem-dob"
            type="date"
            className={inputClass}
            value={demographics.dateOfBirth ?? ''}
            onChange={(e) => handleDobChange(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="dem-gender">Gender (optional)</label>
          <input
            id="dem-gender"
            className={inputClass}
            value={demographics.gender ?? ''}
            onChange={(e) => onChange({ ...demographics, gender: e.target.value })}
            placeholder="Not required"
          />
        </div>
        <div>
          <label className={labelClass}>Current life stage</label>
          <div className="flex flex-wrap gap-2">
            {LIFE_STAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...demographics, lifeStage: opt.value })}
                className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                  demographics.lifeStage === opt.value
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
          <label className={labelClass} htmlFor="dem-edu">Education level</label>
          <input
            id="dem-edu"
            className={inputClass}
            value={demographics.educationLevel ?? ''}
            onChange={(e) => onChange({ ...demographics, educationLevel: e.target.value })}
            placeholder="e.g. Undergraduate, High school"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="dem-date">Assessment date</label>
          <input
            id="dem-date"
            type="date"
            className={inputClass}
            value={demographics.assessmentDate}
            onChange={(e) => onChange({ ...demographics, assessmentDate: e.target.value })}
          />
        </div>
      </Card>
    </div>
  );
}
