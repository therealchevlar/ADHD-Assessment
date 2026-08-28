import type { Assessment, Rating } from './types';

/**
 * Educational logic aligned to the structure of DSM-5-TR ADHD criteria.
 * This intentionally does NOT make or rule out a diagnosis.
 */
export function age(a: Assessment) {
  if (a.user.dob) {
    const d = new Date(a.user.dob);
    const n = new Date();
    let x = n.getFullYear() - d.getFullYear();
    if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) x--;
    return x;
  }
  return Number(a.user.age) || 0;
}

function sixMonthsOrMore(value: string) {
  return ['6+ months', '1+ years', 'Since childhood'].includes(value);
}

function symptomDurationQualifies(itemDuration: string, overallDuration: string) {
  return sixMonthsOrMore(itemDuration) || (!itemDuration && sixMonthsOrMore(overallDuration));
}

function thresholdCount(items: Assessment['inattentive'], overallDuration: string) {
  return items.filter(
    item => item.rating >= 3 && symptomDurationQualifies(item.duration, overallDuration)
  ).length;
}

function raw(items: { rating: number }[]) {
  return items.reduce((sum, item) => sum + item.rating, 0);
}

function average(values: Record<number, number>) {
  const v = Object.values(values);
  return v.length ? v.reduce((sum, n) => sum + n, 0) / v.length : 0;
}

export function calculate(a: Assessment) {
  const currentAge = age(a);
  const threshold = currentAge > 0 && currentAge < 17 ? 6 : 5;
  const inattentionCount = thresholdCount(a.inattentive, a.duration);
  const hyperactivityCount = thresholdCount(a.hyperactive, a.duration);
  const inattentionRaw = raw(a.inattentive);
  const hyperactivityRaw = raw(a.hyperactive);

  // These are supporting signals, not substitutes for the DSM criteria.
  const childhoodYes = Object.values(a.childhood).filter(v => v === 'Yes').length;
  const settingSignals = Object.values(a.settings).filter(v => v >= 2).length;
  const impairmentAverage = average(a.impairment);
  const differentialFlags = Object.values(a.differential).filter(v => v >= 3).length;

  const A1 = inattentionCount >= threshold;
  const A2 = hyperactivityCount >= threshold;
  const symptomThreshold = A1 || A2;
  const durationEvidence = sixMonthsOrMore(a.duration) ||
    [...a.inattentive, ...a.hyperactive].some(s => s.rating >= 3 && sixMonthsOrMore(s.duration));
  const childhoodEvidence = childhoodYes >= 3;
  const crossSettingEvidence = settingSignals >= 2;
  const functionalImpact = impairmentAverage >= 1.5;

  const presentation = A1 && A2
    ? 'Combined presentation pattern'
    : A1
      ? 'Predominantly inattentive presentation pattern'
      : A2
        ? 'Predominantly hyperactive / impulsive presentation pattern'
        : 'Symptom threshold not reached';

  const severity = impairmentAverage >= 3.5 ||
    (inattentionCount >= threshold + 3) ||
    (hyperactivityCount >= threshold + 3)
    ? 'Severe'
    : impairmentAverage >= 2.5 ||
      (inattentionCount >= threshold + 1) ||
      (hyperactivityCount >= threshold + 1)
      ? 'Moderate'
      : impairmentAverage >= 1.5 || symptomThreshold
        ? 'Mild'
        : 'Minimal';

  return {
    age: currentAge,
    threshold,
    ir: inattentionRaw,
    hr: hyperactivityRaw,
    ic: inattentionCount,
    hc: hyperactivityCount,
    imp: impairmentAverage,
    childYes: childhoodYes,
    setCount: settingSignals,
    diff: differentialFlags,
    A1,
    A2,
    symptomThreshold,
    durationEvidence,
    childhoodEvidence,
    crossSettingEvidence,
    functionalImpact,
    presentation,
    severity,
    executive: average(a.executive),
  };
}

export function interpretation(r: ReturnType<typeof calculate>) {
  if (!r.symptomThreshold) {
    return 'The current responses do not reach the symptom-count threshold used for either ADHD symptom domain in this educational model.';
  }
  if (!r.durationEvidence) {
    return 'The symptom-count threshold is reached in one or more domains, but six-month persistence has not been adequately documented in the responses.';
  }
  if (!r.functionalImpact) {
    return 'The symptom-count threshold is reached, but the reported functional-impact information is limited. Clinical significance requires evidence of interference or reduced functioning.';
  }
  if (!r.childhoodEvidence) {
    return 'The current profile has a symptom signal and some functional information, but the childhood-history section does not provide enough supporting information for a confident developmental interpretation.';
  }
  if (!r.crossSettingEvidence) {
    return 'The profile has a symptom signal, but cross-setting evidence is limited. A clinician would normally explore whether symptoms are present across more than one setting.';
  }
  if (r.diff > 0) {
    return 'The profile contains an ADHD-like symptom signal, while one or more alternative or contributing factors were flagged. These factors need clinical exploration because the DSM-5-TR requires symptoms not to be better explained by another condition or substance-related factor.';
  }
  return 'The responses show a pattern that may warrant a comprehensive professional ADHD assessment. This educational tool cannot establish the diagnosis.';
}
