const FacebookStrategy = require('passport-facebook')

const { FbAuth, User } = require('../models')
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
      const existingUser = await User.findOne({ username: profile.displayName })
      const fbUser = await FbAuth.findOne({ facebookId: profile.id })
      if (!existingUser && !fbUser) {
        // 1. No document in either User or FbAuth
        const newUser = await User.create({ username: profile.displayName })
        await FbAuth.create({
          // Create association on model.
          _id: newUser._id,
          facebookId: profile.id,
          photo: profile.photos[0].value,
          token: accessToken,
          username: profile.displayName
        })
        done(null, newUser)
      } else if (existingUser && !fbUser) {
        // 2. User document present, but no FbAuth document
        await FbAuth.create({
          // associate this document with the existing User document.
          _id: existingUser._id,
          facebookId: profile.id,
          photo: profile.photos[0].value,
          token: accessToken,
          username: profile.displayName
        })
        done(null, existingUser)
      } else {
        // 3. Both User & FbAuth documents present.
        const user = await User.findById(fbUser._id)
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
