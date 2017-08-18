const mongoose = require('mongoose')

const TwitterAuthSchema = new mongoose.Schema({
  twitterId: String,
  photo: String,
  token: String,
  username: String
})

module.exports = mongoose.model('TwitterAuth', TwitterAuthSchema)
