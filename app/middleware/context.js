const debug = require('debug')('account:context')

module.exports = function (req, res, next) {
  debug('header', req.headers)
  debug('param', req.params)
  debug('body', req.body)
  debug('query', req.query)
  next()
}
