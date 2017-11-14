const config = require('config')
const app = require('./app')
const winston = require('winston')

const server = app.listen(config.port, () => {
  winston.info('listen ok, address:', server.address())
})

module.exports = server
