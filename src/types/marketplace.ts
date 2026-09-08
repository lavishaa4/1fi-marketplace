export type ProductCategory = 'smartphone' | 'laptop' | 'audio' | 'wearable';

export interface VariantOption {
  /** e.g. "Storage" / "Colour" */
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  /** Short label used on the chip, e.g. "256 GB" */
  storage: string;
  colour: string;
  colourHex: string;
  /** Selling price in paise-free rupees */
  price: number;
  mrp: number;
  imageUrl: string;
  inStock: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  tagline: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  specs: ProductSpec[];
  deliveryEstimate: string;
  warranty: string;
  /** Max instant cashback across plans, used for the listing badge */
  maxCashback: number;
  variants: ProductVariant[];
  defaultVariantId: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  variantCount: number;
  maxCashback: number;
  /** Lowest EMI across all available tenures, precomputed by the API */
  startingEmi: number;
  hasNoCostOption: boolean;
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  /** Annual interest rate, 0 for no-cost plans */
  interestRate: number;
  isNoCost: boolean;
  monthlyEmi: number;
  totalPayable: number;
  totalInterest: number;
  processingFee: number;
  downPayment: number;
  cashback: number;
  /** One plan per product is flagged as the 1Fi recommendation */
  recommended: boolean;
  /** Copy shown under the tenure, e.g. "Most popular" */
  note?: string;
}

export interface EmiPlansResponse {
  productId: string;
  variantId: string;
  principal: number;
  /** User's available mutual-fund backed limit, drives affordability messaging */
  availableLimit: number;
  plans: EmiPlan[];
}

export interface Order {
  id: string;
  productName: string;
  variantLabel: string;
  monthlyEmi: number;
  tenureMonths: number;
  totalPayable: number;
  cashback: number;
  createdAt: string;
  firstEmiDate: string;
}
