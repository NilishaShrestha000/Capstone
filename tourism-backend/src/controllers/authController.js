const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const DUMMY_ADMIN = {
  id:       1,
  username: 'admin@tourism.com',
  password: '$2a$10$3YmyRgPOIkS0H7wnnbuDfOJTLJJsTWOSR2Fx.gACSAA4BFnEL7phG',
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
const loginId = email || username;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both username and password' });
    }
  if (loginId !== DUMMY_ADMIN.username) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, DUMMY_ADMIN.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: DUMMY_ADMIN.id, username: DUMMY_ADMIN.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: DUMMY_ADMIN.id, username: DUMMY_ADMIN.username }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const verifyToken = (req, res) => {
  res.status(200).json({ success: true, message: 'Token is valid', user: req.user });
};

module.exports = { login, verifyToken };
