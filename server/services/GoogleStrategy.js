const GoogleStrategy = require('passport-google-oauth20')

const { GoogleAuth, User } = require('../models')
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
      const existingUser = await User.findOne({ username: profile.displayName })
      const googleUser = await GoogleAuth.findOne({ googleId: profile.id })
      if (!existingUser && !googleUser) {
        // 1. No document in either User or GoogAuth
        const newUser = await User.create({ username: profile.displayName })
        await GoogleAuth.create({
          // Create association on model.
          _id: newUser._id,
          googleId: profile.id,
          photo: profile.photos[0].value,
          token: accessToken,
          username: profile.displayName
        })
        done(null, newUser)
      } else if (existingUser && !googleUser) {
        // 2. User document present, but no GoogAuth document
        await GoogleAuth.create({
          // associate this document with the existing User document.
          _id: existingUser._id,
          googleId: profile.id,
          photo: profile.photos[0].value,
          token: accessToken,
          username: profile.displayName
        })
        done(null, existingUser)
      } else {
        // 3. Both User & GoogAuth documents present.
        const user = await User.findById(googleUser._id)
        // Final check that the association is correct.
        if (existingUser._id.equals(user._id)) {
          done(null, existingUser)
        } else {
          // where did I go wrong????
          throw new Error('WTF!')
        }
      }
    } catch (e) {
      throw e
    }
  }
)
