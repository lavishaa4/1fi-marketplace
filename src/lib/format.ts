const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const inrCompact = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => inr.format(Math.round(value));

export const formatNumber = (value: number) => inrCompact.format(Math.round(value));

export const formatEmi = (value: number) => `${formatCurrency(value)}/mo`;

export const discountPercent = (price: number, mrp: number) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
