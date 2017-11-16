const express = require('express')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const partialResponse = require('express-partial-response')

const graphql = require('./graphql')

require('./service/passport')

const app = express()

app.use(morgan('dev'))
app.use(partialResponse())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphql.schema,
    graphiql: graphql.config.graphiql,
    pretty: graphql.config.pretty
  })
)

app.use(passport.initialize())
app.use(function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err) {
      return next()
    }
    if (!user) {
      return next()
    }

    req.logIn(user, { session: false }, function (err) {
      if (err) {
        return next(err)
      }
      next()
    })
  })(req, res, next)
})

app.use(require('./middleware/context'))
app.use(require('./middleware/cors'))
app.use(require('./middleware/accesstoken'))

app.use(require('./router/version'))
app.use('/users', require('./router/user'))

app.use(require('./middleware/error-handler'))

module.exports = app
