const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

async function getModelMetrics() {
  if (await isTablePopulated('model_evaluation')) {
    // Pasang's table: model_evaluation (not model_metrics)
    const result = await pool.query(
      `SELECT model_name, rmse, mae, mape
       FROM "Analytics".model_evaluation ORDER BY mae ASC`
    );
    const raw = loadJSON('model_metrics.json');
    return result.rows.map(r => ({
      model_name:           r.model_name,
      mae:                  Number(r.mae),
      rmse:                 Number(r.rmse),
      mape:                 Number(r.mape),
      is_selected:          r.model_name === raw.selected_model,
      residuals_random:     raw.models?.[r.model_name]?.residuals_random || false,
      description:          raw.models?.[r.model_name]?.description || '',
    }));
  }
  const raw = loadJSON('model_metrics.json');
  return Object.entries(raw.models||{}).map(([name, m]) => ({
    model_name:       name,
    mae:              m.MAE,
    rmse:             m.RMSE,
    mape:             m.MAPE,
    residuals_random: m.residuals_random,
    description:      m.description,
    is_selected:      name === raw.selected_model,
  }));
}

async function getStationarityResults() {
  // No DB table for this — always from JSON
  const raw = loadJSON('stationarity_results.json');
  return Object.entries(raw.results||{}).map(([key, r]) => ({
    key,
    test_name:     raw.test,
    series_label:  r.label,
    adf_statistic: r.adf_statistic || null,
    p_value:       r.p_value,
    is_stationary: r.is_stationary,
    note:          r.note || null,
  }));
}

async function getOutlierDetection() {
  // No DB table for this — always from JSON
  const raw = loadJSON('outlier_detection.json');
  return {
    method:               raw.method,
    threshold:            raw.threshold,
    total_months_checked: raw.total_months_checked,
    outliers_found:       raw.outliers_found,
    outliers:             raw.outliers || [],
  };
}

module.exports = { getModelMetrics, getStationarityResults, getOutlierDetection };
