const TwitterStrategy = require('passport-twitter')

const { User } = require('../models')
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
      // console.log('Twitter', profile)
      const existingUser = await User.findOne({ twitterId: profile.id })
      if (existingUser) return done(null, existingUser)
      const newUser = await User.create({
        photo: profile.photos[0].value,
        token: accessToken,
        twitterId: profile.id,
        username: profile.username
      })
      return done(null, newUser)
    } catch (e) {
      throw e
    }
  }
)
