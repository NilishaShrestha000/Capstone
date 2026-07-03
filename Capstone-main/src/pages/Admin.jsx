import React from "react";
import DatasetUploader from "../components/DatasetUploader"; // Adjust path if needed

export default function Admin() {
  const handleUploadSuccess = (fileName) => {
    console.log(`Pipeline successfully kicked off for: ${fileName}`);
    // Optional: Refresh your table datasets list or trigger a notification here
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Admin Section Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Tourist Flow Analytics
          </h1>
          <p className="text-slate-400 mt-2">
            Upload historical data, seasonality trends, or booking registers to
            train or refresh the prediction models.
          </p>
        </header>

        <hr className="border-slate-800 mb-8" />

        {/* Dashboard Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (Uploader Component Calls Here) */}
          <div className="lg:col-span-2">
            <DatasetUploader onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Guidelines Sidebar */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl h-fit">
            <h3 className="text-lg font-semibold mb-3 text-white">
              Expected Features
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              To guarantee forecasting accuracy, confirm your metrics match the
              following layout headers:
            </p>

            <div className="space-y-3">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700/50">
                <span className="font-mono text-xs text-purple-400 font-semibold">
                  ds
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Timestamp format (
                  <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-300">
                    YYYY-MM-DD
                  </code>
                  )
                </p>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700/50">
                <span className="font-mono text-xs text-blue-400 font-semibold">
                  hotel_bookings
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Total registered check-ins (Integer)
                </p>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700/50">
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  airport_arrivals
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  International immigration inflow counts
                </p>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700/50">
                <span className="font-mono text-xs text-amber-400 font-semibold">
                  weather_index
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Average climate factor score (0.0 - 1.0)
                </p>
              </div>
            </div>

            <blockquote className="mt-5 border-l-2 border-amber-500/50 bg-amber-500/5 p-3 rounded-r text-xs text-amber-300/90 leading-relaxed">
              <strong>Note:</strong> Null values are auto-interpolated using
              forward-fill methodology during the model preprocessing step.
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
