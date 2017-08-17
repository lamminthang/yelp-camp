/* eslint-disable no-param-reassign */
module.exports = ({ user }, { locals }, next) => {
  locals.user = user
  next()
}
