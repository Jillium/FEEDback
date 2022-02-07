import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    postss: [Post]
  }

  type Auth {
    token: ID!
    author: Author
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

export default typeDefs;