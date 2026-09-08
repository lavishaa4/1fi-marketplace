import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { EmiPlan, Order, Product, ProductVariant } from '@/types/marketplace';

export interface CheckoutSelection {
  product: Product;
  variant: ProductVariant;
  plan: EmiPlan;
}

interface CheckoutContextValue {
  selection: CheckoutSelection | null;
  order: Order | null;
  selectPlan: (selection: CheckoutSelection) => void;
  completeOrder: (order: Order) => void;
  reset: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<CheckoutSelection | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const selectPlan = useCallback((next: CheckoutSelection) => {
    setSelection(next);
    setOrder(null);
  }, []);

  const completeOrder = useCallback((next: Order) => setOrder(next), []);

  const reset = useCallback(() => {
    setSelection(null);
    setOrder(null);
  }, []);

  const value = useMemo(
    () => ({ selection, order, selectPlan, completeOrder, reset }),
    [selection, order, selectPlan, completeOrder, reset],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error('useCheckout must be used inside CheckoutProvider');
  return context;
}
