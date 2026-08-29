import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import type { ImpairmentData } from '../../types/assessment';
import { IMPAIRMENT_AREA_LABELS, IMPAIRMENT_AREA_ORDER } from '../../data/questions';
import { Card, CardEyebrow } from '../ui/Card';

export function ImpairmentChart({ impairment }: { impairment: ImpairmentData }) {
  const data = IMPAIRMENT_AREA_ORDER.filter((a) => a !== 'other').map((area) => {
    const rating = impairment.ratings.find((r) => r.area === area);
    return { area: IMPAIRMENT_AREA_LABELS[area], value: rating?.rating ?? 0 };
  });

  return (
    <Card>
      <CardEyebrow>Functional impact</CardEyebrow>
      <h3 className="font-display text-lg text-ink mb-1">Impairment by life area</h3>
      <p className="text-xs text-ink-faint mb-4">0 (none) to 4 (severe) interference, self-rated.</p>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="rgba(24,42,46,0.12)" />
          <PolarAngleAxis dataKey="area" tick={{ fontSize: 11, fill: '#3B4E52' }} />
          <PolarRadiusAxis domain={[0, 4]} tick={{ fontSize: 10, fill: '#6B7B7E' }} axisLine={false} />
          <Tooltip contentStyle={{ background: '#FBFAF7', border: '1px solid rgba(24,42,46,0.12)', borderRadius: 6, fontSize: 12 }} />
          <Radar dataKey="value" stroke="#A15641" fill="#C98470" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}
