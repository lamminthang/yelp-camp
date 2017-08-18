const mongoose = require('mongoose')

const campgroundSchema = new mongoose.Schema({
  author: {
    id: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId
    },
    photo: String,
    username: String
  },
  comments: [
    {
      ref: 'Comment',
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  description: String,
  image: String,
  name: String
})

module.exports = mongoose.model('Campground', campgroundSchema)
