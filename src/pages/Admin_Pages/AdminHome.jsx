import React from "react";
import {
  Users,
  CloudSun,
  BrainCircuit,
  BarChart3,
  Database,
  Upload,
  FileBarChart2,
  Settings,
  ArrowUpRight,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function AdminHome() {
  const stats = [
    {
      title: "Total Users",
      value: "1,254",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Predictions",
      value: "18,542",
      change: "Today",
      icon: BrainCircuit,
    },
    {
      title: "Weather Stations",
      value: "78",
      change: "Online",
      icon: CloudSun,
    },
    {
      title: "Accuracy",
      value: "96.4%",
      change: "Excellent",
      icon: BarChart3,
    },
  ];

  const actions = [
    {
      title: "Upload Dataset",
      icon: Upload,
    },
    {
      title: "Generate Forecast",
      icon: BrainCircuit,
    },
    {
      title: "View Reports",
      icon: FileBarChart2,
    },
    {
      title: "System Settings",
      icon: Settings,
    },
  ];

  const activities = [
    "Weather dataset uploaded successfully.",
    "Forecast model retrained.",
    "Tourism statistics updated.",
    "Monthly analytics report exported.",
    "New administrator logged in.",
  ];

  const status = [
    { title: "Weather API", value: "Online" },
    { title: "Prediction Engine", value: "Running" },
    { title: "Database", value: "Healthy" },
    { title: "Storage", value: "78% Used" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero */}
        <section className="rounded-3xl border border-gray-500/40 bg-background p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Admin Dashboard
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Welcome Back, Administrator
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Monitor tourism forecasts, weather intelligence, machine learning
            predictions, and system performance from a single dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-orange-400 px-6 py-3 font-semibold text-black hover:bg-orange-300">
              Generate Forecast
            </button>

            <button className="rounded-xl border border-gray-500/40 px-6 py-3 font-semibold hover:border-orange-400">
              View Reports
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-500/40 bg-background p-6"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-orange-400" />

                  <ArrowUpRight className="h-5 w-5 text-gray-500" />
                </div>

                <h3 className="mt-8 text-gray-400">{item.title}</h3>

                <p className="mt-2 text-4xl font-black">{item.value}</p>

                <p className="mt-2 text-sm text-orange-400">{item.change}</p>
              </div>
            );
          })}
        </section>

        {/* Overview */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-500/40 p-8 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                  System Overview
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Tourism Forecast Overview
                </h2>
              </div>

              <Database className="h-8 w-8 text-orange-400" />
            </div>

            <div className="mt-10 flex h-72 items-center justify-center rounded-2xl border border-dashed border-gray-500/40">
              <div className="text-center">
                <BarChart3 className="mx-auto h-14 w-14 text-orange-400" />

                <p className="mt-4 text-gray-400">
                  Analytics charts will be displayed here.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border border-gray-500/40 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
              Quick Actions
            </p>

            <div className="mt-8 space-y-4">
              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    className="flex w-full items-center justify-between rounded-2xl border border-gray-500/40 px-5 py-4 hover:border-orange-400"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="h-5 w-5 text-orange-400" />
                      <span>{action.title}</span>
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-gray-500" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Activity */}
          <div className="rounded-3xl border border-gray-500/40 p-8">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold">Recent Activity</h2>
            </div>

            <div className="mt-8 space-y-5">
              {activities.map((activity) => (
                <div
                  key={activity}
                  className="flex items-start gap-4 border-b border-gray-500/20 pb-4 last:border-none"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-orange-400" />

                  <div>
                    <p>{activity}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      Just a few moments ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="rounded-3xl border border-gray-500/40 p-8">
            <h2 className="text-2xl font-bold">System Status</h2>

            <div className="mt-8 space-y-5">
              {status.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between border-b border-gray-500/20 pb-4 last:border-none"
                >
                  <span className="text-gray-400">{item.title}</span>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="font-semibold">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
