const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

async function getAnnualArrivals() {
  if (await isTablePopulated('annual_arrivals')) {
    const result = await pool.query(
      `SELECT year, third_country, india, total, pct_change
       FROM "Analytics".annual_arrivals ORDER BY year ASC`
    );
    // Normalize: rename india → indian to keep API consistent
    return result.rows.map(r => ({
      year:          r.year,
      total:         Number(r.total),
      third_country: Number(r.third_country),
      indian:        Number(r.india),
      pct_change:    Number(r.pct_change),
    }));
  }
  return loadJSON('annual_arrivals.json').data;
}

module.exports = { getAnnualArrivals };
