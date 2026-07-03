import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaLabel,
  accent,
}) {
  const positive = delta >= 0;
  return (
    <div className="rounded-xl border border-white/8 bg-[#161D28] p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400 font-medium">
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}1A` }}
        >
          <Icon size={15} style={{ color: accent }} strokeWidth={2} />
        </div>
      </div>
      <div className="font-mono text-2xl text-slate-50 tracking-tight">
        {value}
      </div>
      {delta !== undefined && (
        <div className="flex items-center gap-1 text-xs">
          {positive ? (
            <ArrowUpRight size={13} className="text-emerald-400" />
          ) : (
            <ArrowDownRight size={13} className="text-rose-400" />
          )}
          <span
            className={
              positive
                ? "text-emerald-400 font-medium"
                : "text-rose-400 font-medium"
            }
          >
            {positive ? "+" : ""}
            {delta}%
          </span>
          <span className="text-slate-500">{deltaLabel}</span>
        </div>
      )}
    </div>
  );
}
