// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../utils/token.util');
const { validationResult } = require('express-validator');

module.exports = {
  // Register user
 async register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
},


  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  /// Refresh token
async refreshToken(req, res) {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Token is required' });

    const storedToken = await RefreshToken.findOne({ where: { token } });
    if (!storedToken) return res.status(403).json({ message: 'Invalid token' });

    const user = await User.findByPk(storedToken.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken });

  } catch (error) {
    console.error('🔴 Refresh Token Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
},

  // Google callback handler
  async googleCallback(req, res) {
    try {
      const user = req.user;
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      // redirect to frontend with token as query param
      const redirectUrl = `${process.env.FRONTEND_URL}/auth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google Auth Callback Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
