const UnauthorizedError = require('../error/Unauthorized')

module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    next(new UnauthorizedError())
  }
}
