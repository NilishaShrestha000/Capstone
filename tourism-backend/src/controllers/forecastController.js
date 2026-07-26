const forecastService = require('../services/forecastService');
const metricsService  = require('../services/metricsService');

// GET /api/forecast/results?year=2025
const getForecastResults = async (req, res) => {
  try {
    const data = await forecastService.getForecastResults(req.query.year || null);
    const meta = await forecastService.getForecastMeta();
    res.json({ success: true, ...meta, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching forecast results', error: err.message });
  }
};

// GET /api/forecast/comparison
const getComparisonData = async (req, res) => {
  try {
    const data = await forecastService.getComparisonData();
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching comparison data', error: err.message });
  }
};

// GET /api/forecast/metrics
const getModelMetrics = async (req, res) => {
  try {
    const data = await metricsService.getModelMetrics();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching model metrics', error: err.message });
  }
};

// GET /api/forecast/stationarity
const getStationarityResults = async (req, res) => {
  try {
    const data = await metricsService.getStationarityResults();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching stationarity results', error: err.message });
  }
};

// GET /api/forecast/outliers
const getOutlierDetection = async (req, res) => {
  try {
    const data = await metricsService.getOutlierDetection();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching outlier data', error: err.message });
  }
};

// POST /api/forecast/trigger  (admin only)
const triggerForecast = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Forecast trigger received. Python SARIMAX integration pending.',
    status: 'pending',
    model_used: 'SARIMAX',
    triggered_by: req.user?.username || 'admin',
  });
};

module.exports = {
  getForecastResults, getComparisonData, getModelMetrics,
  getStationarityResults, getOutlierDetection, triggerForecast,
};
