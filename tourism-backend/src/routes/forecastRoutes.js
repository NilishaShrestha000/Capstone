const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/forecastController');
const auth     = require('../middleware/authMiddleware');

router.get('/results',      ctrl.getForecastResults);
router.get('/comparison',   ctrl.getComparisonData);
router.get('/metrics',      ctrl.getModelMetrics);
router.get('/stationarity', ctrl.getStationarityResults);
router.get('/outliers',     ctrl.getOutlierDetection);
router.post('/trigger',     auth.protect, ctrl.triggerForecast);

module.exports = router;
