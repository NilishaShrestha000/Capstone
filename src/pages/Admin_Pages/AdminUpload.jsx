import React, { useState } from "react";
import { UploadCloud, FileSpreadsheet, CheckCircle2, Info } from "lucide-react";

export default function AdminUpload() {
  const [file, setFile] = useState(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Dataset Management
          </p>

          <h1 className="mt-4 text-5xl font-black">Upload Tourism Dataset</h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            Upload CSV datasets for tourism forecasting and analytics. Ensure
            the dataset follows the required schema before importing.
          </p>
        </div>

        {/* Upload Card */}
        <div className="mt-10 rounded-3xl border border-gray-500/40 bg-background p-10">
          <label
            htmlFor="dataset"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-500/40 px-8 py-16 hover:border-orange-400"
          >
            <UploadCloud className="h-16 w-16 text-orange-400" />

            <h2 className="mt-6 text-2xl font-bold">
              Drag & Drop your CSV file
            </h2>

            <p className="mt-2 text-gray-400">
              or click to browse from your computer
            </p>

            <input
              id="dataset"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && (
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-gray-500/40 p-5">
              <div className="flex items-center gap-4">
                <FileSpreadsheet className="h-10 w-10 text-orange-400" />

                <div>
                  <h3 className="font-semibold">{file.name}</h3>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          )}

          <button className="mt-8 w-full rounded-xl bg-orange-400 py-4 text-lg font-semibold text-black hover:bg-orange-300">
            Upload Dataset
          </button>
        </div>

        {/* Requirements */}
        <div className="mt-10 rounded-3xl border border-gray-500/40 p-8">
          <div className="flex items-center gap-3">
            <Info className="h-6 w-6 text-orange-400" />

            <h2 className="text-2xl font-bold">Dataset Requirements</h2>
          </div>

          <div className="mt-6 space-y-4 text-gray-400">
            <p>• Only CSV (.csv) files are supported.</p>
            <p>• Maximum file size: 50 MB.</p>
            <p>• The first row must contain column headers.</p>
            <p>
              • Required columns: Year, Month, Province, Tourists, Temperature,
              Rainfall.
            </p>
            <p>• Duplicate records will be ignored automatically.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
