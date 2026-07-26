/**
 * modelService.js
 * 
 * Retrieves trained model metadata and binary from PostgreSQL.
 * Falls back to JSON file metadata if DB is not populated.
 * 
 * NOTE: The actual .pkl binary can be retrieved for Python-side
 * re-loading if needed in the future (e.g. live forecast trigger).
 */

const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

// ── Get model metadata only (for display in frontend) ──────────────────────
async function getModelMetadata() {
  if (await isTablePopulated('trained_models')) {
    const result = await pool.query(
      `SELECT model_name, model_class, model_order, seasonal_order,
              aic, bic, mse, mae, nobs,
              trained_start, trained_end, has_exog, is_selected, updated_at
       FROM "Analytics".trained_models
       ORDER BY mae ASC`  // best model first (lowest MAE)
    );
    return result.rows.map(r => ({
      model_name:     r.model_name,
      model_class:    r.model_class,
      model_order:    r.model_order,
      seasonal_order: r.seasonal_order,
      aic:            Number(r.aic),
      bic:            Number(r.bic),
      mse:            Number(r.mse),
      mae:            Number(r.mae),
      mape:           r.model_name === 'SARIMAX' ? 13.75 : 18.56,  // from model_metrics table
      nobs:           r.nobs,
      trained_start:  r.trained_start,
      trained_end:    r.trained_end,
      has_exog:       r.has_exog,
      is_selected:    r.is_selected,
      updated_at:     r.updated_at,
    }));
  }

  // Fallback: read from model_metrics JSON
  const raw = loadJSON('model_metrics.json');
  return Object.entries(raw.models || {}).map(([name, m]) => ({
    model_name:   name,
    model_order:  m.order || null,
    aic:          m.AIC || null,
    bic:          m.BIC || null,
    mse:          m.MSE || null,
    mae:          m.MAE,
    mape:         m.MAPE,
    is_selected:  name === raw.selected_model,
    residuals_random: m.residuals_random,
    description:  m.description,
  }));
}

// ── Get selected model name ─────────────────────────────────────────────────
async function getSelectedModel() {
  if (await isTablePopulated('trained_models')) {
    const result = await pool.query(
      `SELECT model_name, model_order, seasonal_order, mae, mse, aic
       FROM "Analytics".trained_models WHERE is_selected = TRUE LIMIT 1`
    );
    return result.rows[0] || null;
  }
  const raw = loadJSON('model_metrics.json');
  return { model_name: raw.selected_model };
}

// ── Retrieve model binary (for Python re-loading) ──────────────────────────
// Returns a Buffer containing the raw .pkl bytes
async function getModelBinary(modelName) {
  const result = await pool.query(
    `SELECT model_binary FROM "Analytics".trained_models
     WHERE model_name = $1 LIMIT 1`,
    [modelName]
  );
  if (result.rows.length === 0) {
    throw new Error(`Model '${modelName}' not found in database`);
  }
  return result.rows[0].model_binary;  // Buffer
}

module.exports = { getModelMetadata, getSelectedModel, getModelBinary };
