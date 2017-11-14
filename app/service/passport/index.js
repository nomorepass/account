const debug = require('debug')('account:passport')
const passport = require('passport')
const User = require('../../model/user')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findOne({ where: { id } })
    .then(function (user) {
      debug(user)
      done(null, user)
    })
    .catch(err => {
      debug(err)
      done(err)
    })
})

require('./local')
require('./jwt')

module.exports = passport
