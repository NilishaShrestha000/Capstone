import React from "react";

export default function TrackRecordTable({ accuracyData }) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#161D28] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Model Track Record
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Predicted vs actual arrivals, prior years
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Avg error: 2.1%
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-white/8">
            <th className="pb-2 font-medium">Year</th>
            <th className="pb-2 font-medium">Predicted</th>
            <th className="pb-2 font-medium">Actual</th>
            <th className="pb-2 font-medium">Error</th>
          </tr>
        </thead>
        <tbody>
          {accuracyData.map((row) => (
            <tr
              key={row.year}
              className="border-b border-white/5 last:border-0"
            >
              <td className="py-2.5 text-slate-300 font-mono">{row.year}</td>
              <td className="py-2.5 text-slate-300 font-mono">
                {row.predicted.toLocaleString()}
              </td>
              <td className="py-2.5 text-slate-300 font-mono">
                {row.actual.toLocaleString()}
              </td>
              <td
                className={`py-2.5 font-mono ${row.error < 0 ? "text-rose-400" : "text-emerald-400"}`}
              >
                {row.error > 0 ? "+" : ""}
                {row.error}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
