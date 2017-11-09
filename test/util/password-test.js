'use strict'

const assert = require('power-assert')
const passwordUtil = require('../../app/util/password')

describe('password', () => {
  describe('generateSalt', () => {
    it('should have length of 16', () => {
      let salt = passwordUtil.generateSalt()

      assert(salt.match(/[a-z0-9]{16}/))
    })
  })

  describe('encrypt', () => {
    it('should ok', function * () {
      let salt = 'salt'
      let password = 'password'
      let encrypt = yield passwordUtil.encrypt(password, salt)
      assert.equal(encrypt, '632c2812e46d4604102ba7618e9d6d7d2f8128f6266b4a03264d2a0460b7dcb3')
    })
  })

  describe('verify', () => {
    it('should ok', function * () {
      let salt = 'salt'
      let password = 'password'
      let result = yield passwordUtil.verify('632c2812e46d4604102ba7618e9d6d7d2f8128f6266b4a03264d2a0460b7dcb3', password, salt)
      assert.equal(result, true)
    })

    it('should fail', function * () {
      let salt = 'salt'
      let password = 'password'
      let result = yield passwordUtil.verify('632c2812e46d4604102ba7618e9d6d7d2f8128f6266b4a03264d2a0460b7dcb4', password, salt)
      assert.equal(result, false)
    })
  })
})
