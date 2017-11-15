'use strict'

const Router = require('express').Router
const passport = require('passport')
const userController = require('../controller/user')
const Authenticated = require('../middleware/authenticated')
const UnauthorizedError = require('../error/Unauthorized')

const router = Router()

router.post('/signup', userController.signup)

router.post('/login', passport.authenticate('local'), userController.login)

router.use(function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err) { return next(new UnauthorizedError()) }
    if (!user) { return next(new UnauthorizedError()) }

    req.logIn(user, function (err) {
      if (err) { return next(err) }
      next()
    })
  })(req, res, next)
})

router.get('/me', Authenticated, userController.me)

router.post('/logout', Authenticated, userController.logout)

module.exports = router
