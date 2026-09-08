import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/ui/ProductImage';
import { discountPercent, formatCurrency, formatEmi } from '@/lib/format';
import type { ProductSummary } from '@/types/marketplace';

export function ProductCard({ product }: { product: ProductSummary }) {
  const discount = discountPercent(product.price, product.mrp);

  return (
    <Link
      to={`/shop/marketplace/${product.id}`}
      className="card flex gap-4 p-4 transition-colors hover:border-brand-border"
    >
      <ProductImage src={product.imageUrl} alt={product.name} className="h-[92px] w-[76px] shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-muted">{product.brand}</p>
        <p className="truncate text-[16px] font-bold text-ink">{product.name}</p>
        <p className="mt-0.5 text-[12px] text-muted">
          {product.rating} ★ · {product.reviewCount} ratings · {product.variantCount} variants
        </p>
        <p className="mt-2 text-[15px] font-semibold text-ink">
          {formatCurrency(product.price)}
          {discount > 0 && (
            <>
              <span className="ml-2 text-[13px] font-normal text-muted line-through">
                {formatCurrency(product.mrp)}
              </span>
              <span className="ml-2 text-[13px] font-semibold text-success">{discount}% off</span>
            </>
          )}
        </p>
        <p className="mt-1 text-[13px] text-brand">EMI from {formatEmi(product.startingEmi)}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.hasNoCostOption && <Badge>0% interest up to 12 months</Badge>}
          {product.maxCashback > 0 && (
            <Badge tone="success">Up to {formatCurrency(product.maxCashback)} cashback</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
