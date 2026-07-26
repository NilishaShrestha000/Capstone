/**
 * saveModels.js
 * 
 * Reads arima_model.pkl and sarimax_final_model.pkl from the models/ folder
 * and saves them into the Analytics.trained_models table in PostgreSQL.
 * 
 * Usage: node src/scripts/saveModels.js
 * 
 * Run this ONCE after running schema_addition.sql in pgAdmin.
 */

const pool  = require('../config/db');
const fs    = require('fs');
const path  = require('path');

const MODELS_DIR = path.join(__dirname, '../../models');

const MODEL_METADATA = {
  arima_model: {
    model_name:     'ARIMA',
    model_class:    'ARIMAResultsWrapper',
    model_order:    '(2, 1, 2)',
    seasonal_order: '(0, 0, 0, 0)',
    aic:            7023.0660,
    bic:            7041.9542,
    mse:            156135560.5762,
    mae:            8601.1007,
    nobs:           324,
    trained_start:  '1996-01-01',
    trained_end:    '2022-12-01',
    has_exog:       false,
    is_selected:    false,
  },
  sarimax_final_model: {
    model_name:     'SARIMAX',
    model_class:    'SARIMAXResultsWrapper',
    model_order:    '(3, 1, 3)',
    seasonal_order: '(1, 1, 0, 12)',
    aic:            6865.9557,
    bic:            6899.8706,
    mse:            112627165.7158,
    mae:            6845.0274,
    nobs:           348,
    trained_start:  '1996-01-01',
    trained_end:    '2024-12-01',
    has_exog:       true,
    is_selected:    true,  // SARIMAX is the selected model
  },
};

async function saveModel(filename, meta) {
  const filePath = path.join(MODELS_DIR, `${filename}.pkl`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ✗ File not found: ${filePath}`);
    return false;
  }

  const binary = fs.readFileSync(filePath);  // read as Buffer (bytes)

  await pool.query(
    `INSERT INTO "Analytics".trained_models
       (model_name, model_class, model_order, seasonal_order,
        aic, bic, mse, mae, nobs, trained_start, trained_end,
        has_exog, is_selected, model_binary)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     ON CONFLICT (model_name) DO UPDATE SET
       model_class=$2, model_order=$3, seasonal_order=$4,
       aic=$5, bic=$6, mse=$7, mae=$8, nobs=$9,
       trained_start=$10, trained_end=$11,
       has_exog=$12, is_selected=$13, model_binary=$14,
       updated_at=NOW()`,
    [
      meta.model_name, meta.model_class, meta.model_order, meta.seasonal_order,
      meta.aic, meta.bic, meta.mse, meta.mae, meta.nobs,
      meta.trained_start, meta.trained_end,
      meta.has_exog, meta.is_selected, binary,
    ]
  );

  const sizeKB = (binary.length / 1024).toFixed(1);
  console.log(`  ✓ ${meta.model_name} saved — ${sizeKB} KB — is_selected: ${meta.is_selected}`);
  return true;
}

async function main() {
  console.log('================================================');
  console.log('  Save Trained Models to PostgreSQL');
  console.log('================================================\n');

  try {
    // Verify table exists
    const check = await pool.query(
      `SELECT to_regclass('"Analytics".trained_models') AS exists`
    );
    if (!check.rows[0].exists) {
      console.error('✗ Table Analytics.trained_models does not exist.');
      console.error('  Run schema_addition.sql in pgAdmin first, then retry.');
      process.exit(1);
    }

    await saveModel('arima_model',          MODEL_METADATA.arima_model);
    await saveModel('sarimax_final_model',  MODEL_METADATA.sarimax_final_model);

    // Verify
    const result = await pool.query(
      `SELECT model_name, model_order, aic, mae,
              is_selected, octet_length(model_binary) AS bytes
       FROM "Analytics".trained_models ORDER BY model_name`
    );
    console.log('\nDatabase verification:');
    for (const row of result.rows) {
      console.log(`  ${row.model_name}: order=${row.model_order}, AIC=${row.aic}, MAE=${row.mae}, selected=${row.is_selected}, size=${(row.bytes/1024).toFixed(1)}KB`);
    }

    console.log('\n================================================');
    console.log('  Models saved successfully!');
    console.log('================================================');
  } catch (err) {
    console.error('\n✗ Failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
