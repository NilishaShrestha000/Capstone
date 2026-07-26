const pool = require('../config/db');
const { loadJSON, isTablePopulated } = require('../utils/dataSource');

async function getPurposeOfVisit(year = null) {
  if (await isTablePopulated('purpose_of_visit')) {
    let query = `SELECT year, holiday, trekking, business, pilgrimage,
                        official, conference, others, total
                 FROM "Analytics".purpose_of_visit`;
    const params = [];
    if (year) { query += ' WHERE year=$1'; params.push(year); }
    query += ' ORDER BY year';
    const result = await pool.query(query, params);
    return result.rows.map(r => ({
      year:       r.year,
      holiday:    Number(r.holiday),
      trekking:   Number(r.trekking),
      business:   Number(r.business),
      pilgrimage: Number(r.pilgrimage),
      official:   Number(r.official),
      conference: Number(r.conference),
      others:     Number(r.others),
      total:      Number(r.total),
    }));
  }
  const all = loadJSON('purpose_of_visit.json').data;
  const normalized = all.map(r => ({
    ...r,
    conference: r.coference,  // fix JSON typo
  }));
  return year ? normalized.filter(r => r.year === Number(year)) : normalized;
}

module.exports = { getPurposeOfVisit };
