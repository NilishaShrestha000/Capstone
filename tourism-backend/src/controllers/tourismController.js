const annualService     = require('../services/annualService');
const historicalService = require('../services/historicalService');
const purposeService    = require('../services/purposeService');
const stayService       = require('../services/stayService');
const heatmapService    = require('../services/heatmapService');
const summaryService    = require('../services/summaryService');

// GET /api/tourism/annual
const getAnnualArrivals = async (req, res) => {
  try {
    const data = await annualService.getAnnualArrivals();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching annual arrivals', error: err.message });
  }
};

// GET /api/tourism/monthly?year=2024
const getMonthlyArrivals = async (req, res) => {
  try {
    const data = await historicalService.getHistoricalMonthly(req.query.year || null);
    res.json({ success: true, count: data.length, year: req.query.year || 'all', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching monthly arrivals', error: err.message });
  }
};

// GET /api/tourism/years
const getAvailableYears = async (req, res) => {
  try {
    const data = await historicalService.getAvailableYears();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching years', error: err.message });
  }
};

// GET /api/tourism/purpose?year=2024
const getPurposeOfVisit = async (req, res) => {
  try {
    const data = await purposeService.getPurposeOfVisit(req.query.year || null);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching purpose of visit', error: err.message });
  }
};

// GET /api/tourism/stay?year=2024
const getLengthOfStay = async (req, res) => {
  try {
    const data = await stayService.getLengthOfStay(req.query.year || null);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching length of stay', error: err.message });
  }
};

// GET /api/tourism/heatmap?year=2024
const getHeatmapData = async (req, res) => {
  try {
    const data = await heatmapService.getHeatmapData(req.query.year || null);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching heatmap data', error: err.message });
  }
};

// GET /api/tourism/dashboard
const getDashboardSummary = async (req, res) => {
  try {
    const data = await summaryService.getDashboardSummary();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching dashboard summary', error: err.message });
  }
};

// GET /api/tourism/summary
const getMasterSummary = async (req, res) => {
  try {
    const data = await summaryService.getMasterSummary();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching master summary', error: err.message });
  }
};

module.exports = {
  getAnnualArrivals, getMonthlyArrivals, getAvailableYears,
  getPurposeOfVisit, getLengthOfStay, getHeatmapData,
  getDashboardSummary, getMasterSummary,
};
