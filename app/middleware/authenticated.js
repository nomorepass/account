module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    let err = new Error('Unauthorized')
    err.status = 401
    next(err)
  }
}
