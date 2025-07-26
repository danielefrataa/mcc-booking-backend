// src/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        console.error('❌ Email not found in Google profile');
        return done(new Error('Email not found'), null);
      }

      // Cek apakah user sudah ada berdasarkan googleId
      const existingUser = await User.findOne({ where: { googleId: profile.id } });
      if (existingUser) return done(null, existingUser);

      // Buat user baru
      const newUser = await User.create({
        googleId: profile.id,
        email,
        role: 'user',                  // Pastikan field role ada di model
        isProfileComplete: false,      // Field tambahan default
        password: null,                // kalau password di-required, set null dan izinkan null di model
      });

      return done(null, newUser);
    } catch (err) {
      console.error('🔥 Error during Google OAuth strategy:', err);
      return done(err, null);
    }
  }
));

// Optional: serialize/deserialize kalau pakai session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
