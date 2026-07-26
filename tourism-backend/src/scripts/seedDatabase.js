/**
 * seedDatabase.js
 * Imports all JSON output files into Pasang's exact PostgreSQL schema.
 * Run: npm run seed
 *
 * Pasang's Analytics schema tables:
 *   annual_arrivals     → year, third_country, india, total, pct_change
 *   monthly_arrivals    → year, jan-dec columns, total, covid_dummy
 *   forecast_results    → forecast_id, forecast_year, forecast_month,
 *                         predicted_arrivals, lower_bound, upper_bound, model_type
 *   purpose_of_visit    → year, holiday, trekking, business, pilgrimage,
 *                         official, conference, others, total
 *   length_of_stay      → year, total, growth_rate, by_air_number, by_air_pct,
 *                         by_land_number, by_land_pct, avg_stay_days
 *   model_evaluation    → evaluation_id, model_name, rmse, mae, mape, forecast_id
 *   import_logs         → log_id, file_name, imported_at, status, records_imported
 */

const pool = require('../config/db');
const path = require('path');
const fs   = require('fs');

const DATA_DIR = path.join(__dirname, '../data');
function load(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
}

// ── 1. annual_arrivals ──────────────────────────────────────────────────────
// JSON:  year, total, third_country, indian, pct_change
// DB:    year, total, third_country, india,  pct_change
async function seedAnnualArrivals() {
  const { data } = load('annual_arrivals.json');
  for (const row of data) {
    await pool.query(
      `INSERT INTO "Analytics".annual_arrivals
         (year, third_country, india, total, pct_change)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (year) DO UPDATE
         SET third_country=$2, india=$3, total=$4, pct_change=$5`,
      [row.year, row.third_country, row.indian, row.total, row.pct_change]
    );
  }
  console.log(`  ✓ annual_arrivals      : ${data.length} rows`);
}

// ── 2. monthly_arrivals (wide format — one row per year) ────────────────────
// JSON:  date, year, month, month_number, arrivals, arrivals_smoothed, covid_dummy
// DB:    year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, total, covid_dummy
async function seedMonthlyArrivals() {
  const { data } = load('historical_monthly.json');

  // Group rows by year (each month is a separate JSON row → collapse to one DB row)
  const byYear = {};
  for (const row of data) {
    if (!byYear[row.year]) {
      byYear[row.year] = { year: row.year, covid_dummy: 0 };
    }
    byYear[row.year][row.month.toLowerCase()] = row.arrivals;
    // If any month in that year has covid_dummy=1, mark the year
    if (row.covid_dummy === 1) byYear[row.year].covid_dummy = 1;
  }

  for (const yr of Object.values(byYear)) {
    const total = ['jan','feb','mar','apr','may','jun',
                   'jul','aug','sep','oct','nov','dec']
                  .reduce((s, m) => s + (yr[m] || 0), 0);

    await pool.query(
      `INSERT INTO "Analytics".monthly_arrivals
         (year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, "dec", total, covid_dummy)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT (year) DO UPDATE SET
         jan=$2,feb=$3,mar=$4,apr=$5,may=$6,jun=$7,
         jul=$8,aug=$9,sep=$10,oct=$11,nov=$12,"dec"=$13,
         total=$14,covid_dummy=$15`,
      [yr.year,
       yr.jan||0, yr.feb||0, yr.mar||0, yr.apr||0,
       yr.may||0, yr.jun||0, yr.jul||0, yr.aug||0,
       yr.sep||0, yr.oct||0, yr.nov||0, yr.dec||0,
       total, yr.covid_dummy]
    );
  }
  console.log(`  ✓ monthly_arrivals     : ${Object.keys(byYear).length} rows (years)`);
}

