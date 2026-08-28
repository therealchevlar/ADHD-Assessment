import type { Assessment } from './types';

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

const persistent = (d: string) => ['6–12 months', '1–3 years', 'More than 3 years', 'Since childhood'].includes(d);
const thresholdRating = (rating: number) => rating >= 3;

export function calculate(a: Assessment) {
  const currentAge = age(a);
  const threshold = currentAge > 0 && currentAge < 17 ? 6 : 5;
  const ic = a.inattentive.filter(s => thresholdRating(s.rating)).length;
  const hc = a.hyperactive.filter(s => thresholdRating(s.rating)).length;
  const ir = a.inattentive.reduce((n, s) => n + s.rating, 0);
  const hr = a.hyperactive.reduce((n, s) => n + s.rating, 0);
  const childEntries = Object.values(a.childhood);
  const childAnswered = childEntries.length;
  const childYes = childEntries.filter(v => v === 'Yes').length;
  const childUnsure = childEntries.filter(v => v === 'Unsure').length;
  const childComplete = childAnswered === 13;
  const setCount = Object.values(a.settings).filter(v => v >= 2).length;
  const impairmentValues = Object.values(a.impairment);
  const imp = impairmentValues.length ? impairmentValues.reduce((n, v) => n + v, 0) / impairmentValues.length : 0;
  const diff = Object.values(a.differential).filter(v => v >= 2).length;
  const executiveValues = Object.values(a.executive);
  const executiveAverage = executiveValues.length ? executiveValues.reduce((n, v) => n + v, 0) / executiveValues.length : 0;
  const A1 = ic >= threshold;
  const A2 = hc >= threshold;
  const symptomThreshold = A1 || A2;
  const durationEvidence = persistent(a.duration);
  const childhoodEvidence = childYes >= 3;
  const childhoodStatus = !childAnswered ? 'Not answered' : childComplete ? (childYes >= 3 ? 'Supporting history' : childYes === 0 ? 'No childhood difficulties reported' : 'Limited supporting history') : childUnsure > 0 ? 'Uncertain / incomplete' : 'Incomplete';
  const crossSettingEvidence = setCount >= 2;
  const functionalImpact = imp >= 1.5;
  const presentation = A1 && A2 ? 'Combined presentation pattern' : A1 ? 'Predominantly inattentive presentation pattern' : A2 ? 'Predominantly hyperactive / impulsive presentation pattern' : 'Symptom threshold not reached';
  const severity = !symptomThreshold ? 'Not established' : (imp >= 3.25 || ic >= threshold + 3 || hc >= threshold + 3) ? 'Severe' : (imp >= 2.25 || ic >= threshold + 1 || hc >= threshold + 1) ? 'Moderate' : 'Mild';
  return { age: currentAge, threshold, ic, hc, ir, hr, childAnswered, childYes, childUnsure, childComplete, childHistoryComplete: childComplete, childHistoryStatus: childhoodStatus, setCount, imp, diff, executive: executiveAverage, A1, A2, symptomThreshold, durationEvidence, childhoodEvidence, crossSettingEvidence, functionalImpact, presentation, severity };
}

export function interpretation(r: ReturnType<typeof calculate>) {
  if (!r.symptomThreshold) return 'The entered symptom frequencies do not reach the age-based symptom-count threshold in either ADHD symptom domain. This does not by itself rule ADHD in or out.';
  if (!r.durationEvidence) return 'A symptom-count threshold is reached, but the reported duration does not currently document a persistent six-month pattern.';
  if (!r.functionalImpact) return 'A symptom-count threshold is reached, but the entered information does not currently show clear functional interference. A clinician would explore this in more detail.';
  if (!r.childhoodEvidence) return 'A symptom-count threshold is reached, but the developmental history does not currently provide clear supporting evidence for several symptoms before age 12. If this history is unknown, professional interview or records may help.';
  if (!r.crossSettingEvidence) return 'A symptom-count threshold is reached, but the entered setting information does not currently show difficulties across at least two settings.';
  if (r.diff > 0) return 'The entered profile shows an ADHD-like symptom pattern, while other factors that can affect attention or activity were also flagged. These factors need clinical exploration.';
  return 'The entered profile shows a pattern that may warrant a comprehensive professional ADHD assessment. This educational tool cannot establish a diagnosis.';
}
