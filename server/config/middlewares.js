const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const methodOverride = require('method-override')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const { COOKIE_SECRET, MONGO_URI } = require('./environment')
const { checkUser } = require('../utils')
const {
  authRoutes,
  indexRoutes,
  campgroundsRoutes,
  commentsRoutes
} = require('../routes')

const isTest = process.env.NODE_ENV === 'test'
const isDev = process.env.NODE_ENV === 'development'

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: COOKIE_SECRET,
      store: new MongoStore({ url: MONGO_URI })
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(checkUser)
  app.use(helmet())
  app.use(cors())
  app.use(methodOverride('_method'))
  if (isDev && !isTest) {
    app.use(morgan('dev'))
  }
  app.set('view engine', 'ejs')
  app.use(indexRoutes)
  app.use(authRoutes)
  app.use('/campgrounds', campgroundsRoutes)
  app.use('/campgrounds/:id/comments', commentsRoutes)
}
