import { useAssessment } from '../../state/AssessmentContext';

export function StudentModeToggle() {
  const { state, update } = useAssessment();
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <span className="text-xs font-mono-label uppercase text-ink-faint">Student Mode</span>
      <span
        role="switch"
        aria-checked={state.studentMode}
        tabIndex={0}
        onClick={() => update({ studentMode: !state.studentMode })}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            update({ studentMode: !state.studentMode });
          }
        }}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
          state.studentMode ? 'bg-verdigris-600' : 'bg-ink/20'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            state.studentMode ? 'translate-x-4.5' : 'translate-x-1'
          }`}
          style={{ transform: state.studentMode ? 'translateX(18px)' : 'translateX(3px)' }}
        />
      </span>
    </label>
  );
}
