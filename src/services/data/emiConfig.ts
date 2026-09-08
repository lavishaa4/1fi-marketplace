/** Tenure ladder offered by 1Fi, with the rate applied on non no-cost plans. */
export interface TenureConfig {
  tenureMonths: number;
  /** Annual rate applied when the tenure is not eligible for a no-cost plan */
  interestRate: number;
  note?: string;
}

export const TENURES: TenureConfig[] = [
  { tenureMonths: 3, interestRate: 0 },
  { tenureMonths: 6, interestRate: 0, note: 'Lowest total outgo' },
  { tenureMonths: 9, interestRate: 0 },
  { tenureMonths: 12, interestRate: 0, note: 'Most popular' },
  { tenureMonths: 18, interestRate: 10.5 },
  { tenureMonths: 24, interestRate: 10.5, note: 'Lowest monthly EMI on no-cost cap' },
  { tenureMonths: 36, interestRate: 11.5 },
  { tenureMonths: 48, interestRate: 12 },
  { tenureMonths: 60, interestRate: 12.5, note: 'Smallest monthly outgo' },
];

/** Tenures up to this length are offered at 0% interest. */
export const NO_COST_MAX_TENURE = 12;

/** 1Fi does not levy a processing fee; kept configurable for future partners. */
export const PROCESSING_FEE = 0;

/** Mutual-fund backed purchase limit of the signed-in demo user. */
export const AVAILABLE_LIMIT = 250000;

/** Instant cashback share by tenure, applied to the product's max cashback. */
export function cashbackShare(tenureMonths: number): number {
  if (tenureMonths <= 3) return 0.5;
  if (tenureMonths <= 12) return 1;
  return 0;
}
