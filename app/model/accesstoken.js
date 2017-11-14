'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../service/sequelize')
const User = require('./user')

const AccessToken = sequelize.define(
  'accesstoken',
  {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: true,
    paranoid: true
  }
)

AccessToken.belongsTo(User)

module.exports = AccessToken
