import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUpload,
  FaClipboardCheck,
  FaDatabase,
  FaFileAlt,
  FaArrowRight,
  FaCircle,
  FaSyncAlt,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaHistory,
  FaTrophy,
  FaChartLine,
  FaMountain,
} from "react-icons/fa";

const API_BASE = "http://localhost:5001";
const IMG = (name) => `${import.meta.env.BASE_URL}${name}`;

// Nepal photos from /public. Swap any filename to taste.
const HERO_IMAGE = "nepal-meadow.jpg";
const CARD_IMG = {
  upload: "pokhara.png", // any image in /public
  verify: "nepal-swing.jpg",
  forecast: "nepal-waterfall.jpg",
  download: "background.png",
};

// Reusable scenic header for an action card
const CardImage = ({ src, icon, arrow }) => (
  <div className="relative h-28 overflow-hidden">
    <img
      src={IMG(src)}
      alt=""
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
    <div className="absolute bottom-3 left-4 flex items-center justify-center w-10 h-10 rounded-xl bg-orange-400 text-white text-lg shadow-lg">
      {icon}
    </div>
    {arrow && (
      <FaArrowRight className="absolute top-3 right-4 text-white/90 group-hover:translate-x-1 transition-all" />
    )}
  </div>
);

// Small dependency-free count-up for stat numbers
const useCountUp = (target, run, duration = 1000) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) {
      setValue(0);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
};

