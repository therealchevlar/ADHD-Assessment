import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

export function QuestionCard({ index, title, children }: { index?: string; title: string; children: ReactNode }) {
  return (
    <Card className="animate-fade-up">
      <div className="flex gap-3 items-start">
        {index && (
          <span className="font-mono-label text-xs text-verdigris-500 mt-1 shrink-0 w-5">{index}</span>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-medium text-ink mb-3">{title}</h3>
          {children}
        </div>
      </div>
    </Card>
  );
}
