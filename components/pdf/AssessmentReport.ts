import jsPDF from 'jspdf';
import type { AssessmentState } from '../../types/assessment';
import type { DiagnosticReasoningResult } from '../../types/results';
import { domainFrequencyScore } from '../../engine/scoring';
import { IMPAIRMENT_AREA_LABELS, IMPAIRMENT_AREA_ORDER, SETTING_LABELS, SETTING_ORDER } from '../../data/questions';

const MARGIN = 18;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const INK = '#182A2E';
const VERDIGRIS = '#2F5751';
const SOFT = '#3B4E52';
const FAINT = '#6B7B7E';
const AMBER = '#8A5A22';

interface Cursor {
  y: number;
  pageNumber: number;
}

function addFooter(doc: jsPDF, cursor: Cursor) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(FAINT);
  doc.text('ADHD Assessment \u2014 Educational Use Only', MARGIN, 289);
  doc.text('This report does not constitute a medical or psychiatric diagnosis.', PAGE_WIDTH - MARGIN, 289, { align: 'right' });
  doc.text(String(cursor.pageNumber), PAGE_WIDTH / 2, 289, { align: 'center' });
}

function ensureSpace(doc: jsPDF, cursor: Cursor, needed: number) {
  if (cursor.y + needed > 275) {
    addFooter(doc, cursor);
    doc.addPage();
    cursor.pageNumber += 1;
    cursor.y = MARGIN;
  }
}

function heading(doc: jsPDF, cursor: Cursor, text: string) {
  ensureSpace(doc, cursor, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(INK);
  doc.text(text, MARGIN, cursor.y);
  cursor.y += 2;
  doc.setDrawColor(VERDIGRIS);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, cursor.y, PAGE_WIDTH - MARGIN, cursor.y);
  cursor.y += 7;
}

function subheading(doc: jsPDF, cursor: Cursor, text: string) {
  ensureSpace(doc, cursor, 8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(VERDIGRIS);
  doc.text(text, MARGIN, cursor.y);
  cursor.y += 6;
}

function body(doc: jsPDF, cursor: Cursor, text: string, color = SOFT) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(color);
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  for (const line of lines) {
    ensureSpace(doc, cursor, 5.2);
    doc.text(line, MARGIN, cursor.y);
    cursor.y += 5.2;
  }
  cursor.y += 2;
}

function bulletList(doc: jsPDF, cursor: Cursor, items: string[]) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(SOFT);
  for (const item of items) {
    const lines = doc.splitTextToSize(`\u2022  ${item}`, CONTENT_WIDTH - 3);
    for (const line of lines) {
      ensureSpace(doc, cursor, 5.2);
      doc.text(line, MARGIN + 2, cursor.y);
      cursor.y += 5.2;
    }
  }
  cursor.y += 2;
}

