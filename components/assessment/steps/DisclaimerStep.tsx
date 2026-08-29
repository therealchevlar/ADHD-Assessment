import { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

export function DisclaimerStep({ onNext }: { onNext: () => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      <div className="font-mono-label text-[11px] uppercase text-amber-700 mb-2">Educational Use Only</div>
      <h1 className="font-display text-3xl text-ink mb-6">Before you begin</h1>
      <Card className="mb-6">
        <p className="text-ink-soft leading-relaxed mb-4">
          This application is an educational screening and clinical-reasoning simulator. It does not provide a
          medical or psychiatric diagnosis and cannot replace assessment by a qualified healthcare professional.
        </p>
        <p className="text-ink-soft leading-relaxed mb-4">
          It walks through the kinds of information a clinician typically gathers — symptom patterns, duration,
          developmental history, cross-setting evidence, functional impairment, and differential considerations —
          and shows how those pieces combine into clinical reasoning. Nothing you enter is sent to a server; your
          responses stay in this browser.
        </p>
        <p className="text-ink-soft leading-relaxed">
          If you are in distress or having thoughts of harming yourself, please pause and reach out to a crisis
          line or emergency services in your area rather than continuing with this simulator.
        </p>
      </Card>
      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-1 h-4 w-4 accent-verdigris-600"
        />
        <span className="text-sm text-ink-soft">
          I understand this is an educational simulation and not a medical diagnosis.
        </span>
      </label>
      <Button onClick={onNext} disabled={!checked} size="lg">
        I understand — Continue
      </Button>
    </div>
  );
}
