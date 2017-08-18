const TwitterStrategy = require('passport-twitter')

const { TwitterAuth, User } = require('../models')
const env = require('../config/environment')

const { NGROK_URL, NOW_URL, TWITTER_KEY, TWITTER_SECRET } = env

module.exports = new TwitterStrategy(
  {
    consumerKey: TWITTER_KEY,
    consumerSecret: TWITTER_SECRET,
    callbackURL:
      process.env.NODE_ENV === 'production'
        ? `${NOW_URL}/auth/twitter/callback`
        : `${NGROK_URL}/auth/twitter/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ username: profile.displayName })
      const twitterUser = await TwitterAuth.findOne({ twitterId: profile.id })
      if (!existingUser && !twitterUser) {
        // 1. No document in either User or TwitAuth
        const newUser = await User.create({
          photo: profile.photos[0].value,
          username: profile.displayName
        })
        await TwitterAuth.create({
          // Create association on model.
          _id: newUser._id,
          twitterId: profile.id,
          photo: profile.photos[0].value,
          token: accessToken,
          username: profile.displayName
        })
        done(null, newUser)
      } else if (existingUser && !twitterUser) {
        // 2. User document present, but no TwitAuth document
        await TwitterAuth.create({
          // associate this document with the existing User document.
          _id: existingUser._id,
          twitterId: profile.id,
          photo: profile.photos[0].value,
          token: accessToken,
          username: profile.displayName
        })
        done(null, existingUser)
      } else {
        // 3. Both User & TwitAuth documents present.
        const user = await User.findById(twitterUser._id)
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
