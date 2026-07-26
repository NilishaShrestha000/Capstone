const { Pool } = require('pg');
const dotenv   = require('dotenv');
dotenv.config();

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on('connect', (client) => {
  client.query('SET search_path TO "Analytics"');
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection FAILED:', err.message);
  } else {
    console.log('Database connected: PostgreSQL');
    release();
  }
});

module.exports = pool;
