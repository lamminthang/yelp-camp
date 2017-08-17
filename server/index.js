/* eslint-disable no-console */
const Express = require('express')

const { database, env, middlewares } = require('./config')
// const { seedDb } = require('./utils')

const app = new Express()

database(env.MONGO_URI)
// seedDb()
middlewares(app)

app.listen(env.PORT, err => {
  if (err) throw err
  console.log(
    `Express Server running on ${env.PORT} in ${process.env.NODE_ENV}`
  )
})
