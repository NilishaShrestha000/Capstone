const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

async function getLengthOfStay(year = null) {
  if (await isTablePopulated('length_of_stay')) {
    // Pasang's columns: year, total, growth_rate, by_air_number, by_air_pct,
    //                   by_land_number, by_land_pct, avg_stay_days
    let query = `SELECT year, total, growth_rate, by_air_number, by_air_pct,
                        by_land_number, by_land_pct, avg_stay_days
                 FROM "Analytics".length_of_stay`;
    const params = [];
    if (year) { query += ' WHERE year=$1'; params.push(year); }
    query += ' ORDER BY year';
    const result = await pool.query(query, params);
    return result.rows.map(r => ({
      year:           r.year,
      total_arrivals: Number(r.total),      // normalize to match JSON name
      avg_stay_days:  Number(r.avg_stay_days),
      by_air_number:  Number(r.by_air_number),
      by_land_number: Number(r.by_land_number),
      by_air_pct:     Number(r.by_air_pct),
      by_land_pct:    Number(r.by_land_pct),
    }));
  }
  const all = loadJSON('length_of_stay.json').data;
  return year ? all.filter(r => r.year === Number(year)) : all;
}

module.exports = { getLengthOfStay };
