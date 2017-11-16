module.exports = {
  port: 8080,
  graphql: {
    enabled: true,
    graphiql: true,
    pretty: true
  },
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
