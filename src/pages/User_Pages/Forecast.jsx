



import { useMemo } from "react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaChartLine, FaCalendarAlt, FaRobot } from "react-icons/fa";
import { useTheme } from "../../auth/ThemeContext";
import forecastData from "../../data/forecastdata.json";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const style = {
  card: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300",
  hero: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-8 md:p-10",
  sectionTitle: "font-semibold flex items-center gap-2 text-lg",
  subtext: "text-sm text-gray-400 mt-1 mb-2 max-w-2xl leading-relaxed",
  insight: "text-sm text-gray-400 mt-4 pt-4 border-t border-gray-500/20 leading-relaxed",
  statLabel: "text-xs uppercase tracking-wider text-gray-400 mb-2",
  badge: "px-2.5 py-1 rounded-lg text-[11px] font-medium",
};

// Crowd-level → color mapping (kept separate from the orange accent used for the forecast line)
const CROWD_COLORS = {
  Normal: { bg: "bg-green-400/15", text: "text-green-400" },
  Medium: { bg: "bg-amber-400/15", text: "text-amber-400" },
  High:   { bg: "bg-red-400/15",   text: "text-red-400" },
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
      <div className="text-2xl font-semibold text-orange-400 tabular-nums">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: subColor || "#9ca3af" }}>{sub}</div>}
    </div>
  );
}

function CrowdBadge({ level }) {
  const c = CROWD_COLORS[level] || CROWD_COLORS.Normal;
  return <span className={`${style.badge} ${c.bg} ${c.text}`}>{level}</span>;
}

const Forecast = () => {
  const { theme } = useTheme();
  const palette = usePalette(theme);

  const { model, model_order, trained_on, forecasts, annual_totals } = forecastData;

  const labels = useMemo(() => forecasts.map((d) => d.label), [forecasts]);
  const forecastVals = useMemo(() => forecasts.map((d) => d.forecast), [forecasts]);
  const upperVals = useMemo(() => forecasts.map((d) => d.upper), [forecasts]);
  const lowerVals = useMemo(() => forecasts.map((d) => d.lower), [forecasts]);

  const peakIdx = forecastVals.indexOf(Math.max(...forecastVals));
  const total2025 = annual_totals["2025"];
  const total2026 = annual_totals["2026"];
  const yoyGrowthPct = ((total2026 / total2025 - 1) * 100).toFixed(1);

  const avgBandWidthPct = useMemo(() => {
    const pcts = forecasts.map((d) => ((d.upper - d.lower) / d.forecast) * 100);
    return (pcts.reduce((a, b) => a + b, 0) / pcts.length).toFixed(0);
  }, [forecasts]);

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
        callbacks: {
          afterBody: (items) => {
            const d = forecasts[items[0].dataIndex];
            return d ? `Crowd level: ${d.crowd_level}` : "";
          },
        },
      },
    },
    scales: {
      x: { grid: { color: palette.grid }, ticks: { color: palette.text, maxRotation: 45, minRotation: 45 } },
      y: { grid: { color: palette.grid }, ticks: { color: palette.text } },
    },
  };

  const bandData = {
    labels,
    datasets: [
      {
        label: "Upper Bound",
        data: upperVals,
        borderColor: "transparent",
        backgroundColor: "rgba(251,146,60,0.12)",
        fill: "+1",
        pointRadius: 0,
        tension: 0.35,
      },
      {
        label: "Lower Bound",
        data: lowerVals,
        borderColor: "transparent",
        backgroundColor: "rgba(251,146,60,0.12)",
        fill: false,
        pointRadius: 0,
        tension: 0.35,
      },
      {
        label: "Forecast",
        data: forecastVals,
        borderColor: palette.accent,
        backgroundColor: palette.accent,
        borderWidth: 2,
        pointRadius: 2,
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
            Projected monthly arrivals for 2025–2026 from a {model} model trained on
            data from {trained_on}. Shaded band shows the 95% confidence interval.
          </p>

          <div className="flex items-center gap-2 mb-8 text-xs text-gray-400">
            <FaRobot className="text-orange-400" />
            <span>
              {model} {model_order} · trained {trained_on}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Projected Peak Month" value={labels[peakIdx]} sub="Highest expected arrivals" />
            <StatCard
              label="2026 Annual Projection"
              value={`${(total2026 / 1e6).toFixed(2)}M`}
              sub={`${yoyGrowthPct >= 0 ? "+" : ""}${yoyGrowthPct}% vs 2025`}
              subColor={yoyGrowthPct >= 0 ? "#7fae6b" : "#ef4444"}
            />
            <StatCard label="2025 Annual Projection" value={`${(total2025 / 1e6).toFixed(2)}M`} sub="Full-year total" />
            <StatCard label="Avg. Confidence Band" value={`±${avgBandWidthPct / 2}%`} sub="Uncertainty range" />
          </div>
        </div>

        {/* Main forecast chart */}
        <div className={style.card}>
          <div className={style.sectionTitle}>
            <FaChartLine className="text-orange-400" />
            <h2>Forecast with Confidence Range</h2>
          </div>
          <p className={style.subtext}>
            Shaded band shows the model's confidence interval around the central forecast,
            across both projected years.
          </p>
          <div style={{ height: 380 }}>
            <Line data={bandData} options={baseOptions} />
          </div>
          <p className={style.insight}>
            {labels[peakIdx]} is projected as the single highest month across the 24-month
            window, consistent with the historical autumn travel season. Confidence intervals
            widen further out in the forecast horizon, reflecting increasing model uncertainty.
          </p>
        </div>

        {/* Monthly crowd-level breakdown */}
        <div className={style.card}>
          <div className={style.sectionTitle}>
            <FaCalendarAlt className="text-orange-400" />
            <h2>Monthly Crowd Levels</h2>
          </div>
          <p className={style.subtext}>
            Expected crowd level per month, derived from the forecasted arrival volume.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-2">
            {forecasts.map((d) => (
              <div
                key={d.label}
                className="flex flex-col items-center justify-center gap-2 border border-gray-500/20 rounded-xl py-3"
              >
                <span className="text-xs text-gray-400">{d.label}</span>
                <span className="text-sm font-semibold tabular-nums">
                  {d.forecast.toLocaleString()}
                </span>
                <CrowdBadge level={d.crowd_level} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center pb-4">
          Forecast generated by a {model} {model_order} model trained on {trained_on}.
        </div>
      </div>
    </div>
  );
};

export default Forecast;