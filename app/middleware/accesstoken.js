const AccessToken = require('../model/accesstoken')
const UnauthorizedError = require('../error/Unauthorized')

module.exports = function (req, res, next) {
  let authorization = req.headers.authorization
  if (authorization) {
    let token = authorization.replace(`Bearer `, '')
    AccessToken.findOne({
      where: {
        token: token
      }
    })
      .then(count => {
        if (count) {
          next()
        } else {
          next(new UnauthorizedError())
        }
      })
      .catch(next)
  } else {
    next()
  }
}
