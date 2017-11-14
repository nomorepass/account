const request = require('supertest')

module.exports.getToken = function * (app, userInfo) {
  let res = yield request(app)
    .post('/users/login')
    .send({
      email: userInfo.email,
      password: userInfo.password
    })
    .expect(200)

  return res.header.authorization
}
