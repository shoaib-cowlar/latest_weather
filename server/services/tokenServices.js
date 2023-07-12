// services/tokenService.js
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../config/tokens');
const { Token, User } = require('../models');

// Generate an access token
function generateAccessToken(user) {
  const payload = {
    userId: user.id,
    // Add additional user data to the payload if needed
  };

  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// Generate a refresh token
async function generateRefreshToken(user) {
  const payload = {
    userId: user.id,
    // Add additional user data to the payload if needed
  };

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7)
  await Token.create({
    userId: user.id,
    token: refreshToken,
    type: 'refresh',
    expiresAt: expiresAt
  });
  return refreshToken;
}

// Verify the access token
function verifyAccessToken(token) {
  return jwt.verify(token, TOKEN_SECRET);
}

// // Verify the refresh token
// function verifyRefreshToken(token) {
//   return jwt.verify(token, REFRESH_TOKEN_SECRET);
// }

// Verify the refresh token and retrieve the associated user
async function verifyRefreshToken(token) {
  const decodedToken = jwt.verify(token, REFRESH_TOKEN_SECRET);
  const user = await User.findByPk(decodedToken.userId);

  if (!user) {
    throw new Error('Invalid refresh token');
  }

  return user;
}

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
