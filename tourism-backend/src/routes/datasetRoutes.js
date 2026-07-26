const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload      = require('../middleware/uploadMiddleware');
const { uploadDataset, getDatasetInfo } = require('../controllers/datasetController');

router.post('/upload', protect, upload.single('file'), uploadDataset);
router.get('/info',    getDatasetInfo);

module.exports = router;
