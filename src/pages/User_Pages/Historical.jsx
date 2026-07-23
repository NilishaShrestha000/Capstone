import { useMemo, useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { FaMountain, FaChartLine, FaUsers, FaPlaneArrival } from "react-icons/fa";
import { useTheme } from "../../auth/ThemeContext";
import data from "../../data/historicaldata.json";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend
);

const style = {
  card: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300",
  hero: "bg-background text-foreground border border-gray-500/40 rounded-2xl p-8 md:p-10",
  sectionTitle: "font-semibold flex items-center gap-2 text-lg",
  subtext: "text-sm text-gray-400 mt-1 mb-2 max-w-2xl leading-relaxed",
  insight: "text-sm text-gray-400 mt-4 pt-4 border-t border-gray-500/20 leading-relaxed",
  statLabel: "text-xs uppercase tracking-wider text-gray-400 mb-2",
};

// ---- animated count-up, runs once on mount ----
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start;
    let frame;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function Sparkline({ values, color }) {
  const chartData = {
    labels: values.map((_, i) => i),
    datasets: [{
      data: values,
      borderColor: color,
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0.4,
      fill: false,
    }],
  };
  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { line: { borderJoinStyle: "round" } },
  };
  return (
    <div style={{ height: 28, width: 70 }}>
      <Line data={chartData} options={opts} />
    </div>
  );
}

function usePalette(theme) {
  return useMemo(() => {
    const isDark = theme === "dark";
    return {
      accent: "#fb923c",
      accentSoft: "rgba(251,146,60,0.18)",
      grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      text: isDark ? "#9ca3af" : "#4b5563",
      tooltipBg: isDark ? "#1f1f22" : "#ffffff",
      tooltipText: isDark ? "#e5e5e5" : "#111827",
      series: ["#fb923c", "#7fae6b", "#5a8fc7", "#c77d5a", "#8a6bb5", "#6b7280"],
    };
  }, [theme]);
}

function StatCard({ label, value, decimals = 2, suffix = "", sub, subColor, sparkValues, sparkColor }) {
  const animated = useCountUp(value);
  return (
    <div className={style.card}>
      <div className="flex items-start justify-between">
        <div>
          <div className={style.statLabel}>{label}</div>
          <div className="text-2xl font-semibold text-orange-400 tabular-nums">
            {animated.toFixed(decimals)}{suffix}
          </div>
          {sub && <div className="text-xs mt-1" style={{ color: subColor || "#9ca3af" }}>{sub}</div>}
        </div>
        {sparkValues && <Sparkline values={sparkValues} color={sparkColor} />}
      </div>
    </div>
  );
}

