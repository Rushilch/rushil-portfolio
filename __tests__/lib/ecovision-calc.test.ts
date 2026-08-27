import { describe, it, expect } from "vitest";
import {
  computeShapAttribution,
  computeTotalRisk,
  classifyRiskLevel,
  getShapAttributions,
  BASELINE_RISK,
  EnvironmentalFeatures,
} from "@/lib/ecovision-calc";

describe("Ecovision SHAP & XAI Calculation Engine", () => {
  it("calculates independent PM2.5 SHAP attribution correctly against baseline of 35", () => {
    // Value 68: (68 - 35) * 0.45 = 33 * 0.45 = 14.85
    expect(computeShapAttribution("pm25", 68)).toBeCloseTo(14.85, 2);
    // Value 35 (baseline): (35 - 35) * 0.45 = 0
    expect(computeShapAttribution("pm25", 35)).toBe(0);
    // Value 20 (clean air): (20 - 35) * 0.45 = -6.75
    expect(computeShapAttribution("pm25", 20)).toBeCloseTo(-6.75, 2);
  });

  it("calculates independent NO2 SHAP attribution correctly against baseline of 30", () => {
    // Value 45: (45 - 30) * 0.35 = 15 * 0.35 = 5.25
    expect(computeShapAttribution("no2", 45)).toBeCloseTo(5.25, 2);
    // Value 10: (10 - 30) * 0.35 = -7.0
    expect(computeShapAttribution("no2", 10)).toBeCloseTo(-7.0, 2);
  });

  it("calculates independent Temperature SHAP attribution against baseline of 25", () => {
    // Value 34: (34 - 25) * 0.28 = 9 * 0.28 = 2.52
    expect(computeShapAttribution("temp", 34)).toBeCloseTo(2.52, 2);
    // Value 15: (15 - 25) * 0.28 = -2.80
    expect(computeShapAttribution("temp", 15)).toBeCloseTo(-2.8, 2);
  });

  it("calculates independent Humidity SHAP attribution against baseline of 50", () => {
    // Value 78: (78 - 50) * 0.15 = 28 * 0.15 = 4.20
    expect(computeShapAttribution("humidity", 78)).toBeCloseTo(4.2, 2);
  });

  it("calculates independent Wind SHAP attribution against baseline of 8 (inverse relationship)", () => {
    // Value 4 km/h (stagnant air increases hazard): (8 - 4) * 0.6 = +2.40
    expect(computeShapAttribution("wind", 4)).toBeCloseTo(2.4, 2);
    // Value 20 km/h (strong wind disperses pollutants): (8 - 20) * 0.6 = -7.20
    expect(computeShapAttribution("wind", 20)).toBeCloseTo(-7.2, 2);
  });

  it("computes total additive environmental risk matching hand-calculated benchmark", () => {
    const defaultFeatures: EnvironmentalFeatures = {
      pm25: 68,
      no2: 45,
      temp: 34,
      humidity: 78,
      wind: 4,
    };
    // Baseline: 42.0
    // PM2.5: +14.85
    // NO2: +5.25
    // Temp: +2.52
    // Humidity: +4.20
    // Wind: +2.40
    // Total sum = 42.0 + 14.85 + 5.25 + 2.52 + 4.20 + 2.40 = 71.22 -> rounded = 71.2
    const risk = computeTotalRisk(defaultFeatures);
    expect(risk).toBe(71.2);
  });

  it("enforces clamp limits on risk score: lower bound >= 5 and upper bound <= 100", () => {
    // Minimum pristine environmental conditions
    const pristineFeatures: EnvironmentalFeatures = {
      pm25: 5,
      no2: 5,
      temp: 10,
      humidity: 10,
      wind: 30,
    };
    const minRisk = computeTotalRisk(pristineFeatures);
    expect(minRisk).toBeGreaterThanOrEqual(5);

    // Maximum hazardous conditions
    const apocalypticFeatures: EnvironmentalFeatures = {
      pm25: 300,
      no2: 200,
      temp: 55,
      humidity: 100,
      wind: 0,
    };
    const maxRisk = computeTotalRisk(apocalypticFeatures);
    expect(maxRisk).toBe(100);
  });

  it("correctly classifies risk tiers at exact boundaries", () => {
    expect(classifyRiskLevel(39.9)).toBe("low");
    expect(classifyRiskLevel(40.0)).toBe("moderate");
    expect(classifyRiskLevel(69.9)).toBe("moderate");
    expect(classifyRiskLevel(70.0)).toBe("critical");
    expect(classifyRiskLevel(100)).toBe("critical");
    expect(classifyRiskLevel(5)).toBe("low");
  });

  it("returns exactly 5 feature attributions with matching keys", () => {
    const defaultFeatures: EnvironmentalFeatures = {
      pm25: 68,
      no2: 45,
      temp: 34,
      humidity: 78,
      wind: 4,
    };
    const attributions = getShapAttributions(defaultFeatures);
    expect(attributions).toHaveLength(5);
    const keys = attributions.map((a) => a.key);
    expect(keys).toEqual(["pm25", "no2", "temp", "humidity", "wind"]);
  });
});
