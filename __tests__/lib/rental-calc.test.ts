import { describe, it, expect } from "vitest";
import {
  computeRentalCost,
  INSURANCE_RATE_PER_DAY,
  TAX_RATE,
} from "@/lib/rental-calc";

describe("Car Rental OOP Financial Engine", () => {
  it("computes standard booking with insurance correctly", () => {
    // 3 days @ $45/day with insurance ($15/day)
    // subtotal = 45 * 3 = 135
    // insurance = 15 * 3 = 45
    // tax = Math.round((135 + 45) * 0.08) = Math.round(14.4) = 14
    // grandTotal = 135 + 45 + 14 = 194
    const result = computeRentalCost({
      dailyRate: 45,
      days: 3,
      includeInsurance: true,
    });

    expect(result.subtotal).toBe(135);
    expect(result.insuranceTotal).toBe(45);
    expect(result.tax).toBe(14);
    expect(result.grandTotal).toBe(194);
  });

  it("computes booking without insurance correctly", () => {
    // 7 days @ $110/day without insurance
    // subtotal = 110 * 7 = 770
    // insurance = 0
    // tax = Math.round(770 * 0.08) = Math.round(61.6) = 62
    // grandTotal = 770 + 0 + 62 = 832
    const result = computeRentalCost({
      dailyRate: 110,
      days: 7,
      includeInsurance: false,
    });

    expect(result.subtotal).toBe(770);
    expect(result.insuranceTotal).toBe(0);
    expect(result.tax).toBe(62);
    expect(result.grandTotal).toBe(832);
  });

  it("handles 1-day rental edge case", () => {
    // 1 day @ $65/day with insurance
    // subtotal = 65
    // insurance = 15
    // tax = Math.round(80 * 0.08) = Math.round(6.4) = 6
    // grandTotal = 65 + 15 + 6 = 86
    const result = computeRentalCost({
      dailyRate: 65,
      days: 1,
      includeInsurance: true,
    });

    expect(result.subtotal).toBe(65);
    expect(result.insuranceTotal).toBe(15);
    expect(result.tax).toBe(6);
    expect(result.grandTotal).toBe(86);
  });

  it("handles 0 days safely without NaN or negative values", () => {
    const result = computeRentalCost({
      dailyRate: 45,
      days: 0,
      includeInsurance: true,
    });

    expect(result.subtotal).toBe(0);
    expect(result.insuranceTotal).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.grandTotal).toBe(0);
  });

  it("handles negative days safely by clamping to 0", () => {
    const result = computeRentalCost({
      dailyRate: 45,
      days: -5,
      includeInsurance: true,
    });

    expect(result.subtotal).toBe(0);
    expect(result.insuranceTotal).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.grandTotal).toBe(0);
  });
});
