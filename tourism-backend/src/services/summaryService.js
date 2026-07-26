const { loadJSON }          = require('../utils/dataSource');
const { getAnnualArrivals } = require('./annualService');
const { getModelMetrics }   = require('./metricsService');
const { getForecastResults } = require('./forecastService');

async function getMasterSummary() {
  return loadJSON('master_summary.json');
}

async function getDashboardSummary() {
  const [annual, metrics, forecast] = await Promise.all([
    getAnnualArrivals(),
    getModelMetrics(),
    getForecastResults(),
  ]);

  const latest    = annual[annual.length - 1] || {};
  const prev      = annual[annual.length - 2] || {};
  const bestModel = metrics.find(m => m.is_selected) || metrics[0] || {};
  const f2025     = forecast.filter(r => r.year === 2025);
  const f2026     = forecast.filter(r => r.year === 2026);
  const peak2025  = f2025.reduce((a,b) => (b.forecast||b.predicted_arrivals) > (a.forecast||a.predicted_arrivals||0) ? b : a, {});

  return {
    latest_year:           latest.year,
    latest_total:          latest.total,
    yoy_growth:            latest.pct_change,
    prev_year:             prev.year,
    prev_total:            prev.total,
    best_model:            { name: bestModel.model_name, mape: bestModel.mape, mae: bestModel.mae },
    forecast_2025_total:   f2025.reduce((s,r) => s + (r.forecast || Number(r.predicted_arrivals) || 0), 0),
    forecast_2026_total:   f2026.reduce((s,r) => s + (r.forecast || Number(r.predicted_arrivals) || 0), 0),
    peak_month_2025:       peak2025.month,
    peak_value_2025:       peak2025.forecast || peak2025.predicted_arrivals,
  };
}

module.exports = { getMasterSummary, getDashboardSummary };
