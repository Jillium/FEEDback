const { gql } = require("apollo-server-express");


const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  password: String
  posts: [Post]
  friends: [User]
}


type Post {
    _id: ID
    title: String
    PostBody: String
    username: String
    createdAt: String
   }

 



  
  type Query {
    posts(username: String): [Post]
    post(_id: ID!): Post
    users: [User]
    user(username: String!): User
  }


`;



module.exports = typeDefs;