import { useState, useEffect } from "react";
import { FaCheckCircle, FaDatabase, FaFileAlt } from "react-icons/fa";

const AdminVerify = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchDatasetInfo();
    }, []);

    const fetchDatasetInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5001/api/dataset/info", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setInfo(data);
            } else {
                setError(data.message || "Failed to load dataset info.");
            }
        } catch (err) {
            setError("Cannot connect to server. Make sure backend is running.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">Verify Dataset</h1>
                <p className="text-gray-400 text-sm mb-8">
                    Check the current dataset status and confirm uploads were processed correctly.
                </p>

                {loading && (
                    <div className="text-gray-400 text-sm">Loading dataset info...</div>
                )}

                {error && (
                    <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {info && (
                    <div className="space-y-6">

                        {/* Status card */}
                        <div className="border border-green-400/30 bg-green-400/10 rounded-2xl p-6 flex items-center gap-4">
                            <FaCheckCircle className="text-green-400 text-2xl" />
                            <div>
                                <p className="font-semibold text-green-400">Dataset Connected</p>
                                <p className="text-sm text-gray-400">Backend is receiving data correctly</p>
                            </div>
                        </div>

                        {/* Info cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-gray-500/40 rounded-2xl p-6">
                                <div className="flex items-center gap-2 text-orange-400 mb-2">
                                    <FaDatabase />
                                    <span className="text-xs uppercase tracking-wider">Upload Directory</span>
                                </div>
                                <p className="text-sm text-gray-400">{info.uploadDir || "uploads/"}</p>
                            </div>
                            <div className="border border-gray-500/40 rounded-2xl p-6">
                                <div className="flex items-center gap-2 text-orange-400 mb-2">
                                    <FaFileAlt />
                                    <span className="text-xs uppercase tracking-wider">Files Uploaded</span>
                                </div>
                                <p className="text-2xl font-bold text-orange-400">
                                    {info.fileCount ?? info.count ?? "—"}
                                </p>
                            </div>
                        </div>

                        {/* Refresh button */}
                        <button
                            onClick={fetchDatasetInfo}
                            className="w-full border border-orange-400/40 text-orange-400 hover:bg-orange-400/10 font-semibold py-3 rounded-lg transition-colors"
                        >
                            Refresh Status
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminVerify;