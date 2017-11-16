const User = require('../model/user')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'user information',

  fields: () => ({
    id: {
      type: GraphQLInt
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Account',
    description: 'query what you want',

    fields: () => ({
      user: {
        type: UserType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, args, ctx) => {
          return User.findOne({
            where: {
              id: args.id
            }
          })
        }
      }
    })
  })
})
