module.exports = (req, res, next) => {
  const authUser = req.isAuthenticated()
  if (authUser) {
    next()
  } else {
    res.redirect('/login')
  }
}
