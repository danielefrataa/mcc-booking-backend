// src/utils/token.util.js
const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models');
const { v4: uuidv4 } = require('uuid');

const ACCESS_TOKEN_EXPIRES = '15m';
const REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES }
  );
}

async function generateRefreshToken(user) {
  const token = uuidv4();
  const expires = new Date(Date.now() + REFRESH_TOKEN_EXPIRES);

  await RefreshToken.create({
    userId: user.id,
    token,
    expiresAt: expires
  });

  return token;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
