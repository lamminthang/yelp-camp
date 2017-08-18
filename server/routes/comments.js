const { Router } = require('express')

const { Campground, Comment } = require('../models')
const { isLoggedIn, permissionsCheck } = require('../utils')

const router = new Router({ mergeParams: true })

router.get('/new', isLoggedIn, async ({ params }, res) => {
  const { id } = params
  try {
    const campground = await Campground.findById(id)
    res.render('comments/new', { campground })
  } catch (e) {
    throw e
  }
})
router.post('/', isLoggedIn, async ({ body, params, user }, res) => {
  const { comment } = body
  const { id } = params
  try {
    const campground = await Campground.findById(id)
    try {
      const newComment = await Comment.create(comment)
      // Make one-to-many association of User > Comments.
      newComment.author = {
        id: user._id,
        photo: user.photo,
        username: user.username
      }
      // Must save comment to persist before pushing to array.
      newComment.save()
      await campground.comments.push(newComment)
      // Must save campground to persist changes made.
      await campground.save()
      res.redirect(`/campgrounds/${id}`)
    } catch (e) {
      throw e
    }
  } catch (e) {
    throw e
  }
})
router.get(
  '/:comment_id/edit',
  isLoggedIn,
  permissionsCheck,
  async ({ params }, res) => {
    const { comment_id, id } = params
    try {
      const comment = await Comment.findById(comment_id)
      res.render('comments/edit', { comment, id })
    } catch (e) {
      throw e
    }
  }
)
router.put(
  '/:comment_id/edit',
  isLoggedIn,
  permissionsCheck,
  async ({ body, params }, res) => {
    const { comment } = body
    const { comment_id, id } = params
    try {
      await Comment.findByIdAndUpdate(comment_id, comment)
      res.redirect(`/campgrounds/${id}`)
    } catch (e) {
      throw e
    }
  }
)
router.delete(
  '/:comment_id',
  isLoggedIn,
  permissionsCheck,
  async ({ params }, res) => {
    const { comment_id, id } = params
    try {
      await Comment.findByIdAndRemove(comment_id)
      res.redirect(`/campgrounds/${id}`)
    } catch (e) {
      throw e
    }
  }
)

module.exports = router
