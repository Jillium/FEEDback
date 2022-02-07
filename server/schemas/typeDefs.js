const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    postss: [Post]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Post {
    _id: ID
    title: String
    user: User
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    login(name: String!): Auth
  }
`;

module.exports = typeDefs;