function keyValueRow(doc: jsPDF, cursor: Cursor, label: string, value: string) {
  ensureSpace(doc, cursor, 5.6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(SOFT);
  doc.text(label, MARGIN, cursor.y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(INK);
  doc.text(value, MARGIN + 55, cursor.y);
  cursor.y += 5.6;
}

function criterionRow(doc: jsPDF, cursor: Cursor, label: string, status: string, detail: string) {
  ensureSpace(doc, cursor, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(INK);
  doc.text(label, MARGIN, cursor.y);
  const statusColor = status === 'met' || status === 'supported' ? VERDIGRIS : status === 'unclear' ? AMBER : '#A15641';
  doc.setTextColor(statusColor);
  doc.text(`[${status.toUpperCase()}]`, PAGE_WIDTH - MARGIN, cursor.y, { align: 'right' });
  cursor.y += 5;
  body(doc, cursor, detail);
}

export function generateAssessmentReportPdf(state: AssessmentState, result: DiagnosticReasoningResult): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const cursor: Cursor = { y: MARGIN, pageNumber: 1 };

  // Title page block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(INK);
  doc.text('ADHD Assessment Report', MARGIN, cursor.y + 4);
  cursor.y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(VERDIGRIS);
  doc.text('Educational Clinical Assessment Simulator', MARGIN, cursor.y);
  cursor.y += 10;

  doc.setFillColor('#F3E4CB');
  doc.rect(MARGIN, cursor.y, CONTENT_WIDTH, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(AMBER);
  doc.text('NOT A MEDICAL DIAGNOSIS', PAGE_WIDTH / 2, cursor.y + 6.5, { align: 'center' });
  cursor.y += 16;

  // 1. Assessment information
  heading(doc, cursor, '1. Assessment Information');
  keyValueRow(doc, cursor, 'Name', state.demographics.name?.trim() || 'Not provided');
  keyValueRow(doc, cursor, 'Age', state.demographics.age !== null ? String(state.demographics.age) : 'Not provided');
  keyValueRow(doc, cursor, 'Assessment date', state.demographics.assessmentDate);
  keyValueRow(doc, cursor, 'Life stage', state.demographics.lifeStage ?? 'Not provided');
  cursor.y += 2;

  // 4-5. Methodology / DSM-5-TR framework notice
  heading(doc, cursor, '2. Methodology & DSM-5-TR Framework Notice');
  body(
    doc,
    cursor,
    'This report was generated by an educational clinical-assessment simulator. The diagnostic framework referenced is derived from the DSM-5-TR source material supplied with this application, paraphrased into original wording. Criterion-level determinations below reflect this application\u2019s own interpretive logic and are clearly separated from any DSM-5-TR text.'
  );

  // 6-8. Symptom profile
  heading(doc, cursor, '3. Symptom Profile');
  subheading(doc, cursor, 'Inattention');
  keyValueRow(doc, cursor, 'Criterion-level symptom count', `${result.criterionA.inattentionCount} of 9 (threshold: ${result.criterionA.inattentionThreshold})`);
  keyValueRow(doc, cursor, 'Raw frequency score (0\u201336)', String(domainFrequencyScore(state.inattention)));
  cursor.y += 2;
  subheading(doc, cursor, 'Hyperactivity / Impulsivity');
  keyValueRow(doc, cursor, 'Criterion-level symptom count', `${result.criterionA.hyperactivityCount} of 9 (threshold: ${result.criterionA.hyperactivityImpulsivityThreshold})`);
  keyValueRow(doc, cursor, 'Raw frequency score (0\u201336)', String(domainFrequencyScore(state.hyperactivityImpulsivity)));
  cursor.y += 2;

  // 9. Developmental history
  heading(doc, cursor, '4. Developmental History');
  body(doc, cursor, result.criterionB.detail);

  // 10. Cross-setting evidence
  heading(doc, cursor, '5. Cross-Setting Evidence');
  const settingLines = SETTING_ORDER.map((s) => {
    const r = state.settings.responses.find((x) => x.setting === s);
    return `${SETTING_LABELS[s]}: ${r?.difficultiesPresent ?? 'not answered'}`;
  });
  bulletList(doc, cursor, settingLines);
  body(doc, cursor, result.criterionC.detail);

  // 11. Functional impairment
  heading(doc, cursor, '6. Functional Impairment');
  const impairmentLines = IMPAIRMENT_AREA_ORDER.filter((a) => a !== 'other').map((a) => {
    const r = state.impairment.ratings.find((x) => x.area === a);
    return `${IMPAIRMENT_AREA_LABELS[a]}: ${r?.rating ?? 'not rated'} / 4`;
  });
  bulletList(doc, cursor, impairmentLines);
  body(doc, cursor, result.criterionD.detail);

  // 12. Executive-function profile
  heading(doc, cursor, '7. Executive-Function Profile (Optional, Application-Generated)');
  const efLines = state.executiveFunction.ratings.map((r) => `${r.domain}: ${r.rating ?? 'not rated'} / 4`);
  bulletList(doc, cursor, efLines);

  // 13. Differential considerations
  heading(doc, cursor, '8. Differential Considerations');
  body(doc, cursor, result.criterionE.detail);
  if (result.criterionE.flaggedFactors.length > 0) {
    bulletList(doc, cursor, result.criterionE.flaggedFactors);
  }

  // 14. Response consistency
  heading(doc, cursor, '9. Response Consistency');
  if (state.responseQuality.flags.length === 0) {
    body(doc, cursor, 'No response-quality concerns were detected.');
  } else {
    bulletList(doc, cursor, state.responseQuality.flags.map((f) => f.message));
  }

  // 15-16. Presentation profile & severity
  heading(doc, cursor, '10. Presentation Profile & Severity Interpretation');
  keyValueRow(doc, cursor, 'Presentation (educational)', result.presentation.replace(/-/g, ' '));
  keyValueRow(doc, cursor, 'Severity (educational)', result.severity.replace(/-/g, ' '));
  cursor.y += 2;
  body(doc, cursor, 'These labels are application-generated educational interpretations, not confirmed DSM-5-TR diagnostic classifications.');

  // 17. Criterion-by-criterion reasoning
  heading(doc, cursor, '11. Criterion-by-Criterion Reasoning');
  criterionRow(doc, cursor, 'Criterion A \u2014 Symptom threshold', result.criterionA.status, result.criterionA.detail);
  criterionRow(doc, cursor, 'Criterion B \u2014 Developmental onset', result.criterionB.status, result.criterionB.detail);
  criterionRow(doc, cursor, 'Criterion C \u2014 Multiple settings', result.criterionC.status, result.criterionC.detail);
  criterionRow(doc, cursor, 'Criterion D \u2014 Functional impairment', result.criterionD.status, result.criterionD.detail);
  criterionRow(doc, cursor, 'Criterion E \u2014 Differential considerations', result.criterionE.status, result.criterionE.detail);

  // 18. Educational interpretation
  heading(doc, cursor, '12. Educational Interpretation (Why This Result)');
  body(doc, cursor, result.narrative);

  // 19. Suggested next steps
  heading(doc, cursor, '13. Suggested Next Steps');
  bulletList(doc, cursor, result.nextSteps);

  // 20. Limitations
  heading(doc, cursor, '14. Limitations');
  bulletList(doc, cursor, result.limitations);

  // 21. Final disclaimer
  heading(doc, cursor, '15. Final Disclaimer');
  body(
    doc,
    cursor,
    'This report is the output of an educational clinical-assessment simulator. It does not constitute a medical or psychiatric diagnosis and cannot substitute for evaluation by a qualified healthcare professional. Any next steps should be discussed with a licensed clinician.',
    AMBER
  );

  addFooter(doc, cursor);
  return doc;
}
