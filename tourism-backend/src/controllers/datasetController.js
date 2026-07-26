const fs   = require('fs');
const csv  = require('csv-parser');
const pool = require('../config/db');
const path = require('path');

// POST /api/dataset/upload  (protected)
const uploadDataset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please attach a CSV or XLSX file.',
      });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();

    // Handle CSV files
    if (ext === '.csv') {
      const results = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => results.push(row))
        .on('end', async () => {
          try {
            await pool.query(
              `INSERT INTO "Analytics".import_logs (file_name, status, records_imported)
               VALUES ($1, $2, $3)`,
              [req.file.originalname, 'success', results.length]
            );
          } catch (logError) {
            console.error('Could not write to import_logs:', logError.message);
          }

          // Clean up uploaded file
          fs.unlinkSync(req.file.path);

          res.status(200).json({
            success:    true,
            message:    'Dataset uploaded and parsed successfully',
            filename:   req.file.originalname,
            rows_count: results.length,
            preview:    results.slice(0, 5),
          });
        })
        .on('error', (err) => {
          res.status(500).json({
            success: false,
            message: 'Error parsing CSV file',
            error:   err.message,
          });
        });

    // Handle XLSX files
    } else if (ext === '.xlsx') {
      try {
        const XLSX = require('xlsx');
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const results = XLSX.utils.sheet_to_json(worksheet);

        try {
          await pool.query(
            `INSERT INTO "Analytics".import_logs (file_name, status, records_imported)
             VALUES ($1, $2, $3)`,
            [req.file.originalname, 'success', results.length]
          );
        } catch (logError) {
          console.error('Could not write to import_logs:', logError.message);
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.status(200).json({
          success:    true,
          message:    'Dataset uploaded and parsed successfully',
          filename:   req.file.originalname,
          rows_count: results.length,
          preview:    results.slice(0, 5),
        });

      } catch (xlsxError) {
        res.status(500).json({
          success: false,
          message: 'Error parsing XLSX file',
          error:   xlsxError.message,
        });
      }

    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid file type. Only CSV and XLSX files are accepted.',
      });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// GET /api/dataset/info
const getDatasetInfo = async (req, res) => {
  try {
    const yearResult = await pool.query(
      'SELECT MIN(year) AS min_year, MAX(year) AS max_year, COUNT(*) AS total_rows FROM "Analytics".monthly_arrivals'
    );
    const logResult = await pool.query(
      'SELECT * FROM "Analytics".import_logs ORDER BY imported_at DESC LIMIT 5'
    );

    const stats = yearResult.rows[0];

    res.status(200).json({
      success: true,
      source:  'database',
      fileCount: logResult.rows.length,
      dataset_info: {
        name:           'Nepal Tourism Statistics',
        source:         'MoCTCA / Open Data Nepal',
        years_covered:  `${stats.min_year}–${stats.max_year}`,
        total_records:  Number(stats.total_rows),
        recent_uploads: logResult.rows,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database error while fetching dataset information',
      error:   error.message,
    });
  }
};

module.exports = { uploadDataset, getDatasetInfo };