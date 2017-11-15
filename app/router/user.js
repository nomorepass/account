'use strict'

const Router = require('express').Router
const passport = require('passport')
const userController = require('../controller/user')
const Authenticated = require('../middleware/authenticated')

const router = Router()

router.post('/signup', userController.signup)

router.post('/login', passport.authenticate('local'), userController.login)

router.get('/me', Authenticated, userController.me)

router.post('/logout', Authenticated, userController.logout)

module.exports = router
