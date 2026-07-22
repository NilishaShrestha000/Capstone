import React from "react";
import {
  FileCheck,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Download,
  Database,
} from "lucide-react";

export default function AdminVerify() {
  const validation = [
    {
      title: "CSV Format",
      status: "Passed",
      color: "text-green-500",
      icon: CheckCircle2,
    },
    {
      title: "Required Columns",
      status: "Passed",
      color: "text-green-500",
      icon: CheckCircle2,
    },
    {
      title: "Data Types",
      status: "Passed",
      color: "text-green-500",
      icon: CheckCircle2,
    },
    {
      title: "Missing Values",
      status: "18 Warnings",
      color: "text-yellow-500",
      icon: AlertTriangle,
    },
    {
      title: "Duplicate Rows",
      status: "3 Found",
      color: "text-yellow-500",
      icon: AlertTriangle,
    },
    {
      title: "Invalid Dates",
      status: "2 Errors",
      color: "text-red-500",
      icon: XCircle,
    },
  ];

  const preview = [
    {
      year: 2024,
      month: "Jan",
      province: "Bagmati",
      tourists: 14520,
      temp: "18.4°C",
      rainfall: "21 mm",
    },
    {
      year: 2024,
      month: "Feb",
      province: "Bagmati",
      tourists: 15284,
      temp: "19.1°C",
      rainfall: "18 mm",
    },
    {
      year: 2024,
      month: "Mar",
      province: "Gandaki",
      tourists: 17341,
      temp: "20.5°C",
      rainfall: "44 mm",
    },
    {
      year: 2024,
      month: "Apr",
      province: "Lumbini",
      tourists: 18952,
      temp: "28.3°C",
      rainfall: "56 mm",
    },
  ];

  const stats = [
    { label: "Rows", value: "18,254" },
    { label: "Columns", value: "12" },
    { label: "File Size", value: "2.4 MB" },
    { label: "Status", value: "Verified" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Dataset Verification
          </p>

          <h1 className="mt-4 text-5xl font-black">Verify Uploaded Dataset</h1>

          <p className="mt-5 max-w-3xl text-lg text-gray-400">
            Validate your tourism dataset before importing it into the
            forecasting system. The system checks structure, required columns,
            duplicates, missing values, and data consistency.
          </p>
        </div>

        {/* Dataset Info */}
        <div className="mt-10 rounded-3xl border border-gray-500/40 bg-background p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="rounded-2xl bg-orange-400/10 p-4">
                <FileSpreadsheet className="h-10 w-10 text-orange-400" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">tourism_dataset_2025.csv</h2>

                <p className="mt-1 text-gray-400">
                  Uploaded successfully • Ready for validation
                </p>
              </div>
            </div>

            <FileCheck className="h-12 w-12 text-green-500" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-gray-500/40 p-6"
            >
              <p className="text-sm uppercase tracking-wider text-gray-400">
                {item.label}
              </p>

              <h3 className="mt-3 text-4xl font-black">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* Validation */}
        <div className="mt-10 rounded-3xl border border-gray-500/40 p-8">
          <div className="flex items-center gap-3">
            <Database className="h-7 w-7 text-orange-400" />

            <h2 className="text-3xl font-bold">Validation Checklist</h2>
          </div>

          <div className="mt-8 space-y-4">
            {validation.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-gray-500/30 px-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`h-6 w-6 ${item.color}`} />

                    <span className="font-medium">{item.title}</span>
                  </div>

                  <span className={`font-semibold ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="mt-10 rounded-3xl border border-gray-500/40 overflow-hidden">
          <div className="border-b border-gray-500/40 px-8 py-6">
            <h2 className="text-3xl font-bold">Dataset Preview</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-500/40 bg-orange-400/5">
                <tr>
                  <th className="px-6 py-4 text-left">Year</th>
                  <th className="px-6 py-4 text-left">Month</th>
                  <th className="px-6 py-4 text-left">Province</th>
                  <th className="px-6 py-4 text-left">Tourists</th>
                  <th className="px-6 py-4 text-left">Temperature</th>
                  <th className="px-6 py-4 text-left">Rainfall</th>
                </tr>
              </thead>

              <tbody>
                {preview.map((row, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-6 py-4">{row.year}</td>
                    <td className="px-6 py-4">{row.month}</td>
                    <td className="px-6 py-4">{row.province}</td>
                    <td className="px-6 py-4">{row.tourists}</td>
                    <td className="px-6 py-4">{row.temp}</td>
                    <td className="px-6 py-4">{row.rainfall}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Status */}
        <div className="mt-10 rounded-3xl border border-red-500/30 bg-red-500/5 p-8">
          <h2 className="text-2xl font-bold text-red-400">
            Verification Completed with Warnings
          </h2>

          <p className="mt-3 text-gray-400">
            The dataset contains warnings that should be reviewed before
            importing. You can continue after correcting the highlighted issues.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="flex items-center gap-2 rounded-xl border border-gray-500/40 px-6 py-3 hover:border-orange-400">
            <RefreshCw className="h-5 w-5" />
            Verify Again
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-gray-500/40 px-6 py-3 hover:border-orange-400">
            <Download className="h-5 w-5" />
            Download Report
          </button>

          <button className="rounded-xl bg-orange-400 px-8 py-3 font-semibold text-black hover:bg-orange-300">
            Import Dataset
          </button>
        </div>
      </div>
    </main>
  );
}
