import type { Assessment } from '../types';
import { age, calculate, interpretation } from '../engine';

const Tile = ({ name, value, detail }: { name: string; value: string; detail: string }) => (
  <div className="summary-tile"><span>{name}</span><strong>{value}</strong><small>{detail}</small></div>
);

function EvidenceRow({ area, status, detail }: { area: string; status: string; detail: string }) {
  return <tr><td>{area}</td><td>{status}</td><td>{detail}</td></tr>;
}

export function Report({ assessment, onClear }: { assessment: Assessment; onClear: () => void }) {
  const r = calculate(assessment);
  const u = assessment.user;
  const currentAge = age(assessment);

  const next = r.symptomThreshold
    ? 'Consider discussing the results with a qualified clinician. A full assessment can integrate interview history, developmental evidence, functioning, collateral information, and alternative explanations.'
    : 'If these difficulties are persistent or impairing, professional support can still be useful even when this educational symptom threshold is not reached.';

  const Bar = ({ name, value, max }: { name: string; value: number; max: number }) => (
    <div className="bar">
      <span>{name}</span>
      <i><b style={{ width: `${Math.min(100, Math.max(0, value / max * 100))}%` }} /></i>
      <em>{value.toFixed(max === 4 ? 1 : 0)} / {max}</em>
    </div>
  );

  const a1Status = r.A1 ? `Threshold reached (${r.ic}/${r.threshold})` : `Below threshold (${r.ic}/${r.threshold})`;
  const a2Status = r.A2 ? `Threshold reached (${r.hc}/${r.threshold})` : `Below threshold (${r.hc}/${r.threshold})`;
  const bStatus = r.childhoodEvidence ? 'Supporting history entered' : 'Insufficient / unclear';
  const cStatus = r.crossSettingEvidence ? 'Supporting cross-setting signal' : 'Limited / unclear';
  const dStatus = r.functionalImpact ? 'Functional impact reported' : 'Limited impact reported';
  const eStatus = r.diff ? `${r.diff} factor${r.diff === 1 ? '' : 's'} flagged` : 'No major factor flagged';

  return <article className="report">
    <section className="cover">
      <div className="kicker">Axis Clinical Learning · Educational screening report</div>
      <h1>ADHD Assessment &amp; Clinical Reasoning Report</h1>
      <p>A structured educational synthesis of symptom frequency, persistence, developmental history, functioning, settings, collateral information, and alternative factors.</p>
      <div className="not-dx">NOT A MEDICAL DIAGNOSIS</div>
      <div className="identity">
        <span><b>{u.name || 'Anonymous learning case'}</b>Participant / identifier</span>
        <span><b>{currentAge || '—'}</b>Age</span>
        <span><b>{u.date || '—'}</b>Assessment date</span>
      </div>
    </section>

    <section className="report-body">
      <section>
        <div className="eyebrow">Executive summary</div>
        <h2>Assessment profile</h2>
        <div className="summary-grid">
          <Tile name="Inattention" value={r.A1 ? 'Threshold reached' : 'Below threshold'} detail={`${r.ic}/${r.threshold} threshold-level symptoms · ${r.ir}/36 raw`} />
          <Tile name="Hyperactivity / impulsivity" value={r.A2 ? 'Threshold reached' : 'Below threshold'} detail={`${r.hc}/${r.threshold} threshold-level symptoms · ${r.hr}/36 raw`} />
          <Tile name="Functional impairment" value={r.imp.toFixed(1)} detail="Average educational impact index / 4" />
          <Tile name="Childhood evidence" value={r.childhoodEvidence ? 'Supporting' : 'Unclear'} detail={`${r.childYes} childhood domains endorsed`} />
          <Tile name="Cross-setting evidence" value={r.crossSettingEvidence ? 'Supporting' : 'Limited'} detail={`${r.setCount} settings with elevated difficulty`} />
          <Tile name="Current severity signal" value={r.severity} detail="Educational severity estimate, not a diagnosis" />
        </div>
      </section>

      <section>
        <h2>Educational interpretation</h2>
        <div className="interpretation"><b>{r.presentation}</b><br />{interpretation(r)}</div>
        <p>This report deliberately separates symptom frequency from developmental history, cross-setting evidence, functional impairment, and differential considerations. The DSM-5-TR describes ADHD as a persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development; diagnosis requires more than a symptom count.</p>
      </section>

      <section>
        <h2>DSM-5-TR framework check</h2>
        <p className="muted">These are educational evidence checks based on the information entered. They do not determine whether DSM-5-TR criteria are clinically met.</p>
        <table><thead><tr><th>Area</th><th>Current evidence</th><th>What a clinician still considers</th></tr></thead>
          <tbody>
            <EvidenceRow area="A1 · Inattention" status={a1Status} detail="The DSM-5-TR threshold is age-dependent and requires persistence and developmental appropriateness." />
            <EvidenceRow area="A2 · Hyperactivity / impulsivity" status={a2Status} detail="The same age-dependent threshold applies to this symptom domain." />
            <EvidenceRow area="Duration" status={r.durationEvidence ? '6+ month evidence entered' : 'Not adequately documented'} detail="The symptom pattern must be persistent rather than a short-lived episode." />
            <EvidenceRow area="B · Before age 12" status={bStatus} detail="Several symptoms should have been present before age 12; this checklist is supporting history, not a substitute for records/interview." />
            <EvidenceRow area="C · Two or more settings" status={cStatus} detail="The DSM-5-TR looks for symptoms in two or more settings; this tool records setting difficulty as supporting context." />
            <EvidenceRow area="D · Functional impact" status={dStatus} detail="Clear interference or reduced quality of social, academic, or occupational functioning is required." />
            <EvidenceRow area="E · Alternatives" status={eStatus} detail="Symptoms should not be better explained by another disorder, psychosis, substance intoxication/withdrawal, or another relevant factor." />
          </tbody>
        </table>
      </section>

      <section>
        <h2>Symptom &amp; functioning profile</h2>
        <div className="bar-chart">
          <Bar name="Inattention raw score" value={r.ir} max={36} />
          <Bar name="Hyperactivity / impulsivity raw score" value={r.hr} max={36} />
          <Bar name="Executive-function difficulty" value={r.executive} max={4} />
        </div>
        <p>The educational symptom threshold used here is {r.threshold} symptoms for each domain for this age group. Raw scores describe the entered frequency ratings; they are not probabilities or diagnostic scores.</p>
      </section>

      <section>
        <h2>Clinical reasoning &amp; next steps</h2>
        <div className="two-col">
          <div>
            <h3>Why this result?</h3>
            <p>{interpretation(r)}</p>
            <h3>Recommended educational next step</h3>
            <p>{next}</p>
          </div>
          <div className="definitions">
            <p><b>Screening</b> Helps identify whether fuller assessment may be useful.</p>
            <p><b>Clinical assessment</b> Integrates history, interview, functioning, collateral information, developmental evidence, alternatives, and professional judgment.</p>
            <p><b>Diagnostic limitation</b> This software cannot establish or rule out ADHD or another disorder.</p>
          </div>
        </div>
      </section>

      <section className="limitations">
        <h2>Limitations &amp; safety</h2>
        <p>This application is an educational simulation built around the structure of the DSM-5-TR ADHD criteria. It is not a validated diagnostic instrument and should not be used to make medication, treatment, school, employment, or other clinical decisions. Sleep problems, mood symptoms, anxiety, stress, learning differences, trauma-related symptoms, substances, medications, and medical factors can affect attention and behavior and may need separate evaluation.</p>
        <small>NOT A MEDICAL DIAGNOSIS · Generated locally in the browser · Assessment information is not sent to a server by this application.</small>
      </section>

      <div className="report-actions">
        <button onClick={() => window.print()}>Print / Save report as PDF</button>
        <button className="danger" onClick={onClear}>Clear local assessment</button>
      </div>
    </section>
  </article>;
}