// ── 3. forecast_results ─────────────────────────────────────────────────────
// JSON:  date, year, month, month_number, forecast, lower_95, upper_95, crowd_level
// DB:    forecast_id(auto), forecast_year, forecast_month, predicted_arrivals,
//        lower_bound, upper_bound, model_type
//        forecast_date is GENERATED (auto from year+month — do NOT insert)
async function seedForecastResults() {
  const raw     = load('forecast_2025_2026.json');
  const allRows = [...(raw.forecast_2025 || []), ...(raw.forecast_2026 || [])];

  // Clear existing forecast data first to avoid duplicates
  await pool.query(`DELETE FROM "Analytics".forecast_results`);

  for (const row of allRows) {
    await pool.query(
      `INSERT INTO "Analytics".forecast_results
         (forecast_year, forecast_month, predicted_arrivals,
          lower_bound, upper_bound, model_type)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [row.year, row.month_number, row.forecast,
       row.lower_95, row.upper_95, raw.model_used]
    );
  }
  console.log(`  ✓ forecast_results     : ${allRows.length} rows (2025-2026)`);
}

// ── 4. purpose_of_visit ─────────────────────────────────────────────────────
// JSON:  year, holiday, trekking, pilgrimage, business, official, coference, others, total
// DB:    year, holiday, trekking, business, pilgrimage, official, conference, others, total
async function seedPurposeOfVisit() {
  const { data } = load('purpose_of_visit.json');
  for (const row of data) {
    await pool.query(
      `INSERT INTO "Analytics".purpose_of_visit
         (year, holiday, trekking, business, pilgrimage, official, conference, others, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (year) DO UPDATE SET
         holiday=$2, trekking=$3, business=$4, pilgrimage=$5,
         official=$6, conference=$7, others=$8, total=$9`,
      [row.year, row.holiday, row.trekking, row.business,
       row.pilgrimage, row.official, row.coference, row.others, row.total]
    );
  }
  console.log(`  ✓ purpose_of_visit     : ${data.length} rows`);
}

// ── 5. length_of_stay ───────────────────────────────────────────────────────
// JSON:  year, total_arrivals, avg_stay_days, by_air_number, by_land_number, by_air_pct, by_land_pct
// DB:    year, total, growth_rate, by_air_number, by_air_pct, by_land_number, by_land_pct, avg_stay_days
async function seedLengthOfStay() {
  const { data } = load('length_of_stay.json');
  for (const row of data) {
    await pool.query(
      `INSERT INTO "Analytics".length_of_stay
         (year, total, growth_rate, by_air_number, by_air_pct,
          by_land_number, by_land_pct, avg_stay_days)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (year) DO UPDATE SET
         total=$2, growth_rate=$3, by_air_number=$4, by_air_pct=$5,
         by_land_number=$6, by_land_pct=$7, avg_stay_days=$8`,
      [row.year,
       row.total_arrivals,  // JSON: total_arrivals → DB: total
       row.pct_change || null, // JSON has no growth_rate, use null
       row.by_air_number, row.by_air_pct,
       row.by_land_number, row.by_land_pct,
       row.avg_stay_days]
    );
  }
  console.log(`  ✓ length_of_stay       : ${data.length} rows`);
}

// ── 6. model_evaluation ─────────────────────────────────────────────────────
// JSON:  model_metrics.json → models: { ARIMA:{MAE,RMSE,MAPE}, SARIMAX:{...} }
// DB:    evaluation_id(auto), model_name, rmse, mae, mape, forecast_id
async function seedModelEvaluation() {
  const raw = load('model_metrics.json');

  // Clear and re-insert
  await pool.query(`DELETE FROM "Analytics".model_evaluation`);

  for (const [name, m] of Object.entries(raw.models || {})) {
    await pool.query(
      `INSERT INTO "Analytics".model_evaluation (model_name, rmse, mae, mape)
       VALUES ($1,$2,$3,$4)`,
      [name, m.RMSE, m.MAE, m.MAPE]
    );
  }
  console.log(`  ✓ model_evaluation     : ${Object.keys(raw.models||{}).length} rows`);
}

// ── 7. import_logs (log the seed run itself) ────────────────────────────────
async function logImport() {
  await pool.query(
    `INSERT INTO "Analytics".import_logs (file_name, status, records_imported)
     VALUES ($1,$2,$3)`,
    ['JSON_seed_run', 'success', 1]
  );
  console.log(`  ✓ import_logs          : seed run logged`);
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Tourism DB Seed');

  try {
    await seedAnnualArrivals();
    await seedMonthlyArrivals();
    await seedForecastResults();
    await seedPurposeOfVisit();
    await seedLengthOfStay();
    await seedModelEvaluation();
    await logImport();


    console.log('  All tables seeded successfully!');
    
  } catch (err) {
    console.error('\n✗ Seed failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
