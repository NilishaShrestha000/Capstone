/**
 * modelController.js
 * 
 * Handles API requests for trained model data.
 */

const modelService   = require('../services/modelService');
const forecastService = require('../services/forecastService');

// GET /api/models/metadata
// Returns metadata for all stored models (no binary)
const getModelMetadata = async (req, res) => {
  try {
    const data = await modelService.getModelMetadata();
    res.json({
      success: true,
      count:   data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching model metadata',
      error:   err.message,
    });
  }
};

// GET /api/models/selected
// Returns the currently selected model (SARIMAX)
const getSelectedModel = async (req, res) => {
  try {
    const model = await modelService.getSelectedModel();
    if (!model) {
      return res.status(404).json({ success: false, message: 'No selected model found' });
    }
    res.json({ success: true, data: model });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching selected model',
      error:   err.message,
    });
  }
};

// GET /api/models/download/:modelName
// Returns the raw .pkl binary for download (admin only)
// e.g. GET /api/models/download/SARIMAX
const downloadModel = async (req, res) => {
  try {
    const { modelName } = req.params;
    const allowed = ['ARIMA', 'SARIMAX'];
    if (!allowed.includes(modelName.toUpperCase())) {
      return res.status(400).json({ success: false, message: 'Invalid model name. Use ARIMA or SARIMAX.' });
    }

    const binary = await modelService.getModelBinary(modelName.toUpperCase());

    // Send as downloadable file
    const filename = modelName.toLowerCase() + '_model.pkl';
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', binary.length);
    res.send(binary);

  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/models/comparison
// Returns model comparison: metadata + forecast metrics side by side
const getModelComparison = async (req, res) => {
  try {
    const [models, forecastMeta] = await Promise.all([
      modelService.getModelMetadata(),
      forecastService.getForecastMeta(),
    ]);
    res.json({
      success:        true,
      selected_model: forecastMeta.model_used,
      models,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching model comparison',
      error:   err.message,
    });
  }
};

module.exports = { getModelMetadata, getSelectedModel, downloadModel, getModelComparison };