const Historical = () => {
  const { theme } = useTheme();
  const palette = usePalette(theme);
  const { arrivalsByYear, arrivalAndStay, monthlyArrivals, purposeOfVisit } = data;

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

  const eventMarkerPlugin = {
    id: "eventMarkers",
    afterDraw(chart) {
      const events = chart.config._eventMarkers;
      if (!events) return;
      const { ctx, chartArea, scales } = chart;
      ctx.save();
      events.forEach(({ year, label }) => {
        const index = chart.data.labels.indexOf(year);
        if (index === -1) return;
        const x = scales.x.getPixelForValue(index);
        ctx.strokeStyle = "rgba(251,146,60,0.4)";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x, chartArea.top);
        ctx.lineTo(x, chartArea.bottom);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = palette.accent;
        ctx.font = "10px sans-serif";
        ctx.fillText(label, x + 4, chartArea.top + 10);
      });
      ctx.restore();
    },
  };

  const stats = useMemo(() => {
    const peak = arrivalsByYear.reduce((a, b) => (b.total > a.total ? b : a));
    const low = arrivalsByYear.reduce((a, b) => (b.total < a.total ? b : a));
    const current = arrivalsByYear[arrivalsByYear.length - 1];
    const fifteenYearsAgo = arrivalsByYear.find((d) => d.year === current.year - 15);
    const cagr = fifteenYearsAgo
      ? (Math.pow(current.total / fifteenYearsAgo.total, 1 / 15) - 1) * 100
      : null;
    const last6 = arrivalsByYear.slice(-6).map((d) => d.total);
    return { peak, low, current, cagr, last6 };
  }, [arrivalsByYear]);

  // ---- gradient fill (needs chart ctx, so set as a function) ----
  const annualTrendData = {
    labels: arrivalsByYear.map((d) => d.year),
    datasets: [
      {
        label: "Total Arrivals",
        data: arrivalsByYear.map((d) => d.total),
        borderColor: palette.accent,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return palette.accentSoft;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(251,146,60,0.45)");
          gradient.addColorStop(1, "rgba(251,146,60,0.02)");
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };
  const annualTrendOptions = {
    ...baseOptions,
    _eventMarkers: [
      { year: 2001, label: "Insurgency" },
      { year: 2015, label: "Earthquake" },
      { year: 2020, label: "Global Lockdown" },
      { year: 2022, label: "Rapid Recovery" },
    ],
  };

  const purposeCategories = [
    { key: "holidayPleasure", label: "Holiday / Pleasure" },
    { key: "trekkingMountaineering", label: "Trekking / Mountaineering" },
    { key: "pilgrimage", label: "Pilgrimage" },
    { key: "business", label: "Business" },
    { key: "official", label: "Official" },
    { key: "others", label: "Others" },
  ];
  const purposeYears = purposeOfVisit.filter((d) => d.year >= 2007);
  const purposeData = {
    labels: purposeYears.map((d) => d.year),
    datasets: purposeCategories.map((cat, i) => ({
      label: cat.label,
      data: purposeYears.map((d) => d[cat.key] ?? 0),
      borderColor: palette.series[i],
      backgroundColor: palette.series[i] + "55",
      fill: true,
      stack: "purpose",
      pointRadius: 0,
      tension: 0.3,
    })),
  };
  const purposeOptions = {
    ...baseOptions,
    scales: { x: baseOptions.scales.x, y: { ...baseOptions.scales.y, stacked: true } },
  };

  const modeYears = arrivalAndStay.filter((d) => d.year >= 2000);
  const modeData = {
    labels: modeYears.map((d) => d.year),
    datasets: [
      { label: "By Air", data: modeYears.map((d) => d.byAirPercent), backgroundColor: palette.accent, stack: "mode" },
      { label: "By Land", data: modeYears.map((d) => d.byLandPercent), backgroundColor: palette.series[5], stack: "mode" },
    ],
  };
  const modeOptions = {
    ...baseOptions,
    scales: {
      x: { ...baseOptions.scales.x, stacked: true },
      y: { ...baseOptions.scales.y, stacked: true, max: 100, ticks: { ...baseOptions.scales.y.ticks, callback: (v) => v + "%" } },
    },
  };

  const latest = purposeOfVisit[purposeOfVisit.length - 1];
  const donutData = {
    labels: purposeCategories.map((c) => c.label),
    datasets: [{ data: purposeCategories.map((c) => latest[c.key] ?? 0), backgroundColor: palette.series, borderWidth: 0 }],
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const heatmapYears = monthlyArrivals.filter((d) => d.year >= 2010);
  const maxVal = Math.max(...heatmapYears.flatMap((row) => months.map((m) => row[m] || 0)));

  // ---- dynamic insight text, computed from the data instead of hardcoded ----
  const insights = useMemo(() => {
    const drop2020 = arrivalsByYear.find((d) => d.year === 2020).percentChange;
    const recoveryPct = ((stats.current.total / stats.peak.total) * 100).toFixed(0);

    const monthTotals = months.map((m) =>
      heatmapYears.reduce((sum, row) => sum + (row[m] || 0), 0)
    );
    const peakMonthIdx = monthTotals.indexOf(Math.max(...monthTotals));

    const pilgrimageEarly = purposeYears[0].pilgrimage / purposeYears[0].total;
    const pilgrimageLate = purposeYears[purposeYears.length - 1].pilgrimage / purposeYears[purposeYears.length - 1].total;

    const land2021 = arrivalAndStay.find((d) => d.year === 2021).byLandPercent;
    const land2024 = arrivalAndStay.find((d) => d.year === 2024).byLandPercent;

    return {
      trend: `Arrivals peaked at ${(stats.peak.total / 1e6).toFixed(2)}M in ${stats.peak.year}, then collapsed ${Math.abs(drop2020)}% in 2020 as the pandemic shut down travel. By ${stats.current.year}, arrivals had recovered to ${recoveryPct}% of that peak.`,
      purpose: `Pilgrimage travel has grown from roughly ${(pilgrimageEarly * 100).toFixed(0)}% of total visits in ${purposeYears[0].year} to ${(pilgrimageLate * 100).toFixed(0)}% by ${purposeYears[purposeYears.length - 1].year}, while holiday travel remains the largest single category every year in the dataset.`,
      mode: `Land border crossings nearly disappeared during the pandemic (${land2021}% of arrivals in 2021, down from over 25% pre-COVID) as air travel became the only viable route in. By 2024 land arrivals had only partially recovered to ${land2024}%.`,
      season: `${months[peakMonthIdx]} is consistently the busiest month for arrivals across the last decade-plus — the autumn trekking and festival season remains the single strongest driver of Nepal's tourism calendar.`,
    };
  }, [arrivalsByYear, stats, purposeYears, arrivalAndStay, heatmapYears]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-10">

        {/* Hero */}
        <div className={style.hero}>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <FaMountain />
            <span>Nepal Tourism Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            {arrivalsByYear.length}+ Years of Nepal Tourism
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mb-8 leading-relaxed">
            An analytical deep dive into the resilient journey of the Himalayan
            nation's primary economic engine, spanning through triumph and recovery.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label={`${stats.peak.year} Peak`} value={stats.peak.total / 1e6} suffix="M" sub="Arrivals"
              //sparkValues={stats.last6} sparkColor={palette.accent}
            />
            <StatCard
              label={`${stats.low.year} Historic Low`} value={stats.low.total / 1000} decimals={0} suffix="K"
              sub="Global Lockdown" subColor="#c77d5a"
              //sparkValues={stats.last6} sparkColor="#c77d5a"
            />
            <StatCard
              label={`${stats.current.year} Current`} value={stats.current.total / 1e6} suffix="M"
              sub={`+${stats.current.percentChange}% Recovery`} subColor="#7fae6b"
              //sparkValues={stats.last6} sparkColor="#7fae6b"
            />
            <StatCard
              label="Historical" value={stats.cagr || 0} suffix="%" sub="15-Year Avg"
              //sparkValues={stats.last6} sparkColor={palette.accent}
            />
          </div>
        </div>

        {/* Annual trend */}
        <div className={style.card}>
          <div className={style.sectionTitle}>
            <FaChartLine className="text-orange-400" />
            <h2>Annual Arrival Trend {arrivalsByYear[0].year}–{arrivalsByYear[arrivalsByYear.length - 1].year}</h2>
          </div>
          <p className={style.subtext}>
            Global visitor volume with major geopolitical and natural event markers overlaid.
          </p>
          <div style={{ height: 320 }}>
            <Line data={annualTrendData} options={annualTrendOptions} plugins={[eventMarkerPlugin]} />
          </div>
          <p className={style.insight}>{insights.trend}</p>
        </div>

        {/* Purpose of visit + Travel mode */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className={style.card}>
            <h2 className="font-semibold text-lg">Purpose of Visit, Over Time</h2>
            <p className={style.subtext}>How travel motivations have shifted year over year.</p>
            <div style={{ height: 260 }}><Line data={purposeData} options={purposeOptions} /></div>
            <p className={style.insight}>{insights.purpose}</p>
          </div>
          <div className={style.card}>
            <div className={style.sectionTitle}>
              <FaPlaneArrival className="text-orange-400 text-base" />
              <h2>Entry Mode: Air vs Land</h2>
            </div>
            <p className={style.subtext}>Share of arrivals by air vs overland border crossing.</p>
            <div style={{ height: 260 }}><Bar data={modeData} options={modeOptions} /></div>
            <p className={style.insight}>{insights.mode}</p>
          </div>
        </div>

        {/* Donut + Heatmap */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className={style.card}>
            <div className={style.sectionTitle}>
              <FaUsers className="text-orange-400 text-base" />
              <h2>{latest.year} Visit Purpose</h2>
            </div>
            <p className={style.subtext}>Snapshot of the most recent year on record.</p>
            <div style={{ height: 200 }}>
              <Doughnut
                data={donutData}
                options={{
                  ...baseOptions, scales: undefined,
                  plugins: { ...baseOptions.plugins, legend: { position: "bottom", labels: { color: palette.text, boxWidth: 10, font: { size: 10 } } } },
                }}
              />
            </div>
          </div>
          <div className={`${style.card} md:col-span-2`}>
            <h2 className="font-semibold text-lg">Seasonality Heatmap</h2>
            <p className={style.subtext}>
              Monthly arrival intensity, {heatmapYears[0].year}–{heatmapYears[heatmapYears.length - 1].year}. Darker = higher volume.
            </p>
            <div className="overflow-x-auto">
              <table className="text-xs w-full border-separate border-spacing-1">
                <thead>
                  <tr>
                    <th className="text-left text-gray-400 font-normal pr-2">Year</th>
                    {months.map((m) => <th key={m} className="text-gray-400 font-normal">{m}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {heatmapYears.map((row) => (
                    <tr key={row.year}>
                      <td className="text-gray-400 pr-2">{row.year}</td>
                      {months.map((m) => {
                        const v = row[m] || 0;
                        const intensity = v / maxVal;
                        return (
                          <td key={m} className="p-0">
                            <div
                              title={`${m} ${row.year}: ${v.toLocaleString()}`}
                              className="w-full h-5 rounded-sm"
                              style={{ backgroundColor: `rgba(251,146,60,${0.08 + intensity * 0.85})` }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={style.insight}>{insights.season}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historical;

