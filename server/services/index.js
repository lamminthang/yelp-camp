const passport = require('passport')

const facebookLogin = require('./FacebookStrategy')
const googleLogin = require('./GoogleStrategy')
const twitterLogin = require('./TwitterStrategy')
const { User } = require('../models')

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id).then(({ _id, username }) => {
    done(null, { _id, username })
  })
})

passport.use(facebookLogin)
passport.use(googleLogin)
passport.use(twitterLogin)

exports.authFacebookInit = passport.authenticate('facebook')
exports.authFacebookEnd = passport.authenticate('facebook', {
  failureRedirect: '/login',
  successRedirect: '/campgrounds'
})
exports.authGoogleInit = passport.authenticate('google', {
  scope: ['email', 'profile']
})
exports.authGoogleEnd = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/campgrounds'
})
exports.authTwitterInit = passport.authenticate('twitter')
exports.authTwitterEnd = passport.authenticate('twitter', {
  failureRedirect: '/login',
  successRedirect: '/campgrounds'
})
