'use strict'

const Sequelize = require('sequelize')
const config = require('config')
const winston = require('winston')

const sequelizeConfig = config.sequelize

let sequelize = new Sequelize('account', null, null, {
  dialect: 'sqlite',
  storage: sequelizeConfig.sqlite.storage,
  logging: function () {}
})

sequelize
  .sync()
  .then(function () {
    winston.info('connect ok')
  })
  .catch(function (err) {
    winston.error('connect fail', err)
  })

module.exports = sequelize
