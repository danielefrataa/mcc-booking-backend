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
    accessType: 'offline', // opsional: untuk dapat refreshToken
    prompt: 'consent'       // opsional: untuk selalu munculkan pilih akun
  })
);

// ✅ Google Callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);



module.exports = router;
