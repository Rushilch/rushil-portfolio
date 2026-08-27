export const INSURANCE_RATE_PER_DAY = 15;
export const TAX_RATE = 0.08;

export interface RentalCostInput {
  dailyRate: number;
  days: number;
  includeInsurance: boolean;
}

export interface RentalCostBreakdown {
  subtotal: number;
  insuranceTotal: number;
  tax: number;
  grandTotal: number;
}

export function computeRentalCost({
  dailyRate,
  days,
  includeInsurance,
}: RentalCostInput): RentalCostBreakdown {
  const safeDays = Math.max(0, days);
  const subtotal = dailyRate * safeDays;
  const insuranceTotal = includeInsurance ? INSURANCE_RATE_PER_DAY * safeDays : 0;
  const tax = Math.round((subtotal + insuranceTotal) * TAX_RATE);
  const grandTotal = subtotal + insuranceTotal + tax;

  return {
    subtotal,
    insuranceTotal,
    tax,
    grandTotal,
  };
}
