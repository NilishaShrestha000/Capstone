/**
 * modelRoutes.js
 * Mount at: /api/models
 */

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/modelController');
const auth    = require('../middleware/authMiddleware');

// Public — model metadata for dashboard display
router.get('/metadata',    ctrl.getModelMetadata);
router.get('/selected',    ctrl.getSelectedModel);
router.get('/comparison',  ctrl.getModelComparison);

// Protected — only admin can download the raw .pkl binary
router.get('/download/:modelName', auth.protect, ctrl.downloadModel);

module.exports = router;
