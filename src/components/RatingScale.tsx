import type { Rating } from '../types';

type Props = { value: Rating; onChange: (value: Rating) => void; labels?: string[] };

export function RatingScale({ value, onChange, labels = ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] }: Props) {
  return (
    <div className="scale" role="radiogroup">
      {labels.map((label, n) => (
        <label key={label} className={value === n ? 'checked' : ''}>
          <input type="radio" checked={value === n} onChange={() => onChange(n as Rating)} />
          {label}
        </label>
      ))}
    </div>
  );
}
