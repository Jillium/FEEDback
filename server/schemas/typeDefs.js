import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    posts: [Post]
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

  type Comment {
    _id: ID
    commentText: String
    CommentedBy: String
  }

  

  type Query {
    posts: [Post]
  }

  type Mutation {
    login(name: String!): Auth
  }
`;

export default typeDefs;