const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const partialResponse = require('express-partial-response')

require('./service/passport')

const app = express()

app.use(morgan('dev'))
app.use(partialResponse())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use(require('./middleware/context'))
app.use(require('./middleware/cors'))

app.use(require('./router/version'))
app.use('/users', require('./router/user'))

app.use(require('./middleware/error-handler'))

module.exports = app
