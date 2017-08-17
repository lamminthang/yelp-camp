const { Router } = require('express')

const {
  authFacebookEnd,
  authFacebookInit,
  authGoogleEnd,
  authGoogleInit,
  authTwitterEnd,
  authTwitterInit
} = require('../services')

const router = new Router()

router.get('/auth/facebook', authFacebookInit)
router.get('/auth/facebook/callback', authFacebookEnd)
router.get('/auth/google', authGoogleInit)
router.get('/auth/google/callback', authGoogleEnd)
router.get('/auth/twitter', authTwitterInit)
router.get('/auth/twitter/callback', authTwitterEnd)

module.exports = router
