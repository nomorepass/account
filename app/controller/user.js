const User = require('../model/user')
const jwtUtil = require('../util/jwt')

exports.signup = function (req, res, next) {
  User.create(req.body)
    .then(user => {
      res.json(user)
    })
    .catch(next)
}

exports.login = function (req, res, next) {
  let user = req.user

  jwtUtil
    .sign({
      uid: user.id
    })
    .then(token => {
      res.setHeader('Authorization', `Bearer ${token}`)
      res.json(user)
    })
    .catch(next)
}

exports.me = function (req, res, next) {
  res.json(req.user)
}

exports.logout = function (req, res, next) {
  res.json({
    ok: true
  })
}
