const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/tourismController');

router.get('/annual',    ctrl.getAnnualArrivals);
router.get('/monthly',   ctrl.getMonthlyArrivals);
router.get('/years',     ctrl.getAvailableYears);
router.get('/purpose',   ctrl.getPurposeOfVisit);
router.get('/stay',      ctrl.getLengthOfStay);
router.get('/heatmap',   ctrl.getHeatmapData);
router.get('/dashboard', ctrl.getDashboardSummary);
router.get('/summary',   ctrl.getMasterSummary);

module.exports = router;
