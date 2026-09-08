import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Could not load this', message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="card flex flex-col items-center gap-3 px-6 py-8 text-center"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FDEDEC] text-xl">
        !
      </span>
      <div>
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-muted">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="mt-1">
          Try again
        </Button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  message: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <p className="text-[15px] font-semibold text-ink">{title}</p>
      <p className="max-w-[280px] text-sm text-muted">{message}</p>
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
