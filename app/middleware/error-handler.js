const debug = require('debug')('account:error-handler')

module.exports = (err, req, res, next) => {
  debug(err)

  let status = err.status || 500

  res.status(status).json({
    name: err.name,
    message: err.message,
    stack: err.stack
  })
}
