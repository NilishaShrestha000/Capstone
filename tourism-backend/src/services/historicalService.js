const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];

async function getHistoricalMonthly(year = null) {
  if (await isTablePopulated('monthly_arrivals')) {
    // DB stores wide format (one row per year) — expand to long format for API
    let query = `SELECT year, jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,"dec", covid_dummy
                 FROM "Analytics".monthly_arrivals`;
    const params = [];
    if (year) { query += ' WHERE year=$1'; params.push(year); }
    query += ' ORDER BY year';

    const result = await pool.query(query, params);
    const expanded = [];
    for (const row of result.rows) {
      MONTHS.forEach((m, i) => {
        expanded.push({
          date:              `${row.year}-${String(i+1).padStart(2,'0')}-01`,
          year:              row.year,
          month:             m.charAt(0).toUpperCase() + m.slice(1),
          month_number:      i + 1,
          arrivals:          Number(row[m] || 0),
          arrivals_smoothed: Number(row[m] || 0),
          covid_dummy:       row.covid_dummy || 0,
        });
      });
    }
    return expanded;
  }
  // JSON fallback
  const all = loadJSON('historical_monthly.json').data;
  return year ? all.filter(r => r.year === Number(year)) : all;
}

async function getAvailableYears() {
  if (await isTablePopulated('monthly_arrivals')) {
    const result = await pool.query(
      `SELECT DISTINCT year FROM "Analytics".monthly_arrivals ORDER BY year`
    );
    return result.rows.map(r => r.year);
  }
  const data = loadJSON('historical_monthly.json').data;
  return [...new Set(data.map(r => r.year))].sort((a,b) => a-b);
}

module.exports = { getHistoricalMonthly, getAvailableYears };
