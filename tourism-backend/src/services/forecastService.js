const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec'];

async function getForecastResults(year = null) {
  if (await isTablePopulated('forecast_results')) {
    // Pasang's columns: forecast_id, forecast_year, forecast_month,
    //                   predicted_arrivals, lower_bound, upper_bound,
    //                   model_type, forecast_date (generated)
    let query = `SELECT forecast_id, forecast_year, forecast_month,
                        predicted_arrivals, lower_bound, upper_bound,
                        model_type, forecast_date
                 FROM "Analytics".forecast_results`;
    const params = [];
    if (year) { query += ' WHERE forecast_year=$1'; params.push(year); }
    query += ' ORDER BY forecast_year, forecast_month';

    const result = await pool.query(query, params);
    return result.rows.map(r => ({
      forecast_id:        r.forecast_id,
      date:               r.forecast_date,
      year:               r.forecast_year,
      month:              MONTH_NAMES[r.forecast_month - 1],
      month_number:       r.forecast_month,
      forecast:           Number(r.predicted_arrivals),
      lower_95:           Number(r.lower_bound),
      upper_95:           Number(r.upper_bound),
      model_used:         r.model_type,
    }));
  }
  // JSON fallback
  const raw     = loadJSON('forecast_2025_2026.json');
  const all     = [...(raw.forecast_2025||[]), ...(raw.forecast_2026||[])];
  return year ? all.filter(r => r.year === Number(year)) : all;
}

async function getForecastMeta() {
  const raw = loadJSON('forecast_2025_2026.json');
  return {
    model_used:          raw.model_used,
    model_order:         raw.model_order,
    trained_on:          raw.trained_on,
    forecast_generated:  raw.forecast_generated,
    annual_totals:       raw.annual_totals,
  };
}

async function getComparisonData() {
  const historicalService = require('./historicalService');
  const [historical, forecast] = await Promise.all([
    historicalService.getHistoricalMonthly(),
    getForecastResults(),
  ]);
  const latestYear = Math.max(...historical.map(r => r.year));
  return {
    historical_year: latestYear,
    historical:      historical.filter(r => r.year === latestYear),
    forecasted:      forecast,
  };
}

module.exports = { getForecastResults, getForecastMeta, getComparisonData };
