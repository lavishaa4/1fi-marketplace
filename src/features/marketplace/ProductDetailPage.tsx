import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/ui/ProductImage';
import { Sheet } from '@/components/ui/Sheet';
import { PlanSkeleton, Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/StateViews';
import { useCheckout } from '@/context/CheckoutContext';
import { useApiQuery } from '@/hooks/useApiQuery';
import { discountPercent, formatCurrency } from '@/lib/format';
import { getEmiPlans, getProduct } from '@/services/marketplaceApi';
import type { EmiPlan, ProductVariant } from '@/types/marketplace';
import { EmiPlanList } from './components/EmiPlanList';
import { VariantSelector } from './components/VariantSelector';

const PLANS_ON_PAGE = 3;

export function ProductDetailPage() {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { selectPlan } = useCheckout();

  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [allPlansOpen, setAllPlansOpen] = useState(false);

  const productFetcher = useCallback(
    (signal: AbortSignal) => getProduct(productId, signal),
    [productId],
  );
  const product = useApiQuery(productFetcher, [productId]);

  // Reset the variant whenever a different product loads.
  useEffect(() => {
    if (!product.data) return;
    const preferred =
      product.data.variants.find((item) => item.id === product.data!.defaultVariantId) ??
      product.data.variants[0];
    setVariant(preferred);
  }, [product.data]);

  const plansFetcher = useCallback(
    (signal: AbortSignal) => getEmiPlans(productId, variant!.id, signal),
    [productId, variant],
  );
  const plans = useApiQuery(plansFetcher, [productId, variant?.id], { enabled: Boolean(variant) });

  // Default to the plan 1Fi recommends each time the variant changes.
  useEffect(() => {
    if (!plans.data) return;
    const recommended = plans.data.plans.find((plan) => plan.recommended) ?? plans.data.plans[0];
    setSelectedPlanId(recommended.id);
  }, [plans.data]);

  const selectedPlan = useMemo(
    () => plans.data?.plans.find((plan) => plan.id === selectedPlanId) ?? null,
    [plans.data, selectedPlanId],
  );

  const handleContinue = () => {
    if (!product.data || !variant || !selectedPlan) return;
    selectPlan({ product: product.data, variant, plan: selectedPlan });
    navigate(`/shop/marketplace/${productId}/checkout`);
  };

  const handleSelectPlan = (plan: EmiPlan) => {
    setSelectedPlanId(plan.id);
    setAllPlansOpen(false);
  };

  if (product.error) {
    return (
      <AppShell>
        <ScreenHeader title="Product" onBack={() => navigate('/shop/marketplace')} />
        <div className="px-4 py-6">
          <ErrorState message={product.error.message} onRetry={product.retry} />
        </div>
      </AppShell>
    );
  }

  if (product.isLoading || !product.data || !variant) {
    return (
      <AppShell>
        <ScreenHeader title="Loading" onBack={() => navigate('/shop/marketplace')} />
        <div className="flex flex-col gap-4 px-4 py-5">
          <Skeleton className="h-[220px] w-full" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
          <PlanSkeleton />
          <PlanSkeleton />
        </div>
      </AppShell>
    );
  }

  const item = product.data;
  const discount = discountPercent(variant.price, variant.mrp);
  const limit = plans.data?.availableLimit;
  const overLimit = limit !== undefined && variant.price > limit;

  return (
    <AppShell
      footer={
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            {selectedPlan ? (
              <>
                <p className="truncate text-[15px] font-semibold text-ink">
                  {formatCurrency(selectedPlan.monthlyEmi)}/mo
                  <span className="font-normal text-muted"> · {selectedPlan.tenureMonths} months</span>
                </p>
                <p className="truncate text-[12px] text-muted">
                  {selectedPlan.isNoCost ? 'No interest, no processing fee' : `${selectedPlan.interestRate}% p.a.`}
                </p>
              </>
            ) : (
              <p className="text-[13px] text-muted">Select an EMI plan to continue</p>
            )}
          </div>
          <Button
            onClick={handleContinue}
            disabled={!selectedPlan || !variant.inStock || overLimit}
            withArrow={variant.inStock}
            className="px-7"
          >
            {variant.inStock ? 'Continue' : 'Out of stock'}
          </Button>
        </div>
      }
    >
      <ScreenHeader
        title={item.name}
        subtitle={item.brand}
        onBack={() => navigate('/shop/marketplace')}
      />

      <div className="px-4 pt-5">
        <ProductImage
          src={variant.imageUrl}
          alt={`${item.name} in ${variant.colour}`}
          className="h-[240px] w-full bg-white"
        />

        <div className="pt-5">
          <p className="text-[13px] text-muted">{item.tagline}</p>
          <h2 className="mt-1 text-[20px] font-semibold text-ink">{item.name}</h2>
          <p className="mt-1 text-[13px] text-muted">
            {item.rating} ★ · {item.reviewCount} ratings
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[22px] font-semibold text-ink">{formatCurrency(variant.price)}</span>
            {discount > 0 && (
              <>
                <span className="text-[14px] text-muted line-through">
                  {formatCurrency(variant.mrp)}
                </span>
                <span className="text-[14px] font-semibold text-success">{discount}% off</span>
              </>
            )}
          </div>
          {!variant.inStock && (
            <p className="mt-2 text-[13px] font-medium text-[#B4241C]">
              This combination is out of stock. Pick another storage or colour.
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-line pt-5">
          <VariantSelector variants={item.variants} selected={variant} onSelect={setVariant} />
        </div>

        <section className="mt-6 border-t border-line pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-ink">EMI plans</h3>
            {plans.data && plans.data.plans.length > PLANS_ON_PAGE && (
              <button
                onClick={() => setAllPlansOpen(true)}
                className="text-[13px] font-semibold text-brand"
              >
                View all {plans.data.plans.length}
              </button>
            )}
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Your mutual funds stay invested. Units are pledged, never sold.
          </p>

          <div className="mt-4">
            {plans.isLoading && (
              <div className="flex flex-col gap-2.5">
                <PlanSkeleton />
                <PlanSkeleton />
                <PlanSkeleton />
              </div>
            )}

            {plans.error && <ErrorState message={plans.error.message} onRetry={plans.retry} />}

            {plans.data && (
              <EmiPlanList
                plans={plans.data.plans.slice(0, PLANS_ON_PAGE)}
                selectedPlanId={selectedPlanId}
                onSelect={handleSelectPlan}
              />
            )}
          </div>

          {limit !== undefined && (
            <p
              className={`mt-3 text-[13px] ${overLimit ? 'font-medium text-[#B4241C]' : 'text-muted'}`}
            >
              {overLimit
                ? `This purchase is above your ${formatCurrency(limit)} limit. Pledge more units to continue.`
                : `Available purchase limit: ${formatCurrency(limit)}`}
            </p>
          )}
        </section>

        <section className="mt-6 border-t border-line pt-5">
          <h3 className="text-[16px] font-semibold text-ink">Highlights</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2 text-[14px] text-ink">
                <span aria-hidden className="text-brand">
                  •
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 border-t border-line pt-5">
          <h3 className="text-[16px] font-semibold text-ink">Specifications</h3>
          <dl className="mt-3 flex flex-col gap-2.5">
            {item.specs.map((spec) => (
              <div key={spec.label} className="flex gap-4 text-[14px]">
                <dt className="w-[104px] shrink-0 text-muted">{spec.label}</dt>
                <dd className="flex-1 text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-6 border-t border-line pb-6 pt-5">
          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">{item.deliveryEstimate}</Badge>
            <Badge tone="neutral">{item.warranty}</Badge>
            <Badge tone="neutral">Zero foreclosure charges</Badge>
          </div>
        </section>
      </div>

      <Sheet open={allPlansOpen} title="All EMI plans" onClose={() => setAllPlansOpen(false)}>
        {plans.data && (
          <div className="pb-4">
            <p className="pb-4 text-[13px] text-muted">
              On {formatCurrency(plans.data.principal)} · {variant.storage} · {variant.colour}
            </p>
            <EmiPlanList
              plans={plans.data.plans}
              selectedPlanId={selectedPlanId}
              onSelect={handleSelectPlan}
            />
          </div>
        )}
      </Sheet>
    </AppShell>
  );
}
