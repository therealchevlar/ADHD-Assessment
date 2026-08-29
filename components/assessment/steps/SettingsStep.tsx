import type { SettingData, YesNoUnsure } from '../../../types/assessment';
import { SETTING_LABELS, SETTING_ORDER } from '../../../data/questions';
import { SectionHeader } from '../SectionHeader';
import { Card } from '../../ui/Card';

const OPTIONS: { value: YesNoUnsure; label: string }[] = [
  { value: 'yes', label: 'Yes, noticeable difficulty' },
  { value: 'no', label: 'No, not really' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'prefer-not', label: 'Prefer not to answer' },
];

const SETTING_HINTS: Record<string, string> = {
  home: 'Chores, household routines, family life',
  schoolWork: 'Classes, assignments, exams, coursework',
  workplace: 'Job tasks, meetings, deadlines, coworkers',
  social: 'Friendships, conversations, group activities',
  dailyResponsibilities: 'Bills, appointments, errands, planning',
};

export function SettingsStep({ settings, onChange }: { settings: SettingData; onChange: (s: SettingData) => void }) {
  function update(setting: string, difficultiesPresent: YesNoUnsure) {
    onChange({
      responses: settings.responses.map((r) => (r.setting === setting ? { ...r, difficultiesPresent } : r)),
    });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Cross-setting evidence"
        title="Where do these difficulties show up?"
        description="Clinicians look for evidence in more than one independent setting, not just one narrow context."
      />
      <div className="space-y-3">
        {SETTING_ORDER.map((key) => {
          const response = settings.responses.find((r) => r.setting === key)!;
          return (
            <Card key={key}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{SETTING_LABELS[key]}</p>
                  <p className="text-xs text-ink-faint">{SETTING_HINTS[key]}</p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update(key, opt.value)}
                      className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                        response.difficultiesPresent === opt.value
                          ? 'bg-verdigris-600 border-verdigris-600 text-paper-panel'
                          : 'border-ink/15 text-ink-soft hover:border-verdigris-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
