import type { Assessment } from '../types';
import { age, calculate, interpretation } from '../engine';

const Tile = ({ name, value, detail }: { name: string; value: string; detail: string }) => <div className="summary-tile"><span>{name}</span><strong>{value}</strong><small>{detail}</small></div>;
const Row = ({ area, status, detail }: { area: string; status: string; detail: string }) => <tr><td>{area}</td><td>{status}</td><td>{detail}</td></tr>;

export function Report({ assessment, onClear }: { assessment: Assessment; onClear: () => void }) {
  const r = calculate(assessment); const u = assessment.user; const currentAge = age(assessment);
  const next = r.symptomThreshold ? 'Consider discussing the pattern with a qualified clinician. A full assessment can integrate interview history, developmental evidence, functioning, settings, collateral information, and alternative explanations.' : 'If these difficulties are persistent or impairing, professional support can still be useful even when this educational symptom-count threshold is not reached.';
  const Bar = ({ name, value, max }: { name: string; value: number; max: number }) => <div className="bar"><span>{name}</span><i><b style={{ width: `${Math.min(100, Math.max(0, value / max * 100))}%` }}/></i><em>{value.toFixed(max === 4 ? 1 : 0)} / {max}</em></div>;
  return <article className="report">
    <section className="cover"><div className="kicker">Axis Clinical Learning · Educational assessment report</div><h1>ADHD Assessment &amp; Clinical Reasoning Report</h1><p>A structured synthesis of symptom frequency, persistence, developmental history, settings, functioning, optional observer information, and other relevant factors.</p><div className="not-dx">NOT A MEDICAL DIAGNOSIS</div><div className="identity"><span><b>{u.name || 'Anonymous learning case'}</b>Participant / identifier</span><span><b>{currentAge || '—'}</b>Age</span><span><b>{u.date || '—'}</b>Assessment date</span></div></section>
    <section className="report-body">
      <section><div className="eyebrow">Executive summary</div><h2>Assessment profile</h2><div className="summary-grid">
        <Tile name="Inattention" value={r.A1 ? 'Threshold reached' : 'Below threshold'} detail={`${r.ic}/${r.threshold} threshold-level symptoms · ${r.ir}/36 response total`} />
        <Tile name="Hyperactivity / impulsivity" value={r.A2 ? 'Threshold reached' : 'Below threshold'} detail={`${r.hc}/${r.threshold} threshold-level symptoms · ${r.hr}/36 response total`} />
        <Tile name="Duration" value={r.durationEvidence ? '6+ months reported' : 'Not established'} detail={assessment.duration || 'No duration selected'} />
        <Tile name="Childhood history" value={r.childHistoryStatus} detail={`${r.childYes} of ${r.childAnswered}/13 marked Yes`} />
        <Tile name="Cross-setting information" value={r.crossSettingEvidence ? 'Supporting' : 'Limited / unclear'} detail={`${r.setCount} settings rated at least Sometimes`} />
        <Tile name="Functional impact" value={r.imp.toFixed(1)} detail="Average reported impact index / 4 · descriptive only" />
        <Tile name="Severity context" value={r.severity} detail={r.symptomThreshold ? 'Educational context only' : 'Not assigned because symptom threshold was not reached'} />
      </div></section>
      <section><h2>Educational interpretation</h2><div className="interpretation"><b>{r.presentation}</b><br />{interpretation(r)}</div><p>This report separates symptom frequency from developmental history, settings, functional impact, and other factors. The DSM-5-TR framework requires more than a symptom count, and this software cannot make or rule out a diagnosis.</p></section>
      <section><h2>How the result was reached</h2><table><thead><tr><th>Area</th><th>Entered information</th><th>Interpretation</th></tr></thead><tbody>
        <Row area="A1 · Inattention" status={`${r.ic}/${r.threshold}`} detail="Age-based educational symptom-count comparison." />
        <Row area="A2 · Hyperactivity / impulsivity" status={`${r.hc}/${r.threshold}`} detail="Age-based educational symptom-count comparison." />
        <Row area="Persistence" status={r.durationEvidence ? 'Supporting' : 'Unclear'} detail="The framework considers a persistent pattern of at least six months." />
        <Row area="Before age 12" status={r.childHistoryStatus} detail="Several symptoms should have been present before age 12; uncertain history is not treated as evidence of absence." />
        <Row area="Two or more settings" status={r.crossSettingEvidence ? 'Supporting information' : 'Limited / unclear'} detail="The setting questions describe where difficulties occur; they do not independently establish Criterion C." />
        <Row area="Functional impact" status={r.functionalImpact ? 'Impact reported' : 'Limited / unclear'} detail="Clear interference or reduced quality of functioning is an important part of clinical assessment." />
        <Row area="Other factors" status={r.diff ? `${r.diff} flagged` : 'None strongly flagged'} detail="Flagged factors may warrant further clinical exploration and are not diagnoses." />
      </tbody></table></section>
      <section><h2>Symptom &amp; supplementary profile</h2><div className="bar-chart"><Bar name="Inattention response total" value={r.ir} max={36}/><Bar name="Hyperactivity / impulsivity response total" value={r.hr} max={36}/><Bar name="Executive-function difficulty" value={r.executive} max={4}/></div><p>Response totals are descriptive summaries of the selected answers. They are not probabilities, validated diagnostic scores, or a substitute for clinical judgment. Executive-function information is supplementary and is not used as the core symptom count.</p></section>
      <section><h2>Developmental &amp; contextual notes</h2><div className="two-col"><div><h3>Childhood history</h3><p>{assessment.childNotes || 'No additional childhood notes entered.'}</p><h3>Optional observer</h3><p>{assessment.collateral.type ? `${assessment.collateral.type} perspective provided.` : 'No observer perspective provided. This was optional.'}</p></div><div className="definitions"><p><b>Not sure is meaningful</b> Uncertainty is kept separate from a “No” response rather than being treated as absence.</p><p><b>Context matters</b> Sleep, mood, anxiety, stress, substances, learning differences, medical factors, and medications can affect attention and behaviour.</p></div></div></section>
      <section><h2>Clinical reasoning &amp; next steps</h2><div className="two-col"><div><h3>Why this result?</h3><p>{interpretation(r)}</p><h3>Educational next step</h3><p>{next}</p></div><div className="definitions"><p><b>Screening</b> Helps identify whether fuller assessment may be useful.</p><p><b>Clinical assessment</b> Integrates history, interview, functioning, developmental evidence, settings, collateral information, alternatives, and professional judgment.</p><p><b>Diagnosis</b> Must be made by a qualified professional; this application cannot provide one.</p></div></div></section>
      <section className="limitations"><h2>Important: what this result means</h2><p>This application is an educational simulation built around the structure of DSM-5-TR ADHD criteria. It is not a validated diagnostic instrument and should not be used to make medication, treatment, school, employment, or other clinical decisions.</p><p>If these difficulties are causing meaningful problems, consider discussing them with a qualified clinician. Bring relevant developmental history and examples from different settings when possible.</p><small>NOT A MEDICAL DIAGNOSIS · Responses are saved locally in this browser for this application.</small></section>
      <div className="report-actions"><button onClick={() => window.print()}>Print / Save report as PDF</button><button className="danger" onClick={onClear}>Clear local assessment</button></div>
    </section>
  </article>;
}
