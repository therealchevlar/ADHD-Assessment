import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { ExecutiveFunctionData } from '../../types/assessment';
import { EXECUTIVE_FUNCTION_DOMAINS } from '../../data/questions';
import { Card, CardEyebrow } from '../ui/Card';

export function ExecutiveFunctionChart({ data }: { data: ExecutiveFunctionData }) {
  const chartData = EXECUTIVE_FUNCTION_DOMAINS.map((d) => ({
    name: d.label,
    value: data.ratings.find((r) => r.domain === d.id)?.rating ?? 0,
  }));

  return (
    <Card>
      <CardEyebrow>Optional profile \u2014 application-generated</CardEyebrow>
      <h3 className="font-display text-lg text-ink mb-1">Executive function</h3>
      <p className="text-xs text-ink-faint mb-4">Not a standalone diagnostic measure. 0 (no difficulty) to 4 (severe).</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(24,42,46,0.08)" horizontal={false} />
          <XAxis type="number" domain={[0, 4]} tick={{ fontSize: 11, fill: '#3B4E52' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: '#3B4E52' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#FBFAF7', border: '1px solid rgba(24,42,46,0.12)', borderRadius: 6, fontSize: 12 }} />
          <Bar dataKey="value" fill="#5C8F84" radius={[0, 3, 3, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
