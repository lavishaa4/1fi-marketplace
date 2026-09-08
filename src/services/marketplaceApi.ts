import { calculateEmi, firstEmiDate, totalInterest, totalPayable } from '@/lib/emi';
import type {
  EmiPlan,
  EmiPlansResponse,
  Order,
  Product,
  ProductCategory,
  ProductSummary,
} from '@/types/marketplace';
import { CATALOG } from './data/catalog';
import {
  AVAILABLE_LIMIT,
  cashbackShare,
  NO_COST_MAX_TENURE,
  PROCESSING_FEE,
  TENURES,
} from './data/emiConfig';
import { ApiError, request } from './http';

const round = (value: number) => Math.round(value);

function buildPlans(product: Product, principal: number): EmiPlan[] {
  return TENURES.map(({ tenureMonths, interestRate, note }) => {
    const isNoCost = tenureMonths <= NO_COST_MAX_TENURE;
    const rate = isNoCost ? 0 : interestRate;
    const emi = calculateEmi(principal, rate, tenureMonths);
    const cashback = round(product.maxCashback * cashbackShare(tenureMonths));

    return {
      id: `${product.id}-${tenureMonths}m`,
      tenureMonths,
      interestRate: rate,
      isNoCost,
      monthlyEmi: round(emi),
      totalPayable: round(totalPayable(emi, tenureMonths)),
      totalInterest: round(totalInterest(principal, emi, tenureMonths)),
      processingFee: PROCESSING_FEE,
      downPayment: 0,
      cashback,
      recommended: tenureMonths === NO_COST_MAX_TENURE,
      note,
    };
  });
}

function toSummary(product: Product): ProductSummary {
  const defaultVariant =
    product.variants.find((variant) => variant.id === product.defaultVariantId) ??
    product.variants[0];
  const plans = buildPlans(product, defaultVariant.price);
  const startingEmi = Math.min(...plans.map((plan) => plan.monthlyEmi));

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    imageUrl: defaultVariant.imageUrl,
    price: defaultVariant.price,
    mrp: defaultVariant.mrp,
    rating: product.rating,
    reviewCount: product.reviewCount,
    variantCount: product.variants.length,
    maxCashback: product.maxCashback,
    startingEmi,
    hasNoCostOption: plans.some((plan) => plan.isNoCost),
  };
}

export interface ProductQuery {
  category?: ProductCategory | 'all';
  search?: string;
}

export function getProducts(
  query: ProductQuery = {},
  signal?: AbortSignal,
): Promise<ProductSummary[]> {
  return request(
    'products',
    () => {
      const search = query.search?.trim().toLowerCase();
      return CATALOG.filter((product) => {
        const matchesCategory =
          !query.category || query.category === 'all' || product.category === query.category;
        const matchesSearch =
          !search ||
          product.name.toLowerCase().includes(search) ||
          product.brand.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
      }).map(toSummary);
    },
    { signal, failureMessage: 'We could not load the marketplace catalogue.' },
  );
}

export function getProduct(productId: string, signal?: AbortSignal): Promise<Product> {
  return request(
    'product',
    () => {
      const product = CATALOG.find((item) => item.id === productId);
      if (!product) throw new ApiError('This product is no longer available.', 404, 'product');
      return product;
    },
    { signal, failureMessage: 'We could not load this product.' },
  );
}

export function getEmiPlans(
  productId: string,
  variantId: string,
  signal?: AbortSignal,
): Promise<EmiPlansResponse> {
  return request(
    'emi',
    () => {
      const product = CATALOG.find((item) => item.id === productId);
      const variant = product?.variants.find((item) => item.id === variantId);
      if (!product || !variant) {
        throw new ApiError('This variant is no longer available.', 404, 'emi');
      }
      return {
        productId,
        variantId,
        principal: variant.price,
        availableLimit: AVAILABLE_LIMIT,
        plans: buildPlans(product, variant.price),
      };
    },
    { signal, failureMessage: 'We could not fetch EMI plans right now.' },
  );
}

export interface CreateOrderInput {
  productId: string;
  variantId: string;
  planId: string;
}

export function createOrder(input: CreateOrderInput, signal?: AbortSignal): Promise<Order> {
  return request(
    'order',
    () => {
      const product = CATALOG.find((item) => item.id === input.productId);
      const variant = product?.variants.find((item) => item.id === input.variantId);
      if (!product || !variant) {
        throw new ApiError('This product is no longer available.', 404, 'order');
      }
      const plan = buildPlans(product, variant.price).find((item) => item.id === input.planId);
      if (!plan) throw new ApiError('This EMI plan has expired. Pick another one.', 409, 'order');

      return {
        id: `1FI${Date.now().toString().slice(-8)}`,
        productName: product.name,
        variantLabel: `${variant.storage} · ${variant.colour}`,
        monthlyEmi: plan.monthlyEmi,
        tenureMonths: plan.tenureMonths,
        totalPayable: plan.totalPayable,
        cashback: plan.cashback,
        createdAt: new Date().toISOString(),
        firstEmiDate: firstEmiDate().toISOString(),
      };
    },
    { signal, failureMessage: 'We could not confirm your plan. Please try again.' },
  );
}
