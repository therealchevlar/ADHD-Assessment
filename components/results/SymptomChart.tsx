import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { Card, CardEyebrow } from '../ui/Card';

interface SymptomChartProps {
  inattentionCount: number;
  hyperactivityCount: number;
  threshold: number;
}

export function SymptomChart({ inattentionCount, hyperactivityCount, threshold }: SymptomChartProps) {
  const data = [
    { name: 'Inattention', value: inattentionCount },
    { name: 'Hyperactivity/\nImpulsivity', value: hyperactivityCount },
  ];

  return (
    <Card>
      <CardEyebrow>Symptom profile</CardEyebrow>
      <h3 className="font-display text-lg text-ink mb-1">Criterion-level symptom counts</h3>
      <p className="text-xs text-ink-faint mb-4">
        Items rated "Often" or "Very often," out of 9 possible per domain. Dashed line marks the age-adjusted threshold ({threshold}).
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(24,42,46,0.08)" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#3B4E52' }} axisLine={{ stroke: 'rgba(24,42,46,0.15)' }} tickLine={false} />
          <YAxis domain={[0, 9]} tick={{ fontSize: 12, fill: '#3B4E52' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#FBFAF7', border: '1px solid rgba(24,42,46,0.12)', borderRadius: 6, fontSize: 12 }}
            formatter={(v) => [`${v ?? 0} of 9 items`, 'Symptom count']}
          />
          <ReferenceLine y={threshold} stroke="#B5762F" strokeDasharray="4 4" />
          <Bar dataKey="value" fill="#3E6B64" radius={[3, 3, 0, 0]} maxBarSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
