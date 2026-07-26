const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes     = require('./src/routes/authRoutes');
const tourismRoutes  = require('./src/routes/tourismRoutes');
const datasetRoutes  = require('./src/routes/datasetRoutes');
const forecastRoutes = require('./src/routes/forecastRoutes');
const modelRoutes = require('./src/routes/modelRoutes');

app.use('/api/models', modelRoutes);
app.use('/api/auth',     authRoutes);
app.use('/api/tourism',  tourismRoutes);
app.use('/api/dataset',  datasetRoutes);
app.use('/api/forecast', forecastRoutes);

// Health check / API index
app.get('/', (req, res) => {
  res.json({
    message:  'Nepal Tourism Flow Analysis API',
    version:  '2.0.0',
    status:   'running',
    endpoints: {
      tourism: {
        annual:    'GET /api/tourism/annual',
        monthly:   'GET /api/tourism/monthly?year=YYYY',
        years:     'GET /api/tourism/years',
        purpose:   'GET /api/tourism/purpose?year=YYYY',
        stay:      'GET /api/tourism/stay?year=YYYY',
        heatmap:   'GET /api/tourism/heatmap?year=YYYY',
        dashboard: 'GET /api/tourism/dashboard',
        summary:   'GET /api/tourism/summary',
      },
      forecast: {
        results:      'GET /api/forecast/results?year=2025',
        comparison:   'GET /api/forecast/comparison',
        metrics:      'GET /api/forecast/metrics',
        stationarity: 'GET /api/forecast/stationarity',
        outliers:     'GET /api/forecast/outliers',
        trigger:      'POST /api/forecast/trigger (admin)',
      },
      auth:    { login: 'POST /api/auth/login', verify: 'GET /api/auth/verify' },
      dataset: { upload: 'POST /api/dataset/upload (admin)', info: 'GET /api/dataset/info' },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log('  Nepal Tourism Flow Analysis API v2.0');
  console.log(`  Port : ${PORT}`);
  console.log(`  URL  : http://localhost:${PORT}`);
  console.log(`  Mode : ${process.env.NODE_ENV || 'development'}`);
});

