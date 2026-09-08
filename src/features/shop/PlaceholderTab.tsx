import { AppShell } from '@/components/layout/AppShell';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

/** Stand-in for the app's other tabs so the Shop tab sits in a real shell. */
export function PlaceholderTab({ title }: { title: string }) {
  return (
    <AppShell>
      <ScreenHeader title={title} />
      <div className="flex flex-col items-center gap-2 px-8 py-24 text-center">
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className="max-w-[260px] text-sm text-muted">
          Outside the scope of this assignment. Head to Shop to see the marketplace.
        </p>
      </div>
    </AppShell>
  );
}
