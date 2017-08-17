const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  facebookId: String,
  token: String,
  username: String
})

module.exports = mongoose.model('User', userSchema)
