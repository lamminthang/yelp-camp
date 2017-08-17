const { Router } = require('express')

const authRoutes = require('./auth')
const campgroundsRoutes = require('./campgrounds')
const commentsRoutes = require('./comments')

const router = new Router()

router.get('/', (req, res) => {
  res.render('landing')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

exports.authRoutes = authRoutes
exports.campgroundsRoutes = campgroundsRoutes
exports.commentsRoutes = commentsRoutes
exports.indexRoutes = router
