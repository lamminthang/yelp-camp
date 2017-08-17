const GoogleStrategy = require('passport-google-oauth20')

const { User } = require('../models')
const env = require('../config/environment')

const { GOOGLE_ID, GOOGLE_SECRET, NGROK_URL, NOW_URL } = env

module.exports = new GoogleStrategy(
  {
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL:
      process.env.NODE_ENV === 'production'
        ? `${NOW_URL}/auth/google/callback`
        : `${NGROK_URL}/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log('Google', profile)
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) return done(null, existingUser)
      const newUser = await User.create({
        googleId: profile.id,
        photo: profile.photos[0].value,
        token: accessToken,
        username: profile.displayName
      })
      return done(null, newUser)
    } catch (e) {
      throw e
    }
  }
)
