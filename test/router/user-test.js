'use strict'

const assert = require('power-assert')
const request = require('supertest')
const User = require('../../app/model/user')
const UserMocker = require('../mocker/user')
const app = require('../../app/app')
const authHelper = require('../helper/auth')

describe('user api', () => {
  describe('signup', () => {
    it('should ok', function * () {
      let mocker = UserMocker()

      let res = yield request(app)
        .post('/users/signup')
        .send({
          username: mocker.username,
          email: mocker.email,
          password: mocker.password
        })
        .expect(200)
      assert.ok(res.header.authorization)

      let user = yield User.findOne({ where: { id: res.body.id } })
      assert.notEqual(user, null)
      assert.equal(user.username, mocker.username)
      assert.equal(user.email, mocker.email)
    })
  })

  describe('login', () => {
    it('should ok', function * () {
      let mocker = UserMocker()
      let user = yield User.create(mocker)

      let res = yield request(app)
        .post('/users/login')
        .send({
          email: mocker.email,
          password: mocker.password
        })
        .expect(200)

      assert.equal(res.body.id, user.id)
    })
  })

  describe('me', () => {
    it('should return 401 before login', function * () {
      let res = yield request(app)
        .get('/users/me')
        .expect(401)
      let body = res.body
      assert.equal(body.name, 'UnauthorizedError')
    })

    it('should ok', function * () {
      let mocker = UserMocker()
      let user = yield User.create(mocker)

      let token = yield authHelper.getToken(app, mocker)
      let res = yield request(app)
        .get('/users/me')
        .set('Authorization', token)
        .expect(200)
      assert.equal(res.body.id, user.id)
    })
  })

  describe('logout', () => {
    it('should fail if not login', function * () {
      yield request(app)
        .post('/users/logout')
        .expect(401)
    })

    it('shuold ok', function * () {
      let mocker = UserMocker()
      yield User.create(mocker)

      let token = yield authHelper.getToken(app, mocker)
      let res = yield request(app)
        .post('/users/logout')
        .set('Authorization', token)
        .expect(200)
      assert.equal(res.body.ok, true)

      yield request(app)
        .post('/users/logout')
        .set('Authorization', token)
        .expect(401)
    })
  })
})
