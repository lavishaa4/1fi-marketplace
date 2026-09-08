/**
 * EMI maths for mutual-fund backed loans.
 * Kept free of React/UI so it can be unit tested and reused by a real backend.
 */

/** Standard reducing-balance EMI. Returns principal/months when rate is 0. */
export function calculateEmi(principal: number, annualRatePercent: number, months: number): number {
  if (months <= 0) throw new Error('Tenure must be at least one month');
  if (annualRatePercent <= 0) return principal / months;
  const r = annualRatePercent / 12 / 100;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export function totalPayable(emi: number, months: number): number {
  return emi * months;
}

export function totalInterest(principal: number, emi: number, months: number): number {
  return Math.max(0, totalPayable(emi, months) - principal);
}

/** First EMI is billed on the 5th of the month following the purchase. */
export function firstEmiDate(from = new Date()): Date {
  return new Date(from.getFullYear(), from.getMonth() + 1, 5);
}
