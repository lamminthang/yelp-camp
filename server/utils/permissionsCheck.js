const { Campground, Comment } = require('../models')

/**
 * NOTE
 *
 * req.params.id = campground._id
 * req.params.comment_id = duh
 *
 * mongoose provides the 'equals' method because
 * author.id is an objectId NOT a string so making
 * the check `campground.author.id === req.user_id`
 * will return false.
 */

module.exports = async ({ params, user }, res, next) => {
  if (params.id && !params.comment_id) {
    // Campground Permission Check
    try {
      const { author } = await Campground.findById(params.id)
      if (author.id.equals(user._id)) {
        next()
      } else {
        res.redirect('back')
      }
    } catch (e) {
      throw e
    }
  } else {
    // Comment Permission Check
    try {
      const { author } = await Comment.findById(params.comment_id)
      if (author.id.equals(user._id)) {
        next()
      } else {
        res.redirect('back')
      }
    } catch (e) {
      throw e
    }
  }
}
