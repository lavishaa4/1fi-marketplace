import type { ReactNode } from 'react';

type Tone = 'brand' | 'success' | 'neutral';

const tones: Record<Tone, string> = {
  brand: 'bg-brand-soft text-brand',
  success: 'bg-successSoft text-success',
  neutral: 'bg-surface text-muted',
};

export function Badge({ tone = 'brand', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
