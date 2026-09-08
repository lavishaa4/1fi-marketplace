import { Navigate, useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { useCheckout } from '@/context/CheckoutContext';
import { formatCurrency, formatDate } from '@/lib/format';

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { order, reset } = useCheckout();

  if (!order) return <Navigate to="/shop/marketplace" replace />;

  const backToMarketplace = () => {
    reset();
    navigate('/shop/marketplace');
  };

  return (
    <AppShell
      footer={
        <Button fullWidth onClick={backToMarketplace}>
          Back to marketplace
        </Button>
      }
    >
      <div className="px-5 pb-6 pt-10">
        <span
          aria-hidden
          className="flex h-14 w-14 items-center justify-center rounded-full bg-successSoft text-2xl text-success"
        >
          ✓
        </span>
        <h1 className="mt-4 text-[22px] font-semibold text-ink">Plan confirmed</h1>
        <p className="mt-1 text-[14px] text-muted">
          {order.productName} · {order.variantLabel}
        </p>

        <div className="card mt-6 p-4">
          <p className="text-[13px] text-muted">Your EMI</p>
          <p className="mt-1 text-[24px] font-semibold text-ink">
            {formatCurrency(order.monthlyEmi)}
            <span className="text-[14px] font-normal text-muted"> × {order.tenureMonths} months</span>
          </p>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-[14px]">
            <div className="flex justify-between">
              <span className="text-muted">Order ID</span>
              <span className="text-ink">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Total payable</span>
              <span className="text-ink">{formatCurrency(order.totalPayable)}</span>
            </div>
            {order.cashback > 0 && (
              <div className="flex justify-between">
                <span className="text-muted">Cashback credited</span>
                <span className="text-success">{formatCurrency(order.cashback)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted">First EMI</span>
              <span className="text-ink">{formatDate(order.firstEmiDate)}</span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-[13px] leading-relaxed text-muted">
          Next step in the live app: pledge your units via CAMS, KFin or MFCentral. You will get an
          OTP to authorise the lien.
        </p>
      </div>
    </AppShell>
  );
}
