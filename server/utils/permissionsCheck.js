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

/**
 * FIXME
 * REVIEW
 *
 * Currently checking:
 *
 * `Object.keys(params).length`
 *
 * is a solid piece of code...however if someone maliciously
 * inserts into the url any number of params the else block
 * will run.
 *
 * 1) I could make a method that will filter the params object
 * only allowing 'id' &/or 'comment_id' to be passed through
 * for comparison checks
 * 2) I could just use `params.hasOwnProperty('prop')`.
 */

module.exports = async ({ params, user }, res, next) => {
  if (Object.keys(params).length === 1) {
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
