
import { useMemo, useState } from "react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaChartLine, FaBalanceScale } from "react-icons/fa";
import { useTheme } from "../../auth/ThemeContext";
import data from "../../data/historicaldata.json";
import forecastData from "../../data/forecastdata.json";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const style = {
  card: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300",
  hero: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-8 md:p-10",
  sectionTitle: "font-semibold flex items-center gap-2 text-lg",
  subtext: "text-sm text-gray-400 mt-1 mb-2 max-w-2xl leading-relaxed",
  insight: "text-sm text-gray-400 mt-4 pt-4 border-t border-gray-500/20 leading-relaxed",
  statLabel: "text-xs uppercase tracking-wider text-gray-400 mb-2",
  select: "bg-background text-foreground border border-gray-500/40 rounded-xl px-3 py-2 text-sm focus:border-orange-400 outline-none",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// How many recent actual years of monthly detail to show flowing into the forecast
const MONTHLY_HISTORY_YEARS = 3;

function usePalette(theme) {
  return useMemo(() => {
    const isDark = theme === "dark";
    return {
      accent: "#fb923c",
      historical: isDark ? "#9ca3af" : "#6b7280",
      band: "rgba(251,146,60,0.12)",
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
      <div className="text-2xl font-semibold text-orange-400 tabular-nums">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: subColor || "#9ca3af" }}>{sub}</div>}
    </div>
  );
}

