import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

interface EducationalCardProps {
  title: string;
  children: ReactNode;
}

export function EducationalCard({ title, children }: EducationalCardProps) {
  return (
    <Card className="h-full">
      <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
      <div className="text-sm text-ink-soft leading-relaxed">{children}</div>
    </Card>
  );
}
