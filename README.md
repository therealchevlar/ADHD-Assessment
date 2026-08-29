# ADHD Assessment

**Educational Clinical Assessment Simulator**

## Overview

ADHD Assessment is an educational web application built for psychology and psychiatry students. It walks through
the kinds of information a clinician typically gathers when assessing for ADHD — symptom frequency, duration,
developmental history, cross-setting evidence, functional impairment, executive-function profile, and differential
considerations — and demonstrates how those pieces combine into structured clinical reasoning.

## Purpose

This is **not** a diagnostic tool. It never tells a user they do or do not have ADHD. Instead, it produces
educational, criterion-level output such as "Criterion A: Met," "Criterion B: Unclear," and an overall screening
signal (e.g. "Partially supported"), always framed as an educational simulation. The goal is to make visible the
distinction between:

- **DSM-5-TR diagnostic criteria**
- **Screening**
- **Clinical assessment**
- **Educational simulation**

## Educational disclaimer

This application does not provide a medical or psychiatric diagnosis and cannot replace assessment by a qualified
healthcare professional. If you are concerned about attention, activity level, or impulsivity — for yourself or
someone else — please consult a licensed clinician.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Recharts (charts)
- jsPDF (client-side PDF report generation)
- React Router (HashRouter, for static-host compatibility)
- No backend, no database, no environment variables required

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

Type-checks with `tsc -b` and bundles with Vite. Output is written to `dist/`.

## Vercel deployment

This is a static single-page application with no server-side requirements. To deploy:

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — no environment variables are required.

## Project architecture

```text
src/
├── components/
│   ├── assessment/     Wizard shell, per-step forms, shared question controls
│   ├── results/        Results dashboard, charts, evidence matrix, reasoning display
│   ├── pdf/             jsPDF report builder
│   ├── education/       Student Mode toggle + explanations
│   ├── layout/           Header / Footer
│   └── ui/                Button, Card, Modal, Badge, Tooltip primitives
├── data/                 Symptom definitions, question sets, educational content, demo case
├── engine/                Pure, independently testable scoring & reasoning functions
├── types/                 TypeScript types for assessment state and results
├── utils/                 Validation, localStorage persistence, PDF trigger, default state
├── state/                 React context for assessment state
├── pages/                 Route-level pages (Welcome, Assessment, Results, Criteria, About)
└── App.tsx, main.tsx, index.css
```

## Scoring architecture

Diagnostic logic is kept fully separate from UI, in `src/engine/`:

- `scoring.ts` — raw 0–36 frequency scores and criterion-level symptom counts (items rated "Often"/"Very often")
- `diagnosticLogic.ts` — Criterion A evaluation, presentation, and severity
- `developmentalHistory.ts` — Criterion B (developmental onset)
- `settings.ts` — Criterion C (multiple settings)
- `impairment.ts` — Criterion D (functional impairment)
- `differential.ts` — Criterion E (differential considerations)
- `consistency.ts` — response-quality / consistency checks
- `reasoning.ts` — assembles all criteria into a `DiagnosticReasoningResult`, including a dynamically generated
  narrative, next steps, and limitations

Each function takes plain data and returns plain data, so it can be unit tested independently of React.

## DSM-5-TR source methodology

The ADHD diagnostic framework used by this simulator (Criterion A symptom lists, Criteria B–E, presentation and
severity framing) is based on the DSM-5-TR PDF supplied with this project. All criteria text in the application is
paraphrased into original wording for educational use — it is not a verbatim reproduction of the manual. Features
that go beyond the DSM-5-TR source (raw frequency scores, the executive-function profile, response-consistency
checks, the observer/collateral comparison) are explicitly labeled in the UI as application-generated or
educational, and are never presented as official DSM-5-TR criteria or scoring. See the in-app **Sources &
Methodology** page (`/about`) and **DSM-5-TR ADHD Criteria** page (`/criteria`) for more detail.

## Privacy

All assessment data is processed and stored entirely client-side, in this browser's `localStorage`. Nothing is sent
to a server. Use "Restart" on the results page to clear stored data at any time.

## Limitations

This tool is a self-report educational simulation, not a structured clinical interview. It has not been validated
as a diagnostic instrument, cannot verify the information entered, and cannot rule out other conditions that
produce similar symptoms. It should never be used to make treatment decisions.
