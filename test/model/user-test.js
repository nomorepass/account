'use strict'

const assert = require('power-assert')
const User = require('../../app/model/user')
const UserMocker = require('../mocker/user')

describe('User model', () => {
  describe('definition', () => {
    it('should have fields', () => {
      let user = User.build(UserMocker())
      assert.deepEqual(Object.keys(user.dataValues), [
        'id',
        'username',
        'password',
        'salt',
        'email'
      ])
    })

    it('should not contain fields salt/password', () => {
      let user = User.build(UserMocker())
      let json = user.toJSON()
      assert.equal(json.salt, undefined)
      assert.equal(json.password, undefined)
    })
  })

  describe('create', () => {
    it('should ok', function * () {
      let usermock = UserMocker()
      let user = yield User.create(usermock)
      assert.equal(user.username, usermock.username)
      assert.notEqual(user.password, usermock.password)
    })

    it('should fail if dumplicate username', function * () {
      let error = null
      let username = UserMocker().username
      try {
        yield User.create(UserMocker({ username: username }))
        yield User.create(UserMocker({ username: username }))
      } catch (err) {
        error = err
      }
      assert.notEqual(error, null)
    })

    it('should fail if dumplicate email', function * () {
      let error = null
      let email = UserMocker().email
      try {
        yield User.create(UserMocker({ email: email }))
        yield User.create(UserMocker({ email: email }))
      } catch (err) {
        error = err
      }
      assert.notEqual(error, null)
    })
  })

  describe('save', () => {
    it('should ok', function * () {
      let usermock = UserMocker()
      let user = yield User.build(usermock).save()
      assert.equal(user.username, usermock.username)
      assert.notEqual(user.password, usermock.password)
    })

    it('should re enctypt if password changed', function * () {
      let rawpassword = 'a password'
      let user = yield User.build(UserMocker({
        password: rawpassword
      })).save()
      let hashed = user.password
      user.password = rawpassword
      user = yield user.save()
      assert.notEqual(user.password, hashed)
      assert.notEqual(user.password, rawpassword)
    })
  })
})
