const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/refresh-token', authController.refreshToken);

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline', // untuk dapat refreshToken
    prompt: 'consent'       // untuk selalu munculkan pilih akun
  })
);

// ✅ Google Callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login menggunakan email dan password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Kredensial salah
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Daniel Efrata
 *               email:
 *                 type: string
 *                 example: daniel@example.com
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Data tidak lengkap atau salah format
 *       409:
 *         description: Email sudah digunakan
 */


/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Mendapatkan access token baru dari refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 *     responses:
 *       200:
 *         description: Token berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Token tidak diberikan
 *       403:
 *         description: Token tidak valid atau kedaluwarsa
 */


/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Autentikasi Google OAuth
 *     tags: [Auth]
 *     description: Redirect ke Google untuk login
 *     responses:
 *       302:
 *         description: Redirect ke halaman login Google
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback Google OAuth
 *     tags: [Auth]
 *     description: Setelah login berhasil, akan redirect ke frontend dengan token
 *     responses:
 *       302:
 *         description: Redirect ke frontend dengan token di URL
 */

router.post('/login', authController.login);



module.exports = router;
