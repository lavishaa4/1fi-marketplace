import { useCallback, useMemo, useState } from 'react';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState, ErrorState } from '@/components/ui/StateViews';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { formatCurrency } from '@/lib/format';
import { AVAILABLE_LIMIT } from '@/services/data/emiConfig';
import { getProducts } from '@/services/marketplaceApi';
import { CategoryFilter, type CategoryValue } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { SearchField } from './components/SearchField';

/** The 1Fi Marketplace panel of the Shop page. */
export function MarketplaceSection() {
  const [category, setCategory] = useState<CategoryValue>('all');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);

  const fetcher = useCallback(
    (signal: AbortSignal) => getProducts({ category, search: debouncedSearch }, signal),
    [category, debouncedSearch],
  );

  const { data, error, isLoading, retry } = useApiQuery(fetcher, [category, debouncedSearch]);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) return <ErrorState message={error.message} onRetry={retry} />;

    if (!data?.length) {
      return (
        <EmptyState
          title="No products match this search"
          message="Try another brand, or clear the filters to see everything on the marketplace."
          action={{
            label: 'Clear filters',
            onClick: () => {
              setSearch('');
              setCategory('all');
            },
          }}
        />
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }, [data, error, isLoading, retry]);

  return (
    <div className="px-4 pt-4">
      <SearchField
        value={search}
        onChange={setSearch}
        placeholder="Search phones, laptops, brands..."
      />

      <div className="mt-4">
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <h2 className="text-[20px] font-extrabold tracking-tight text-ink">1Fi Marketplace</h2>
        <span className="text-[12px] font-medium text-muted">
          Limit {formatCurrency(AVAILABLE_LIMIT)}
        </span>
      </div>
      <p className="mt-1 text-[13px] text-muted">
        Buy on no-cost EMIs while your mutual funds stay invested.
      </p>

      <div className="mt-4">{content}</div>
    </div>
  );
}