const AdminHome = () => {
  const [info, setInfo] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [triggering, setTriggering] = useState(false);
  const [downloading, setDownloading] = useState("");
  const [actionMsg, setActionMsg] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = { Authorization: `Bearer ${token}` };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [infoRes, metricsRes] = await Promise.all([
        fetch(`${API_BASE}/api/dataset/info`, { headers: authHeader }),
        fetch(`${API_BASE}/api/forecast/metrics`, { headers: authHeader }),
      ]);
      const infoData = await infoRes.json();
      const metricsData = await metricsRes.json();
      if (infoData.success) {
        setInfo(infoData);
        setOnline(true);
      } else {
        setOnline(false);
      }
      if (metricsData.success) setMetrics(metricsData.data || []);
    } catch {
      setOnline(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const triggerForecast = async () => {
    setTriggering(true);
    setActionMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/forecast/trigger`, {
        method: "POST",
        headers: authHeader,
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg({
          type: "success",
          text: `${data.message} (status: ${data.status || "ok"})`,
        });
      } else {
        setActionMsg({
          type: "error",
          text: data.message || "Trigger failed.",
        });
      }
    } catch {
      setActionMsg({ type: "error", text: "Cannot connect to server." });
    }
    setTriggering(false);
  };

  const downloadModel = async (name) => {
    setDownloading(name);
    setActionMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/models/download/${name}`, {
        headers: authHeader,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setActionMsg({
          type: "error",
          text: err.message || `Could not download ${name} model.`,
        });
        setDownloading("");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.toLowerCase()}_model.pkl`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setActionMsg({ type: "success", text: `${name} model downloaded.` });
    } catch {
      setActionMsg({ type: "error", text: "Cannot connect to server." });
    }
    setDownloading("");
  };

  const ds = info?.dataset_info;
  const totalRecords = ds?.total_records ?? 0;
  const recordsCount = useCountUp(totalRecords, online);
  const recentUploads = ds?.recent_uploads || [];
  const selectedModel =
    metrics.find((m) => m.is_selected) || metrics[0] || null;

  const revealBase = "transition-all duration-500 ease-out";
  const revealState = mounted
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";
  const card =
    "border border-gray-500/40 rounded-2xl p-6 hover:border-orange-400/40 transition-all";

  const fmt = (n) =>
    typeof n === "number" ? n.toLocaleString("en-US") : (n ?? "—");
  const fmtDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    return isNaN(date)
      ? d
      : date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero banner (image + gradient, matches landing page) ── */}
      <div className="relative h-64 md:h-72 flex items-end overflow-hidden">
        <img
          src={IMG(HERO_IMAGE)}
          alt="Nepal landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/20" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pb-8">
          <div className="flex items-center gap-2 text-orange-400 text-xs uppercase tracking-widest mb-3">
            <FaMountain />
            <span>NepalFlow Control Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {greeting}, <span className="text-orange-400">Admin</span>
          </h1>
          <p className="text-gray-200 text-sm">{today}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 pb-12 -mt-2">
        {/* Server status banner */}
        <div
          style={{ transitionDelay: "50ms" }}
          className={`flex items-center justify-between rounded-2xl px-6 py-4 mt-6 mb-8 border ${revealBase} ${revealState} ${
            online
              ? "border-green-400/30 bg-green-400/10"
              : "border-red-400/30 bg-red-400/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <FaCircle
              className={`text-[10px] ${online ? "text-green-400 animate-pulse" : "text-red-400"}`}
            />
            <div>
              <p
                className={`font-semibold text-sm ${online ? "text-green-400" : "text-red-400"}`}
              >
                {loading
                  ? "Checking backend..."
                  : online
                    ? "Backend Connected"
                    : "Backend Offline"}
              </p>
              <p className="text-xs text-gray-400">
                {online
                  ? `Source: ${info?.source || "database"}`
                  : "Cannot reach the server. Make sure the backend is running on port 5001."}
              </p>
            </div>
          </div>
          <button
            onClick={loadData}
            className="text-xs sm:text-sm border border-orange-400/40 text-orange-400 hover:bg-orange-400/10 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Action feedback */}
        {actionMsg && (
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-3 mb-6 text-sm border ${
              actionMsg.type === "success"
                ? "bg-green-400/10 border-green-400/30 text-green-400"
                : "bg-red-400/10 border-red-400/30 text-red-400"
            }`}
          >
            {actionMsg.type === "success" ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
            {actionMsg.text}
          </div>
        )}

        {/* ── Dataset overview ── */}
        <h2 className="text-lg font-semibold mb-1">Dataset Overview</h2>
        <p className="text-gray-400 text-sm mb-4">
          {ds?.name || "Nepal Tourism Statistics"}
          {ds?.source ? ` · ${ds.source}` : ""}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div
            style={{ transitionDelay: "100ms" }}
            className={`${card} ${revealBase} ${revealState}`}
          >
            <div className="flex items-center gap-2 text-orange-400 mb-3">
              <FaFileAlt />
              <span className="text-xs uppercase tracking-wider">
                Total Records
              </span>
            </div>
            <p className="text-3xl font-bold text-orange-400">
              {online ? fmt(recordsCount) : "—"}
            </p>
          </div>
          <div
            style={{ transitionDelay: "150ms" }}
            className={`${card} ${revealBase} ${revealState}`}
          >
            <div className="flex items-center gap-2 text-orange-400 mb-3">
              <FaCalendarAlt />
              <span className="text-xs uppercase tracking-wider">
                Years Covered
              </span>
            </div>
            <p className="text-2xl font-bold">
              {online ? ds?.years_covered || "—" : "—"}
            </p>
          </div>
          <div
            style={{ transitionDelay: "200ms" }}
            className={`${card} ${revealBase} ${revealState}`}
          >
            <div className="flex items-center gap-2 text-orange-400 mb-3">
              <FaDatabase />
              <span className="text-xs uppercase tracking-wider">
                Data Source
              </span>
            </div>
            <p className="text-sm text-gray-400 break-words">
              {online ? ds?.source || "—" : "—"}
            </p>
          </div>
        </div>

        {/* ── Model status + comparison ── */}
        <h2 className="text-lg font-semibold mb-4">Forecasting Model</h2>
        <div
          style={{ transitionDelay: "250ms" }}
          className={`${card} mb-8 ${revealBase} ${revealState}`}
        >
          {selectedModel ? (
            <>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-400/15 text-orange-400 text-lg">
                    <FaChartLine />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Active Model
                    </p>
                    <p className="text-xl font-bold text-orange-400">
                      {selectedModel.model_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <FaTrophy />
                  <span>Selected</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 text-left border-b border-gray-500/40">
                      <th className="py-2 pr-4 font-semibold">Model</th>
                      <th className="py-2 px-4 font-semibold">MAE</th>
                      <th className="py-2 px-4 font-semibold">RMSE</th>
                      <th className="py-2 px-4 font-semibold">MAPE</th>
                      <th className="py-2 pl-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((m) => (
                      <tr
                        key={m.model_name}
                        className={`border-b border-gray-500/20 ${
                          m.is_selected
                            ? "text-orange-400 font-semibold"
                            : "text-foreground"
                        }`}
                      >
                        <td className="py-2 pr-4">{m.model_name}</td>
                        <td className="py-2 px-4">{fmt(Math.round(m.mae))}</td>
                        <td className="py-2 px-4">{fmt(Math.round(m.rmse))}</td>
                        <td className="py-2 px-4">{m.mape?.toFixed(2)}%</td>
                        <td className="py-2 pl-4">
                          {m.is_selected ? (
                            <span className="text-green-400">Selected</span>
                          ) : (
                            <span className="text-gray-400">Baseline</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {selectedModel.description && (
                <p className="text-xs text-gray-400 mt-4">
                  {selectedModel.description}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">
              {online
                ? "No model metrics available yet."
                : "Connect the backend to view model diagnostics."}
            </p>
          )}
        </div>

        {/* ── Admin actions ── */}
        <h2 className="text-lg font-semibold mb-4">Admin Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Upload */}
          <div
            style={{ transitionDelay: "300ms" }}
            className={`${revealBase} ${revealState}`}
          >
            <Link
              to="/adminupload"
              className="group block border border-gray-500/40 hover:border-orange-400 rounded-2xl overflow-hidden transition-colors h-full"
            >
              <CardImage src={CARD_IMG.upload} icon={<FaUpload />} arrow />
              <div className="p-6 pt-4">
                <h3 className="font-semibold text-lg mb-1">Upload Dataset</h3>
                <p className="text-sm text-gray-400">
                  Add a new tourism dataset in CSV or XLSX format.
                </p>
              </div>
            </Link>
          </div>

          {/* Verify */}
          <div
            style={{ transitionDelay: "350ms" }}
            className={`${revealBase} ${revealState}`}
          >
            <Link
              to="/adminverify"
              className="group block border border-gray-500/40 hover:border-orange-400 rounded-2xl overflow-hidden transition-colors h-full"
            >
              <CardImage
                src={CARD_IMG.verify}
                icon={<FaClipboardCheck />}
                arrow
              />
              <div className="p-6 pt-4">
                <h3 className="font-semibold text-lg mb-1">Verify Dataset</h3>
                <p className="text-sm text-gray-400">
                  Confirm the latest upload was stored correctly.
                </p>
              </div>
            </Link>
          </div>

          {/* Re-run forecast */}
          <div
            style={{ transitionDelay: "400ms" }}
            className={`${revealBase} ${revealState}`}
          >
            <button
              onClick={triggerForecast}
              disabled={triggering}
              className="group w-full text-left border border-gray-500/40 hover:border-orange-400 rounded-2xl overflow-hidden transition-colors h-full disabled:opacity-60"
            >
              <CardImage
                src={CARD_IMG.forecast}
                icon={
                  <FaSyncAlt className={triggering ? "animate-spin" : ""} />
                }
              />
              <div className="p-6 pt-4">
                <h3 className="font-semibold text-lg mb-1">
                  {triggering ? "Re-running..." : "Re-run Forecast"}
                </h3>
                <p className="text-sm text-gray-400">
                  Trigger the SARIMAX model to regenerate forecasts.
                </p>
              </div>
            </button>
          </div>

          {/* Download model */}
          <div
            style={{ transitionDelay: "450ms" }}
            className={`${revealBase} ${revealState}`}
          >
            <div className="group border border-gray-500/40 hover:border-orange-400/40 rounded-2xl overflow-hidden transition-all h-full">
              <CardImage src={CARD_IMG.download} icon={<FaDownload />} />
              <div className="p-6 pt-4">
                <h3 className="font-semibold text-lg mb-1">Download Model</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Export a trained model as a .pkl file.
                </p>
                <div className="flex gap-2">
                  {["SARIMAX", "ARIMA"].map((name) => (
                    <button
                      key={name}
                      onClick={() => downloadModel(name)}
                      disabled={downloading === name}
                      className="flex-1 border border-orange-400/40 text-orange-400 hover:bg-orange-400/10 text-sm font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {downloading === name ? "..." : name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Import history ── */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaHistory className="text-orange-400" /> Recent Imports
        </h2>
        <div
          style={{ transitionDelay: "500ms" }}
          className={`${card} mb-12 ${revealBase} ${revealState}`}
        >
          {recentUploads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-left border-b border-gray-500/40">
                    <th className="py-2 pr-4 font-semibold">File</th>
                    <th className="py-2 px-4 font-semibold">Records</th>
                    <th className="py-2 px-4 font-semibold">Status</th>
                    <th className="py-2 pl-4 font-semibold">Imported</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.map((row) => (
                    <tr
                      key={row.log_id}
                      className="border-b border-gray-500/20"
                    >
                      <td className="py-2 pr-4 break-all">
                        {row.file_name || "—"}
                      </td>
                      <td className="py-2 px-4">
                        {fmt(Number(row.records_imported))}
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={
                            (row.status || "").toLowerCase() === "success"
                              ? "text-green-400"
                              : "text-gray-400"
                          }
                        >
                          {row.status || "—"}
                        </span>
                      </td>
                      <td className="py-2 pl-4 text-gray-400">
                        {fmtDate(row.imported_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              {online
                ? "No imports logged yet. Upload a dataset to see it here."
                : "Connect the backend to view import history."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
