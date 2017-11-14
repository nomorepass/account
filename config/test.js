module.exports = {
  port: 8080,
  sequelize: {
    sqlite: {
      storage: 'account.test.db'
    }
  },
  cors: [
    'http://a.com'
  ],
  passport: {
    jwt: {
      secret: 'test'
    }
  }
}
