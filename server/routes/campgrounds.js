const { Router } = require('express')

const { Campground } = require('../models')
const { isLoggedIn, permissionsCheck } = require('../utils')

const router = new Router()

router.get('/', async ({ user }, res) => {
  // NOTE: passing user for UI purposes.
  try {
    const campgrounds = await Campground.find({})
    res.render('campground/index', { campgrounds, user })
  } catch (e) {
    throw e
  }
})
router.post('/', isLoggedIn, async ({ body, user }, res) => {
  const { campground } = body
  try {
    const newCampground = await Campground.create(campground)
    // Make one-to-many association of User > Campgrounds.
    newCampground.author = { id: user._id, username: user.username }
    // Must save campground to persist changes made.
    newCampground.save()
    res.redirect('/campgrounds')
  } catch (e) {
    throw e
  }
})
// FIXME - if user is not authenticated should redirect in middleware
// to '/login' instead GET http://localhost:3000/campgrounds/new net::ERR_EMPTY_RESPONSE
// going back flash message shows up.
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campground/new')
})
router.get('/:id', async ({ params }, res) => {
  const { id } = params
  try {
    const campground = await Campground.findById(id).populate({
      path: 'comments',
      options: { limit: 10, skip: 0, sort: { createdAt: -1 } }
    })
    res.render('campground/show', { campground })
  } catch (e) {
    throw e
  }
})
router.get(
  '/:id/edit',
  isLoggedIn,
  permissionsCheck,
  async ({ params }, res) => {
    const { id } = params
    try {
      const campground = await Campground.findById(id)
      res.render('campground/edit', { campground })
    } catch (e) {
      throw e
    }
  }
)
router.put(
  '/:id',
  isLoggedIn,
  permissionsCheck,
  async ({ body, params }, res) => {
    const { campground } = body
    const { id } = params
    try {
      await Campground.findByIdAndUpdate(id, campground)
      res.redirect(`/campgrounds/${id}`)
    } catch (e) {
      throw e
    }
  }
)
router.delete('/:id', isLoggedIn, permissionsCheck, async ({ params }, res) => {
  const { id } = params
  try {
    await Campground.findByIdAndRemove(id)
    res.redirect('/campgrounds')
  } catch (e) {
    throw e
  }
})

module.exports = router
