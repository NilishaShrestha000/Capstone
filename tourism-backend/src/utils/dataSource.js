/**
 * dataSource.js
 * Smart data source resolver — tries PostgreSQL first, falls back to JSON files.
 * Once the database is populated, no code changes needed — DB takes over automatically.
 */

const pool = require('../config/db');
const path = require('path');
const fs   = require('fs');

const DATA_DIR = path.join(__dirname, '../data');

// Load a JSON file synchronously at startup (cached)
const cache = {};
function loadJSON(filename) {
  if (!cache[filename]) {
    const filePath = path.join(DATA_DIR, filename);
    cache[filename] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return cache[filename];
}

/**
 * Checks whether a given table has at least one row.
 * Returns true = DB populated, false = DB empty (use JSON fallback).
 */
async function isTablePopulated(tableName) {
  try {
    const result = await pool.query(
      `SELECT 1 FROM "Analytics".${tableName} LIMIT 1`
    );
    return result.rowCount > 0;
  } catch {
    return false;
  }
}

module.exports = { loadJSON, isTablePopulated };
