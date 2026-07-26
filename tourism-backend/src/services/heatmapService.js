const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_KEYS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

// Crowd level thresholds derived from historical data
function getCrowdLevel(value, avg) {
  if (value >= avg * 1.3) return 'High';
  if (value >= avg * 0.8) return 'Medium';
  return 'Normal';
}

async function getHeatmapData(year = null) {
  if (await isTablePopulated('monthly_arrivals')) {
    let query = `SELECT year, jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,"dec"
                 FROM "Analytics".monthly_arrivals`;
    const params = [];
    if (year) { query += ' WHERE year=$1'; params.push(year); }
    query += ' ORDER BY year';
    const result = await pool.query(query, params);

    // Calculate overall average for crowd level classification
    let totalSum = 0, totalCount = 0;
    for (const row of result.rows) {
      for (const m of MONTH_KEYS) {
        if (row[m]) { totalSum += Number(row[m]); totalCount++; }
      }
    }
    const avg = totalCount > 0 ? totalSum / totalCount : 50000;

    const data = result.rows.map(row => ({
      year: row.year,
      monthly_arrivals: Object.fromEntries(
        MONTH_KEYS.map((m, i) => [
          MONTHS[i],
          {
            value:       Number(row[m] || 0),
            crowd_level: getCrowdLevel(Number(row[m] || 0), avg),
          }
        ])
      ),
    }));
    return { months: MONTHS, data };
  }
  // JSON fallback
  const raw = loadJSON('heatmap_data.json');
  if (year) return { months: MONTHS, data: raw.data.filter(r => r.year === Number(year)) };
  return raw;
}

module.exports = { getHeatmapData };
