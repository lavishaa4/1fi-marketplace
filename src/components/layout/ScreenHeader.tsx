import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: ReactNode;
}

/** Matches the app's "Pay using 1Fi" header: chevron, bold title, no chrome. */
export function ScreenHeader({ title, subtitle, onBack, action }: ScreenHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4">
        {onBack !== undefined && (
          <button
            onClick={onBack ?? (() => navigate(-1))}
            aria-label="Go back"
            className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-white"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[19px] font-bold tracking-tight text-ink">{title}</h1>
          {subtitle && <p className="truncate text-[13px] text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}
