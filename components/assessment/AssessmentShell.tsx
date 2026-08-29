import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../state/AssessmentContext';
import { ProgressBar } from './ProgressBar';
import { NavigationButtons } from './NavigationButtons';
import { DisclaimerStep } from './steps/DisclaimerStep';
import { DemographicsStep } from './steps/DemographicsStep';
import { SymptomSectionStep } from './steps/SymptomSectionStep';
import { DurationStep } from './steps/DurationStep';
import { DevelopmentalHistoryStep } from './steps/DevelopmentalHistoryStep';
import { SettingsStep } from './steps/SettingsStep';
import { ImpairmentStep } from './steps/ImpairmentStep';
import { ExecutiveFunctionStep } from './steps/ExecutiveFunctionStep';
import { AssociatedFeaturesStep } from './steps/AssociatedFeaturesStep';
import { DifferentialStep } from './steps/DifferentialStep';
import { CollateralStep } from './steps/CollateralStep';
import { ReviewStep } from './steps/ReviewStep';
import { INATTENTION_SYMPTOMS, HYPERACTIVITY_IMPULSIVITY_SYMPTOMS } from '../../data/symptoms';
import { isValidAge, allSymptomsAnswered } from '../../utils/validation';
import { runConsistencyChecks } from '../../engine/consistency';

const STEP_LABELS = [
  'Educational Use Only',
  'About you',
  'Inattention',
  'Hyperactivity / Impulsivity',
  'Duration',
  'Childhood history',
  'Cross-setting evidence',
  'Functional impact',
  'Executive function',
  'Associated features',
  'Differential considerations',
  'Observer report',
  'Review',
];

export function AssessmentShell() {
  const { state, update } = useAssessment();
  const [step, setStep] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const navigate = useNavigate();

  const total = STEP_LABELS.length;

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return isValidAge(state.demographics.age);
      case 2:
        return allSymptomsAnswered(state.inattention);
      case 3:
        return allSymptomsAnswered(state.hyperactivityImpulsivity);
      default:
        return true;
    }
  }

  function handleNext() {
    if (!canAdvance()) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    if (step === total - 1) {
      update((prev) => ({
        ...prev,
        completed: true,
        responseQuality: { flags: runConsistencyChecks(state), reviewed: true },
      }));
      navigate('/results');
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBack() {
    setShowValidation(false);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const validationMessage = (() => {
    if (!showValidation) return undefined;
    if (step === 1) return 'Please enter a valid age.';
    if (step === 2) return 'Please answer all inattention items.';
    if (step === 3) return 'Please answer all hyperactivity/impulsivity items.';
    return undefined;
  })();

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      {step > 0 && <ProgressBar currentStep={step} totalSteps={total} stepLabel={STEP_LABELS[step]} />}

      <div key={step}>
        {step === 0 && <DisclaimerStep onNext={handleNext} />}
        {step === 1 && (
          <DemographicsStep
            demographics={state.demographics}
            onChange={(d) => update({ demographics: d })}
            showValidation={showValidation}
          />
        )}
        {step === 2 && (
          <SymptomSectionStep
            eyebrow="Criterion A \u2014 Inattention"
            title="Inattention"
            description="For each item, rate how often this has applied to you recently."
            symptoms={INATTENTION_SYMPTOMS}
            responses={state.inattention}
            onChange={(r) => update({ inattention: r })}
          />
        )}
        {step === 3 && (
          <SymptomSectionStep
            eyebrow="Criterion A \u2014 Hyperactivity / Impulsivity"
            title="Hyperactivity and impulsivity"
            description="For each item, rate how often this has applied to you recently."
            symptoms={HYPERACTIVITY_IMPULSIVITY_SYMPTOMS}
            responses={state.hyperactivityImpulsivity}
            onChange={(r) => update({ hyperactivityImpulsivity: r })}
          />
        )}
        {step === 4 && <DurationStep duration={state.duration} onChange={(d) => update({ duration: d })} />}
        {step === 5 && (
          <DevelopmentalHistoryStep history={state.developmentalHistory} onChange={(h) => update({ developmentalHistory: h })} />
        )}
        {step === 6 && <SettingsStep settings={state.settings} onChange={(s) => update({ settings: s })} />}
        {step === 7 && <ImpairmentStep impairment={state.impairment} onChange={(i) => update({ impairment: i })} />}
        {step === 8 && <ExecutiveFunctionStep data={state.executiveFunction} onChange={(d) => update({ executiveFunction: d })} />}
        {step === 9 && (
          <AssociatedFeaturesStep data={state.associatedFeatures} onChange={(d) => update({ associatedFeatures: d })} />
        )}
        {step === 10 && <DifferentialStep data={state.differential} onChange={(d) => update({ differential: d })} />}
        {step === 11 && <CollateralStep collateral={state.collateral} onChange={(c) => update({ collateral: c })} />}
        {step === 12 && <ReviewStep state={state} />}
      </div>

      {step > 0 && (
        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          nextLabel={step === total - 1 ? 'View Results' : 'Continue'}
          helperText={validationMessage}
        />
      )}
    </div>
  );
}
