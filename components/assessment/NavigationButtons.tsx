import { Button } from '../ui/Button';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  helperText?: string;
}

export function NavigationButtons({
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Continue',
  nextDisabled = false,
  helperText,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 pt-6 rule flex items-center justify-between gap-4">
      <div>
        {onBack ? (
          <Button variant="outline" onClick={onBack} type="button">
            {backLabel}
          </Button>
        ) : (
          <span />
        )}
      </div>
      <div className="flex flex-col items-end gap-1">
        {helperText && <span className="text-xs text-ink-faint">{helperText}</span>}
        <Button variant="primary" onClick={onNext} disabled={nextDisabled} type="button">
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
