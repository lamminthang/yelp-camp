const FacebookStrategy = require('passport-facebook')

const { User } = require('../models')
const env = require('../config/environment')

const { FB_ID, FB_SECRET, NGROK_URL, NOW_URL } = env

module.exports = new FacebookStrategy(
  {
    clientID: FB_ID,
    clientSecret: FB_SECRET,
    callbackURL:
      process.env.NODE_ENV === 'production'
        ? `${NOW_URL}/auth/facebook/callback`
        : `${NGROK_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log('Facebook', profile)
      const existingUser = await User.findOne({ facebookId: profile.id })
      if (existingUser) return done(null, existingUser)
      const newUser = await User.create({
        facebookId: profile.id,
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
