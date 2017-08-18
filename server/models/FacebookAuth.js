const mongoose = require('mongoose')

const FbAuthSchema = new mongoose.Schema({
  facebookId: String,
  photo: String,
  token: String,
  username: String
})

module.exports = mongoose.model('FbAuth', FbAuthSchema)
