const mongoose = require('mongoose')

const GoogAuthSchema = new mongoose.Schema({
  googleId: String,
  photo: String,
  token: String,
  username: String
})

module.exports = mongoose.model('GoogAuth', GoogAuthSchema)
