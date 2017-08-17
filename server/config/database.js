const mongoose = require('mongoose')

module.exports = conf => {
  mongoose.Promise = global.Promise
  mongoose.connect(conf, { useMongoClient: true })
}
