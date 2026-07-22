import { useState } from "react";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminUpload = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus(null);
        setMessage("");
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus("error");
            setMessage("Please select a file first.");
            return;
        }

        const allowedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        if (!allowedTypes.includes(file.type) && !file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
            setStatus("error");
            setMessage("Invalid file type. Only CSV and XLSX files are accepted.");
            return;
        }

        setLoading(true);
        setStatus(null);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("http://localhost:5001/api/dataset/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setMessage("Dataset uploaded successfully!");
            } else {
                setStatus("error");
                setMessage(data.message || "Upload failed.");
            }
        } catch (err) {
            setStatus("error");
            setMessage("Cannot connect to server. Make sure backend is running.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">Upload Dataset</h1>
                <p className="text-gray-400 text-sm mb-8">
                    Upload a new tourism dataset in CSV or XLSX format. The system will process and store it automatically.
                </p>

                <div className="border border-gray-500/40 rounded-2xl p-8 space-y-6">

                    {/* File Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                            Select File
                        </label>
                        <input
                            type="file"
                            accept=".csv,.xlsx"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-400/15 file:text-orange-400 file:font-semibold hover:file:bg-orange-400/25 cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">Accepted formats: CSV, XLSX</p>
                    </div>

                    {/* Selected file info */}
                    {file && (
                        <div className="bg-orange-400/10 border border-orange-400/30 rounded-lg px-4 py-3 text-sm text-orange-400">
                            Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        </div>
                    )}

                    {/* Status message */}
                    {status === "success" && (
                        <div className="flex items-center gap-2 bg-green-400/10 border border-green-400/30 rounded-lg px-4 py-3 text-green-400 text-sm">
                            <FaCheckCircle />
                            {message}
                        </div>
                    )}
                    {status === "error" && (
                        <div className="flex items-center gap-2 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                            <FaTimesCircle />
                            {message}
                        </div>
                    )}

                    {/* Upload button */}
                    <button
                        onClick={handleUpload}
                        disabled={loading || !file}
                        className="w-full flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <FaUpload />
                        {loading ? "Uploading..." : "Upload Dataset"}
                    </button>
                </div>

                {/* Instructions */}
                <div className="mt-8 border border-gray-500/40 rounded-2xl p-6 space-y-3">
                    <h2 className="font-semibold text-lg">Instructions</h2>
                    <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                        <li>File must be in CSV or XLSX format</li>
                        <li>Dataset should contain tourism arrival data</li>
                        <li>Required columns: year, month, arrivals</li>
                        <li>After upload, go to Verify Dataset to confirm the data was stored correctly</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminUpload;