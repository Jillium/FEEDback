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
    postBody: String
    username: String
    createdAt: String
    postLink: String
   }

 type Auth {
   token: ID!
   user: User
 }  

 



  
  type Query {
    posts(username: String): [Post]
    post(_id: ID!): Post
    users: [User]
    user(email: String!): User
  }

 type Mutation {
   login(email: String!, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   addPost(postBody: String!, postLink: String!): Post

 }


`;



module.exports = typeDefs;