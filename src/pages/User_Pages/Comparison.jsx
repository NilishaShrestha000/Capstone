import { useMemo, useState } from "react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Filler, Tooltip, Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaChartBar, FaBalanceScale } from "react-icons/fa";
import { useTheme } from "../../auth/ThemeContext";
import data from "../../data/historicaldata.json";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Tooltip, Legend);

const style = {
  card: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300",
  hero: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-8 md:p-10",
  sectionTitle: "font-semibold flex items-center gap-2 text-lg",
  subtext: "text-sm text-gray-400 mt-1 mb-2 max-w-2xl leading-relaxed",
  insight: "text-sm text-gray-400 mt-4 pt-4 border-t border-gray-500/20 leading-relaxed",
  statLabel: "text-xs uppercase tracking-wider text-gray-400 mb-2",
  select: "bg-background text-foreground border border-gray-500/40 rounded-xl px-3 py-2 text-sm focus:border-orange-400 outline-none",
};

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const SCENARIOS = {
  conservative: { label: "Conservative", growth: 0.03 },
  base:         { label: "Base Case",    growth: 0.074 },
  optimistic:   { label: "Optimistic",   growth: 0.12 },
};

// Same placeholder model as the Forecast page — seasonal baseline × compounded growth.
function computeForecast(monthlyArrivals, scenarioKey, yearsAhead, startYear) {
  const scenario = SCENARIOS[scenarioKey];
  const recentYears = monthlyArrivals.filter((d) => d.year >= 2019 && d.year !== 2020 && d.year !== 2021);
  const baseline = months.map((m) => {
    const vals = recentYears.map((y) => y[m] || 0);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  });

  const yearlyForecasts = [];
  for (let i = 0; i < yearsAhead; i++) {
    const compounded = Math.pow(1 + scenario.growth, i + 1);
    const monthly = baseline.map((v) => v * compounded);
    yearlyForecasts.push({ year: startYear + i, monthly, total: monthly.reduce((a, b) => a + b, 0) });
  }
  return { baseline, yearlyForecasts, scenario };
}

function usePalette(theme) {
  return useMemo(() => {
    const isDark = theme === "dark";
    return {
      accent: "#fb923c",
      historical: isDark ? "#6b7280" : "#9ca3af",
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

  const [scenarioKey, setScenarioKey] = useState("base");
  const [historyRange, setHistoryRange] = useState(10);

  const latestYear = Math.max(...monthlyArrivals.map((d) => d.year));
  const startYear = latestYear + 1;

  const { baseline, yearlyForecasts, scenario } = useMemo(
    () => computeForecast(monthlyArrivals, scenarioKey, 2, startYear),
    [monthlyArrivals, scenarioKey, startYear]
  );

  const nextYearForecast = yearlyForecasts[0];

  // --- Chart 1: monthly shape, historical seasonal avg vs next-year forecast ---
  const monthlyComparisonData = {
    labels: months,
    datasets: [
      { label: `Historical Avg (2019, '22–'24)`, data: baseline, backgroundColor: palette.historical },
      { label: `${nextYearForecast.year} Forecast (${scenario.label})`, data: nextYearForecast.monthly, backgroundColor: palette.accent },
    ],
  };

  // --- Chart 2: yearly totals, historical bars flowing into forecast bars ---
  const recentHistory = arrivalsByYear.slice(-historyRange);
  const yearlyLabels = [...recentHistory.map((d) => d.year), ...yearlyForecasts.map((d) => d.year)];
  const historicalTotals = [...recentHistory.map((d) => d.total), ...yearlyForecasts.map(() => null)];
  const forecastTotals = [...recentHistory.map(() => null), ...yearlyForecasts.map((d) => d.total)];
  // bridge point so the two series visually connect at the boundary year
  historicalTotals[recentHistory.length - 1] = recentHistory[recentHistory.length - 1].total;
  forecastTotals[recentHistory.length - 1] = recentHistory[recentHistory.length - 1].total;

  const yearlyTimelineData = {
    labels: yearlyLabels,
    datasets: [
      { label: "Historical (Actual)", data: historicalTotals, backgroundColor: palette.historical },
      { label: `Forecast (${scenario.label})`, data: forecastTotals, backgroundColor: palette.accent },
    ],
  };

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
      x: { grid: { color: palette.grid }, ticks: { color: palette.text } },
      y: { grid: { color: palette.grid }, ticks: { color: palette.text } },
    },
  };

  const pctDiff = ((nextYearForecast.total / recentHistory[recentHistory.length - 1].total - 1) * 100).toFixed(1);
  const peakMonthIdx = nextYearForecast.monthly.indexOf(Math.max(...nextYearForecast.monthly));

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
            Compare recorded arrivals against the projected {nextYearForecast.year}–
            {yearlyForecasts[1].year} forecast, both by season and by year.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <select className={style.select} value={scenarioKey} onChange={(e) => setScenarioKey(e.target.value)}>
              {Object.entries(SCENARIOS).map(([key, s]) => (
                <option key={key} value={key}>{s.label}</option>
              ))}
            </select>
            <select className={style.select} value={historyRange} onChange={(e) => setHistoryRange(Number(e.target.value))}>
              <option value={5}>Last 5 years</option>
              <option value={10}>Last 10 years</option>
              <option value={arrivalsByYear.length}>All history</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label={`${recentHistory[recentHistory.length - 1].year} Actual`} value={`${(recentHistory[recentHistory.length - 1].total / 1e6).toFixed(2)}M`} />
            <StatCard label={`${nextYearForecast.year} Forecast`} value={`${(nextYearForecast.total / 1e6).toFixed(2)}M`} sub={scenario.label} />
            <StatCard
              label="Projected Change"
              value={`${pctDiff > 0 ? "+" : ""}${pctDiff}%`}
              subColor={pctDiff >= 0 ? "#7fae6b" : "#c77d5a"}
              sub="vs last actual year"
            />
            <StatCard label="Forecast Peak Month" value={months[peakMonthIdx]} />
          </div>
        </div>

        {/* Monthly shape comparison */}
        <div className={style.card}>
          <div className={style.sectionTitle}>
            <FaChartBar className="text-orange-400" />
            <h2>Seasonal Pattern: Historical vs Forecast</h2>
          </div>
          <p className={style.subtext}>
            Average historical monthly arrivals against the {nextYearForecast.year} projection —
            bars taller than the gray baseline indicate projected growth for that month.
          </p>
          <div style={{ height: 300 }}>
            <Bar data={monthlyComparisonData} options={baseOptions} />
          </div>
          <p className={style.insight}>
            The {scenario.label.toLowerCase()} scenario projects {months[peakMonthIdx]} as the peak
            month for {nextYearForecast.year}, in line with the historical autumn travel pattern.
          </p>
        </div>

        {/* Yearly timeline: historical flowing into forecast */}
        <div className={style.card}>
          <h2 className="font-semibold text-lg">Yearly Totals: Actual → Projected</h2>
          <p className={style.subtext}>
            Gray bars are recorded history; orange bars are the model's projection continuing from it.
          </p>
          <div style={{ height: 300 }}>
            <Bar data={yearlyTimelineData} options={baseOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;