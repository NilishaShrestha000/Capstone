const express = require('express');
const router  = express.Router();
const { protect }            = require('../middleware/authMiddleware');
const { login, verifyToken } = require('../controllers/authController');

router.post('/login',  login);
router.get('/verify',  protect, verifyToken);

module.exports = router;
