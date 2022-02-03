import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Author {
    _id: ID
    name: String
    books: [Book]
  }

  type Auth {
    token: ID!
    author: Author
  }

  type Book {
    _id: ID
    title: String
    author: Author
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    login(name: String!): Auth
  }
`;

export default typeDefs;