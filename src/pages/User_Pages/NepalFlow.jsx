import React from "react";
import {
  TrendingUp,
  Mountain,
  Map,
  Users,
  Database,
  Search,
} from "lucide-react";

export default function NepalFlow() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <AboutApp />
      <FeatureGrid />
    </main>
  );
}

function Hero() {
  return (
    <section className="border-b border-gray-500/40 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-500/40 bg-background px-4 py-2 text-xs font-medium tracking-[0.25em] uppercase text-orange-400">
              NepalFlow // Tourism Intelligence
            </p>

            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-foreground md:text-7xl">
              Forecasting Visitor Flows from Terai to Peak
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
              NepalFlow combines historical arrival data with machine learning
              to deliver precise tourist volume forecasting. Built for hotels,
              trekking agencies, and conservation managers needing to anticipate
              seasonal peaks and resource demands.
            </p>
          </div>

          {/* Right */}
          <div className="overflow-hidden rounded-2xl border border-gray-500/40 bg-background">
            <div className="flex items-center justify-between border-b border-gray-500/40 px-6 py-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-orange-400 uppercase">
                  Visitor Forecast Node
                </p>

                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Namche Bazaar
                </h2>
              </div>

              <TrendingUp className="h-9 w-9 text-orange-400" />
            </div>

            <div className="divide-y divide-gray-500/20">
              {[
                ["Projected Monthly Visitors", "14,820"],
                ["Peak Season Window", "Oct - Nov"],
                ["Avg. Length of Stay", "12.5 Days"],
                ["Primary Activity Profile", "Trekking & Climbing"],
                ["Capacity Threshold Status", "Optimal / 78%"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 px-6 py-5">
                  <span className="font-medium text-gray-400">{label}</span>

                  <span className="text-right font-semibold text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-500/40 px-6 py-5">
              <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">
                PREDICTIVE ENGINE STATUS
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Data calibrated using active flight manifests, visa
                applications, and historical trail permit trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutApp() {
  return (
    <section className="border-b border-gray-500/40 py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5 lg:px-10">
        {/* Left */}
        <div className="lg:col-span-2">
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] uppercase text-orange-400">
            About the Platform
          </p>

          <h2 className="text-5xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
            Bridging the gap between raw travel data and local preparation.
          </h2>
        </div>

        {/* Right */}
        <div className="border border-gray-500/40 bg-background lg:col-span-3">
          <div className="border-b border-gray-500/40 px-8 py-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-400">
              Infrastructure.01
            </p>

            <h3 className="mt-3 text-xl font-bold text-foreground">
              Historical Immersion
            </h3>

            <p className="mt-3 text-gray-400 leading-7">
              Integrating decades of immigration records, park entrance fees,
              and flight logs to map core traveler behaviors and base patterns.
            </p>
          </div>

          <div className="border-b border-gray-500/40 px-8 py-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-400">
              Infrastructure.02
            </p>

            <h3 className="mt-3 text-xl font-bold text-foreground">
              Seasonality Modeling
            </h3>

            <p className="mt-3 text-gray-400 leading-7">
              Machine learning models that dynamically adapt predictions around
              festival cycles, monsoon shifts, and global flight trends.
            </p>
          </div>

          <div className="px-8 py-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-400">
              Infrastructure.03
            </p>

            <h3 className="mt-3 text-xl font-bold text-foreground">
              Granular Distribution
            </h3>

            <p className="mt-3 text-gray-400 leading-7">
              Forecasting crowd movements for specific trail loops, heritage
              sites, and remote villages to prevent bottlenecking and
              overtourism.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      code: "FLOW.01",
      title: "Arrival Forecasting",
      icon: TrendingUp,
      description:
        "Predicting international and regional visitor trends up to 12 months in advance to assist in high-level seasonal planning.",
    },
    {
      code: "FLOW.02",
      title: "Trail Density Mapping",
      icon: Map,
      description:
        "Simulating anticipated daily foot traffic on popular loops like Everest Base Camp and Annapurna to manage lodge capacities.",
    },
    {
      code: "FLOW.03",
      title: "Community Metrics",
      icon: Users,
      description:
        "Estimating local food, fuel, and staffing needs for remote guides, helping mountain tea houses balance their supply chains.",
    },
    {
      code: "FLOW.04",
      title: "Offline Syncing",
      icon: Database,
      description:
        "Cached projection charts designed to download over slow mobile networks, keeping remote guides informed on the trail.",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex items-center justify-between border-b border-gray-500/40 pb-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400">
              Core Utilities
            </p>

            <h2 className="mt-3 text-4xl font-black text-foreground">
              Operational Modules
            </h2>
          </div>

          <Mountain className="h-8 w-8 text-gray-500" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-500/40 lg:grid lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.code}
                className={`bg-background p-8 transition-all duration-300 hover:border-orange-400/30 ${
                  index !== features.length - 1
                    ? "border-b lg:border-b-0 lg:border-r border-gray-500/40"
                    : ""
                }`}
              >
                <Icon className="h-7 w-7 text-orange-400" />

                <p className="mt-8 text-xs font-bold tracking-[0.25em] uppercase text-orange-400">
                  {feature.code}
                </p>

                <h3 className="mt-4 text-2xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-7 text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
