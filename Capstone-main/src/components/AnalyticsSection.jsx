import React from "react";
import { BarChart3, TrendingUp, Map } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
} from "recharts";

const AnalyticsSection = () => {
  // Mock datasets tailored for each card's prediction focus
  const historicalData = [
    { year: "2022", visitors: 40 },
    { year: "2023", visitors: 55 },
    { year: "2024", visitors: 65 },
    { year: "2025", visitors: 95 },
  ];

  const forecastData = [
    { month: "Jan", count: 30 },
    { month: "Feb", count: 45 },
    { month: "Mar", count: 60 },
    { month: "Apr", count: 90 },
    { month: "May", count: 75 },
    { month: "Jun", count: 110 },
  ];

  const mapData = [
    { region: "KTM", flow: 50 },
    { region: "PKR", flow: 70 },
    { region: "LUM", flow: 60 },
    { region: "SOL", flow: 100 },
  ];

  const features = [
    {
      title: "Historical Data",
      description: "Track Visitor Trends Over the Years",
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      bgColor: "from-blue-50 to-indigo-100",
      chart: (
        <ResponsiveContainer width="90%" height="75%">
          <BarChart data={historicalData} margin={{ bottom: -10 }}>
            <Bar
              dataKey="visitors"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              opacity={0.75}
            />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Predictive Tools",
      description: "Forecast Future Arrivals",
      icon: <TrendingUp className="w-8 h-8 text-sky-600" />,
      bgColor: "from-sky-50 to-blue-100",
      chart: (
        <ResponsiveContainer width="90%" height="75%">
          <AreaChart data={forecastData} margin={{ bottom: -10 }}>
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="count"
              stroke="#0ea5e9"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorForecast)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Interactive Maps",
      description: "Visualize Regional Tourism Flow",
      icon: <Map className="w-8 h-8 text-teal-600" />,
      bgColor: "from-teal-50 to-emerald-100",
      chart: (
        <ResponsiveContainer width="90%" height="75%">
          <BarChart data={mapData} margin={{ bottom: -10 }}>
            <Bar
              dataKey="flow"
              fill="#0d9488"
              radius={[4, 4, 0, 0]}
              opacity={0.7}
            />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-16 bg-slate-200 relative overflow-hidden">
      {/* Mountain background container */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('nflow.jpg')" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="hidden md:block h-[1px] flex-grow bg-slate-300 max-w-xs"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] text-center tracking-wide">
            Tourism Analytics & Forecasting
          </h2>
          <div className="hidden md:block h-[1px] flex-grow bg-slate-300 max-w-xs"></div>
        </div>

        {/* --- FEATURES GRID MAPPED --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer transform hover:-translate-y-1"
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              {/* Subtitle / Description */}
              <p className="text-sm text-slate-500 font-medium mb-6">
                {feature.description}
              </p>

              {/* --- IMAGE / CHART AREA --- */}
              <div
                className={`w-full h-48 rounded-xl bg-gradient-to-br ${feature.bgColor} flex flex-col items-center justify-end pb-2 border border-slate-100 shadow-inner overflow-hidden relative`}
              >
                {/* Floating Core Action Icon */}
                <div className="absolute top-4 bg-white/80 backdrop-blur-xs p-2 rounded-lg shadow-xs transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Rendered Live Functional Recharts Micrograph */}
                {feature.chart}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
