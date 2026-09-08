export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-[#F0EEF6] ${className}`} aria-hidden />;
}

export function ProductCardSkeleton() {
  return (
    <div className="card flex gap-4 p-4">
      <Skeleton className="h-[86px] w-[74px] shrink-0" />
      <div className="flex flex-1 flex-col gap-2 py-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-28" />
      </div>
    </div>
  );
}

export function PlanSkeleton() {
  return (
    <div className="card flex items-center justify-between p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
  );
}
