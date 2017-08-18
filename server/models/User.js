const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  photo: String, // FIXME: This will be overwritten if multiple auth models are used & if picture is different between auth models.
  username: String
})

module.exports = mongoose.model('User', userSchema)
