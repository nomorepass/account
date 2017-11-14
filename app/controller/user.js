const User = require('../model/user')
const AccessToken = require('../model/accesstoken')
const jwtUtil = require('../util/jwt')

function generateAccessToken (uid) {
  return jwtUtil.sign({ uid }).then(token => {
    return AccessToken.create({
      userId: uid,
      token
    }).then(() => {
      return token
    })
  })
}

exports.signup = function (req, res, next) {
  User.create(req.body)
    .then(user => {
      return generateAccessToken(user.id).then(token => {
        res.setHeader('Authorization', `Bearer ${token}`)
        res.json(user)
      })
    })
    .catch(next)
}

exports.login = function (req, res, next) {
  let user = req.user

  generateAccessToken(user.id)
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
  let token = req.headers.authorization.replace('Bearer ', '')
  AccessToken.destroy({
    where: {
      token
    }
  }).then(() => {
    res.json({
      ok: true
    })
  })
}
