'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../model/user')
const passwordUtil = require('../../util/password')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function (email, password, done) {
      User.findOne({
        where: {
          email: email
        }
      })
        .then(function (user) {
          if (!user) {
            done(null, false, { message: 'email/password not match' })
          } else {
            return passwordUtil
              .verify(user.password, password, user.salt)
              .then(function (isMatched) {
                if (isMatched) {
                  done(null, user)
                } else {
                  done(null, false, { message: 'email/password not match' })
                }
              })
              .catch(done)
          }
        })
        .catch(done)
    }
  )
)
