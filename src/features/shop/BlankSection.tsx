/**
 * Top Brands and Nearby Stores are out of scope for this assignment: the tabs
 * work and keep the Shop shell intact, the panels stay empty by design.
 */
export function BlankSection({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-8 py-24 text-center">
      <p className="text-[15px] font-bold text-ink">{title}</p>
      <p className="max-w-[260px] text-[13px] text-muted">
        Not part of this assignment. Open 1Fi Marketplace to see the implemented section.
      </p>
    </div>
  );
}
