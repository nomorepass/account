const config = require('config')
const passport = require('passport')
const debug = require('debug')('account:passport:jwt')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../../model/user')

const jwtConfig = config.passport.jwt

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret
}, function (jwtPayload, done) {
  debug(jwtPayload)

  User
    .findOne({ where: { id: jwtPayload.uid } })
    .then(function (user) {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(done)
}))
