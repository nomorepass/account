module.exports = {
  port: 8080,
  sequelize: {
    sqlite: {
      storage: 'account.db'
    }
  },
  cors: [],
  passport: {
    jwt: {
      secret: 'your secret'
    }
  }
}
