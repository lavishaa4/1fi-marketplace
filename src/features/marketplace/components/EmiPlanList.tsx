import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/format';
import type { EmiPlan } from '@/types/marketplace';

interface EmiPlanListProps {
  plans: EmiPlan[];
  selectedPlanId: string | null;
  onSelect: (plan: EmiPlan) => void;
}

export function EmiPlanList({ plans, selectedPlanId, onSelect }: EmiPlanListProps) {
  return (
    <ul className="flex flex-col gap-2.5" role="radiogroup" aria-label="EMI plans">
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        return (
          <li key={plan.id}>
            <button
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(plan)}
              className={`w-full rounded-xl2 border p-4 text-left transition-colors ${
                isSelected ? 'border-brand bg-brand-soft' : 'border-line bg-white hover:border-brand-border'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-ink">
                    {formatCurrency(plan.monthlyEmi)}
                    <span className="text-[13px] font-normal text-muted"> × {plan.tenureMonths} months</span>
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {plan.isNoCost
                      ? 'No interest · you repay only the price'
                      : `${plan.interestRate}% p.a. · ${formatCurrency(plan.totalInterest)} interest`}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {plan.isNoCost && <Badge>0% interest</Badge>}
                    {plan.cashback > 0 && (
                      <Badge tone="success">{formatCurrency(plan.cashback)} cashback</Badge>
                    )}
                    {plan.recommended && <Badge tone="neutral">Recommended</Badge>}
                    {plan.note && !plan.recommended && <Badge tone="neutral">{plan.note}</Badge>}
                  </div>
                </div>
                <span
                  aria-hidden
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-brand' : 'border-line'
                  }`}
                >
                  {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
                </span>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
