import React, { useState, useRef } from "react";

export default function DatasetUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef(null);
  const allowedExtensions = ["csv", "xlsx", "xls"];

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setMessage({
        type: "error",
        text: "Invalid file type. Please upload a CSV or Excel file (.csv, .xlsx, .xls).",
      });
      setFile(null);
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "File is too large. Maximum size allowed is 50MB.",
      });
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage({ type: "", text: "" });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10);
    setMessage({ type: "", text: "" });

    // Progress Simulation
    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 20));
    }, 200);

    try {
      const formData = new FormData();
      formData.append("dataset", file);

      // Actual API Integration Point:
      // const response = await fetch('/api/admin/predict/upload', { method: 'POST', body: formData });
      // if (!response.ok) throw new Error('Upload failed');

      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        setMessage({
          type: "success",
          text: `Dataset "${file.name}" uploaded successfully!`,
        });

        // Notify parent page if callback exists
        if (onUploadSuccess) onUploadSuccess(file.name);
        setFile(null);
      }, 1200);
    } catch (error) {
      clearInterval(interval);
      setIsUploading(false);
      setMessage({ type: "error", text: "Server error uploading file." });
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Upload New Dataset
      </h2>

      <form onSubmit={handleUpload}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[220px] ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-slate-600 hover:border-slate-500 bg-slate-900/50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => validateAndSetFile(e.target.files[0])}
            accept=".csv, .xlsx, .xls"
            className="hidden"
          />

          <svg
            className="w-12 h-12 text-slate-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          {file ? (
            <div className="text-slate-200 font-medium">
              Selected: <span className="text-emerald-400">{file.name}</span>
              <p className="text-xs text-slate-400 mt-1">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base font-medium text-slate-300">
                Drag & drop your file here, or{" "}
                <span className="text-emerald-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Supports CSV, XLSX, XLS up to 50MB
              </p>
            </div>
          )}
        </div>

        {isUploading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Uploading raw data...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {message.text && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm border ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          {file && !isUploading && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="px-4 py-2 text-sm font-medium hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            disabled={!file || isUploading}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              !file || isUploading
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
            }`}
          >
            {isUploading ? "Processing..." : "Run Pipeline"}
          </button>
        </div>
      </form>
    </div>
  );
}
