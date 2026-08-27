export interface EnvironmentalFeatures {
  pm25: number;
  no2: number;
  temp: number;
  humidity: number;
  wind: number;
}

export const BASELINE_RISK = 42.0;

export interface ShapAttribution {
  name: string;
  key: keyof EnvironmentalFeatures;
  unit: string;
  value: number;
  shapValue: number;
  detail: string;
}

export function computeShapAttribution(
  key: keyof EnvironmentalFeatures,
  value: number
): number {
  switch (key) {
    case "pm25":
      return (value - 35) * 0.45;
    case "no2":
      return (value - 30) * 0.35;
    case "temp":
      return (value - 25) * 0.28;
    case "humidity":
      return (value - 50) * 0.15;
    case "wind":
      return (8 - value) * 0.6;
    default:
      return 0;
  }
}

export function getShapAttributions(
  features: EnvironmentalFeatures
): ShapAttribution[] {
  return [
    {
      name: "PM2.5 Particulate",
      key: "pm25",
      unit: "µg/m³",
      value: features.pm25,
      shapValue: computeShapAttribution("pm25", features.pm25),
      detail:
        features.pm25 > 50
          ? "Heavy particulate concentration pushing risk above baseline"
          : "Low particulate level mitigating total risk",
    },
    {
      name: "Nitrogen Dioxide (NO₂)",
      key: "no2",
      unit: "ppb",
      value: features.no2,
      shapValue: computeShapAttribution("no2", features.no2),
      detail:
        features.no2 > 40
          ? "Vehicular combustion emissions elevate hazardous index"
          : "Standard ambient NO₂ within acceptable threshold",
    },
    {
      name: "Ambient Temperature",
      key: "temp",
      unit: "°C",
      value: features.temp,
      shapValue: computeShapAttribution("temp", features.temp),
      detail:
        features.temp > 32
          ? "High heat accelerates photochemical smog reactivity"
          : "Moderate thermal conditions",
    },
    {
      name: "Relative Humidity",
      key: "humidity",
      unit: "%",
      value: features.humidity,
      shapValue: computeShapAttribution("humidity", features.humidity),
      detail:
        features.humidity > 70
          ? "Moisture trapping pollutants near ground level"
          : "Adequate dry dispersal index",
    },
    {
      name: "Surface Wind Speed",
      key: "wind",
      unit: "km/h",
      value: features.wind,
      shapValue: computeShapAttribution("wind", features.wind),
      detail:
        features.wind < 6
          ? "Stagnant airflow prevents particulate dispersion"
          : "Strong air currents actively dissipate atmospheric contaminants",
    },
  ];
}

export function computeTotalRisk(features: EnvironmentalFeatures): number {
  const attributions = getShapAttributions(features);
  const totalOffset = attributions.reduce((acc, curr) => acc + curr.shapValue, 0);
  const rawScore = BASELINE_RISK + totalOffset;
  const rounded = Math.round(rawScore * 10) / 10;
  return Math.max(5, Math.min(100, rounded));
}

export type RiskLevel = "low" | "moderate" | "critical";

export function classifyRiskLevel(score: number): RiskLevel {
  if (score < 40) return "low";
  if (score < 70) return "moderate";
  return "critical";
}