const Comparison = () => {
  const { theme } = useTheme();
  const palette = usePalette(theme);
  const { arrivalsByYear, monthlyArrivals } = data;

  const [historyRange, setHistoryRange] = useState(10);

  const forecastYears = useMemo(() => {
    if (!forecastData?.forecasts) return {};
    const byYear = {};
    forecastData.forecasts.forEach((f) => {
      if (!byYear[f.year]) byYear[f.year] = [];
      byYear[f.year].push(f);
    });
    return byYear;
  }, []);

  const forecastYearKeys = useMemo(
    () => Object.keys(forecastYears).map(Number).sort((a, b) => a - b),
    [forecastYears]
  );

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { labels: { color: palette.text, boxWidth: 12 } },
      tooltip: {
        backgroundColor: palette.tooltipBg,
        titleColor: palette.accent,
        bodyColor: palette.tooltipText,
        borderColor: "rgba(251,146,60,0.3)",
        borderWidth: 1,
        filter: (item) => item.dataset.label !== "Confidence Band",
      },
    },
    scales: {
      x: { grid: { color: palette.grid }, ticks: { color: palette.text, maxRotation: 45, minRotation: 0, autoSkip: true } },
      y: { grid: { color: palette.grid }, ticks: { color: palette.text } },
    },
  };

  if (!forecastData?.forecasts?.length || forecastYearKeys.length === 0) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-400">No forecast data available.</p>
      </div>
    );
  }

  const { annual_totals, model } = forecastData;
  const firstForecastYear = forecastYearKeys[0];
  const lastForecastYear = forecastYearKeys[forecastYearKeys.length - 1];
  const lastActualYear = Math.max(...arrivalsByYear.map((d) => d.year));

  // ================= Monthly view: recent actual months flowing straight into forecast months =================
  const recentActualMonthly = monthlyArrivals
    .filter((d) => d.year > lastActualYear - MONTHLY_HISTORY_YEARS && d.year <= lastActualYear)
    .sort((a, b) => a.year - b.year);

  const histLabels = recentActualMonthly.flatMap((row) =>
    months.map((m) => `${m} '${String(row.year).slice(2)}`)
  );
  const histValues = recentActualMonthly.flatMap((row) => months.map((m) => row[m] || 0));

  const fcLabels = forecastData.forecasts.map((f) => f.label);
  const fcValues = forecastData.forecasts.map((f) => f.forecast);
  const fcUpper = forecastData.forecasts.map((f) => f.upper);
  const fcLower = forecastData.forecasts.map((f) => f.lower);

  const monthlyLabels = [...histLabels, ...fcLabels];
  const bridgeVal = histValues[histValues.length - 1];

  // historical series: real values, then nulls across the forecast horizon
  const monthlyHistorical = [...histValues, ...fcValues.map(() => null)];
  // forecast series: nulls across history, bridge point at the boundary, then forecast values
  const monthlyForecast = [...histValues.map(() => null), ...fcValues];
  monthlyForecast[histValues.length - 1] = bridgeVal; // stitch the two lines together visually
  // confidence band only exists across the forecast horizon
  const monthlyUpper = [...histValues.map(() => null), ...fcUpper];
  const monthlyLower = [...histValues.map(() => null), ...fcLower];
  monthlyUpper[histValues.length - 1] = bridgeVal;
  monthlyLower[histValues.length - 1] = bridgeVal;

  const monthlyTimelineData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Confidence Band",
        data: monthlyUpper,
        borderColor: "transparent",
        backgroundColor: palette.band,
        fill: "+1",
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: "Confidence Band",
        data: monthlyLower,
        borderColor: "transparent",
        backgroundColor: palette.band,
        fill: false,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: `Historical (${recentActualMonthly[0]?.year}–${lastActualYear})`,
        data: monthlyHistorical,
        borderColor: palette.historical,
        backgroundColor: palette.historical,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
        fill: false,
      },
      {
        label: `Forecast (${model})`,
        data: monthlyForecast,
        borderColor: palette.accent,
        backgroundColor: palette.accent,
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  // ================= Yearly view: same continuous-line treatment =================
  const recentHistory = arrivalsByYear.slice(-historyRange);
  const yearlyLabels = [...recentHistory.map((d) => d.year), ...forecastYearKeys];
  const yearlyBridge = recentHistory[recentHistory.length - 1].total;

  const yearlyHistorical = [...recentHistory.map((d) => d.total), ...forecastYearKeys.map(() => null)];
  const yearlyForecast = [...recentHistory.map(() => null), ...forecastYearKeys.map((y) => annual_totals[String(y)])];
  yearlyForecast[recentHistory.length - 1] = yearlyBridge;

  const yearlyTimelineData = {
    labels: yearlyLabels,
    datasets: [
      {
        label: "Historical (Actual)",
        data: yearlyHistorical,
        borderColor: palette.historical,
        backgroundColor: palette.historical,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.25,
        fill: false,
      },
      {
        label: `Forecast (${model})`,
        data: yearlyForecast,
        borderColor: palette.accent,
        backgroundColor: palette.accent,
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 3,
        tension: 0.25,
        fill: false,
      },
    ],
  };

  const firstForecastTotal = annual_totals[String(firstForecastYear)];
  const lastActualTotal = recentHistory[recentHistory.length - 1].total;
  const pctDiff = ((firstForecastTotal / lastActualTotal - 1) * 100).toFixed(1);
  const peakMonthEntry = forecastData.forecasts.reduce((a, b) => (b.forecast > a.forecast ? b : a));

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-10">

        {/* Hero + controls */}
        <div className={style.hero}>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <FaBalanceScale />
            <span>Nepal Tourism Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            Historical vs Forecast
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mb-6 leading-relaxed">
            Recorded arrivals flowing into the model's {firstForecastYear}–
            {lastForecastYear} projection, both by month and by year.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <select className={style.select} value={historyRange} onChange={(e) => setHistoryRange(Number(e.target.value))}>
              <option value={5}>Last 5 years</option>
              <option value={10}>Last 10 years</option>
              <option value={arrivalsByYear.length}>All history</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label={`${lastActualYear} Actual`} value={`${(lastActualTotal / 1e6).toFixed(2)}M`} />
            <StatCard label={`${firstForecastYear} Forecast`} value={`${(firstForecastTotal / 1e6).toFixed(2)}M`} sub={model} />
            <StatCard
              label="Projected Change"
              value={`${pctDiff > 0 ? "+" : ""}${pctDiff}%`}
              subColor={pctDiff >= 0 ? "#7fae6b" : "#c77d5a"}
              sub="vs last actual year"
            />
            <StatCard label="Forecast Peak Month" value={peakMonthEntry.label} />
          </div>
        </div>

        {/* Yearly continuous timeline */}
        <div className={style.card}>
          <h2 className="font-semibold text-lg">Yearly Totals: Actual → Projected</h2>
          <p className={style.subtext}>
            The gray line is recorded history; the dashed orange line is the {model} model's
            projection continuing from it.
          </p>
          <div style={{ height: 300 }}>
            <Line data={yearlyTimelineData} options={baseOptions} />
          </div>
        </div>

        {/* Monthly continuous timeline: history flowing straight into forecast */}
        <div className={style.card}>
          <div className={style.sectionTitle}>
            <FaChartLine className="text-orange-400" />
            <h2>Monthly Arrivals: Recent History → Forecast</h2>
          </div>
          <p className={style.subtext}>
            Solid gray line is recorded monthly arrivals; the dashed orange line continues
            directly from it as the {model} model's projection, with the shaded band showing
            its confidence interval.
          </p>
          <div style={{ height: 340 }}>
            <Line data={monthlyTimelineData} options={baseOptions} />
          </div>
          <p className={style.insight}>
            The model projects {peakMonthEntry.label} as the single busiest month ahead,
            consistent with the historical autumn travel pattern.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comparison;