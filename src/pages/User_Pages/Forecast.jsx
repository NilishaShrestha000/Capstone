import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { useTheme } from "../../auth/ThemeContext";
import data from "../../data/historicaldata.json";
import forecastData from "../../data/forecastdata.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const style = {
  card: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300",
  hero: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-8 md:p-10",
  sectionTitle: "font-semibold flex items-center gap-2 text-lg",
  subtext: "text-sm text-gray-400 mt-1 mb-2 max-w-2xl leading-relaxed",
  insight:
    "text-sm text-gray-400 mt-4 pt-4 border-t border-gray-500/20 leading-relaxed",
  statLabel: "text-xs uppercase tracking-wider text-gray-400 mb-2",
  scenarioBtn: "px-4 py-2 rounded-xl text-sm font-medium border transition-all",
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SCENARIOS = {
  conservative: { label: "Conservative", growth: 0.03, band: 0.08 },
  base: { label: "Base Case", growth: 0.074, band: 0.15 },
  optimistic: { label: "Optimistic", growth: 0.12, band: 0.22 },
};

function usePalette(theme) {
  return useMemo(() => {
    const isDark = theme === "dark";
    return {
      accent: "#fb923c",
      grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      text: isDark ? "#9ca3af" : "#4b5563",
      tooltipBg: isDark ? "#1f1f22" : "#ffffff",
      tooltipText: isDark ? "#e5e5e5" : "#111827",
    };
  }, [theme]);
}

function StatCard({ label, value, sub, subColor }) {
  return (
    <div className={style.card}>
      <div className={style.statLabel}>{label}</div>
      <div className="text-2xl font-semibold text-orange-400 tabular-nums">
        {value}
      </div>
      {sub && (
        <div className="text-xs mt-1" style={{ color: subColor || "#9ca3af" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

const Forecast = () => {
  const { theme } = useTheme();
  const palette = usePalette(theme);
  const { monthlyArrivals } = data;
  const [scenarioKey, setScenarioKey] = useState("base");

  const scenario = SCENARIOS[scenarioKey] || SCENARIOS.base;

  // Historical seasonal average per calendar month (recent non-COVID years),
  // used as the dashed reference line the SARIMAX forecast is compared against.
  const seasonalAvg = useMemo(() => {
    const recent = monthlyArrivals.filter(
      (d) => d.year >= 2019 && d.year !== 2020 && d.year !== 2021,
    );
    const avg = {};
    months.forEach((m) => {
      const vals = recent.map((y) => y[m] || 0);
      avg[m] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    });
    return avg;
  }, [monthlyArrivals]);

  // Forecast values come straight from the trained SARIMAX model (forecastdata.json).
  const { labels, forecast, upper, lower, baseline } = useMemo(
    () => ({
      labels: forecastData.forecasts.map((d) => d.label),
      forecast: forecastData.forecasts.map((d) => d.forecast),
      upper: forecastData.forecasts.map((d) => d.upper),
      lower: forecastData.forecasts.map((d) => Math.max(0, d.lower)),
      baseline: forecastData.forecasts.map((d) => seasonalAvg[d.month] || 0),
    }),
    [seasonalAvg],
  );

  const peakIdx = forecast.indexOf(Math.max(...forecast));
  const totalForecast = forecast.reduce((a, b) => a + b, 0);
  const totalBaselineX2 = baseline.reduce((a, b) => a + b, 0); // 24-month seasonal-average sum

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: palette.text, boxWidth: 12 } },
      tooltip: {
        backgroundColor: palette.tooltipBg,
        titleColor: palette.accent,
        bodyColor: palette.tooltipText,
        borderColor: "rgba(251,146,60,0.3)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: palette.grid },
        ticks: { color: palette.text, maxRotation: 45, minRotation: 45 },
      },
      y: { grid: { color: palette.grid }, ticks: { color: palette.text } },
    },
  };

  const bandData = {
    labels,
    datasets: [
      {
        label: "Upper Bound",
        data: upper,
        borderColor: "transparent",
        backgroundColor: "rgba(251,146,60,0.12)",
        fill: "+1",
        pointRadius: 0,
        tension: 0.35,
      },
      {
        label: "Lower Bound",
        data: lower,
        borderColor: "transparent",
        backgroundColor: "rgba(251,146,60,0.12)",
        fill: false,
        pointRadius: 0,
        tension: 0.35,
      },
      {
        label: "Forecast (SARIMAX)",
        data: forecast,
        borderColor: palette.accent,
        backgroundColor: palette.accent,
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.35,
        fill: false,
      },
      {
        label: "Historical Seasonal Average",
        data: baseline,
        borderColor: palette.text,
        borderDash: [4, 4],
        backgroundColor: "transparent",
        pointRadius: 0,
        borderWidth: 1.5,
        tension: 0.35,
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        {/* Hero */}
        <div className={style.hero}>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <FaCalendarAlt />
            <span>Nepal Tourism Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            24-Month Arrival Forecast
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mb-6 leading-relaxed">
            Projected monthly arrivals for 2025–2026 from a trained SARIMAX
            model, shown against the historical seasonal average. Switch
            scenarios to view the confidence band and growth assumptions.
          </p>

          <div className="flex gap-2 mb-8">
            {Object.entries(SCENARIOS).map(([key, s]) => (
              <button
                key={key}
                onClick={() => setScenarioKey(key)}
                className={`${style.scenarioBtn} ${
                  scenarioKey === key
                    ? "bg-orange-400/15 border-orange-400 text-orange-400"
                    : "border-gray-500/40 text-gray-400 hover:border-orange-400/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Projected Peak Month"
              value={labels[peakIdx]}
              sub="Highest expected arrivals"
            />
            <StatCard
              label="24-Month Projection"
              value={`${(totalForecast / 1e6).toFixed(2)}M`}
              sub={`+${((totalForecast / totalBaselineX2 - 1) * 100).toFixed(1)}% vs seasonal avg`}
              subColor="#7fae6b"
            />
            <StatCard
              label="Growth Assumption"
              value={`${(scenario.growth * 100).toFixed(1)}%`}
              sub="Applied annually"
            />
            <StatCard
              label="Confidence Band"
              value={`±${(scenario.band * 100).toFixed(0)}%`}
              sub="Uncertainty range"
            />
          </div>
        </div>

        {/* Main forecast chart */}
        <div className={style.card}>
          <div className={style.sectionTitle}>
            <FaChartLine className="text-orange-400" />
            <h2>Forecast with Confidence Range</h2>
          </div>
          <p className={style.subtext}>
            The shaded band shows the model's uncertainty range around the
            central forecast, across both projected years.
          </p>
          <div style={{ height: 380 }}>
            <Line data={bandData} options={baseOptions} />
          </div>
          <p className={style.insight}>
            Forecasts are generated by a SARIMAX {forecastData.model_order}{" "}
            model trained on monthly arrivals from {forecastData.trained_on}.{" "}
            {labels[peakIdx]} is projected as the single highest month across
            the 24-month window, consistent with the historical autumn travel
            season. The dashed line marks the recent seasonal average (2019,
            2022–2024; pandemic years excluded).
          </p>
        </div>

        <div className="text-xs text-gray-500 text-center pb-4">
          Forecast values are produced by a {forecastData.model} time-series
          model ({forecastData.model_order}) trained on{" "}
          {forecastData.trained_on}.
        </div>
      </div>
    </div>
  );
};

export default Forecast;
