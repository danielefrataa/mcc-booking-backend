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
      const existingUser = await User.findOne({ where: { googleId: profile.id } });
      if (existingUser) return done(null, existingUser);

      const email = profile.emails?.[0]?.value;
      const user = await User.create({
        googleId: profile.id,
        email,
        isProfileComplete: false, // bisa diubah saat user melengkapi profil
      });

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// (Opsional) serialize user jika pakai session
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
