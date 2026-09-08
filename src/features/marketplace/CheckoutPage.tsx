import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/ui/ProductImage';
import { ErrorState } from '@/components/ui/StateViews';
import { useCheckout } from '@/context/CheckoutContext';
import { firstEmiDate } from '@/lib/emi';
import { formatCurrency, formatDate } from '@/lib/format';
import { createOrder } from '@/services/marketplaceApi';

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 text-[14px]">
      <span className="text-muted">{label}</span>
      <span className={strong ? 'font-semibold text-ink' : 'text-ink'}>{value}</span>
    </div>
  );
}

export function CheckoutPage() {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { selection, completeOrder } = useCheckout();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Deep-linking into checkout without a plan sends the user back to the product.
  if (!selection) {
    return <Navigate to={`/shop/marketplace/${productId}`} replace />;
  }

  const { product, variant, plan } = selection;

  const confirm = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const order = await createOrder({
        productId: product.id,
        variantId: variant.id,
        planId: plan.id,
      });
      completeOrder(order);
      navigate(`/shop/marketplace/orders/${order.id}`, { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell
      footer={
        <Button fullWidth withArrow onClick={confirm} isLoading={isSubmitting}>
          {isSubmitting ? 'Confirming' : `Confirm ${formatCurrency(plan.monthlyEmi)}/mo plan`}
        </Button>
      }
    >
      <ScreenHeader
        title="Review your plan"
        onBack={() => navigate(`/shop/marketplace/${product.id}`)}
      />

      <div className="px-4 py-5">
        <div className="card flex gap-4 p-4">
          <ProductImage
            src={variant.imageUrl}
            alt={product.name}
            className="h-[80px] w-[68px] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[12px] text-muted">{product.brand}</p>
            <p className="text-[15px] font-semibold text-ink">{product.name}</p>
            <p className="mt-0.5 text-[13px] text-muted">
              {variant.storage} · {variant.colour}
            </p>
            <p className="mt-1.5 text-[15px] font-semibold text-ink">
              {formatCurrency(variant.price)}
            </p>
          </div>
        </div>

        <section className="card mt-4 px-4 py-2">
          <Row label="Monthly EMI" value={`${formatCurrency(plan.monthlyEmi)}/mo`} strong />
          <Row label="Tenure" value={`${plan.tenureMonths} months`} />
          <Row
            label="Interest"
            value={plan.isNoCost ? 'No interest (0%)' : `${plan.interestRate}% p.a.`}
          />
          <Row label="Down payment" value={formatCurrency(plan.downPayment)} />
          <Row label="Processing fee" value={formatCurrency(plan.processingFee)} />
          {plan.cashback > 0 && (
            <Row label="Instant cashback" value={`− ${formatCurrency(plan.cashback)}`} />
          )}
          <div className="border-t border-line">
            <Row label="Total payable" value={formatCurrency(plan.totalPayable)} strong />
          </div>
        </section>

        <section className="card mt-4 p-4">
          <p className="text-[14px] font-semibold text-ink">What happens next</p>
          <ol className="mt-3 flex flex-col gap-2.5 text-[13px] text-muted">
            <li>Units worth the loan amount are pledged via CAMS, KFin or MFCentral.</li>
            <li>Your lending partner approves and pays the merchant directly.</li>
            <li>
              First EMI is debited on {formatDate(firstEmiDate().toISOString())}, then monthly on
              the same date.
            </li>
          </ol>
        </section>

        {error && (
          <div className="mt-4">
            <ErrorState title="Plan not confirmed" message={error} onRetry={confirm} />
          </div>
        )}

        <p className="mt-4 px-1 text-[12px] leading-relaxed text-muted">
          Loans are issued by 1Fi's RBI-regulated lending partner. Your mutual fund units stay
          invested and continue earning returns while pledged.
        </p>
      </div>
    </AppShell>
  );
}
