const { gql } = require("apollo-server-express");


const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
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
    commentCount: Int
    comments: [Comment]
  }
  
  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
  }  

  type Auth {
    token: ID!
    user: User
  }  

  type Query {
    me: User
    allPosts: [Post]
    posts(username: String): [Post]
    post(_id: ID!): Post
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(title: String!, postBody: String!, postLink: String!, username: String!): Post
    addFriend(friendId: ID!): User
    addComment(postId: ID!, commentText: String!, username: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }

`;

module.exports = typeDefs;