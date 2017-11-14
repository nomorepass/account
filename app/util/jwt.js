const jwt = require('jsonwebtoken')
const config = require('config')
const jwtConfig = config.passport.jwt

exports.sign = function (payload) {
  payload.ts = Date.now()
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtConfig.secret, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}
