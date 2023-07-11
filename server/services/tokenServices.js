// services/tokenService.js
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../config/tokens');

// Generate an access token
function generateAccessToken(user) {
  const payload = {
    userId: user._id,
    // Add additional user data to the payload if needed
  };

  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// Generate a refresh token
function generateRefreshToken(user) {
  const payload = {
    userId: user._id,
    // Add additional user data to the payload if needed
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

// Verify the access token
function verifyAccessToken(token) {
  return jwt.verify(token, TOKEN_SECRET);
}

// Verify the refresh token
function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
