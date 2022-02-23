import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation Mutation($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      email
    }
  }
`;


// need to figure out how to export comments here 
export const ADD_POST = gql`
  mutation addPost($title: String!, $postBody: String!, $postLink: String!, $username: String!) {
    addPost(title: $title, postBody: $postBody, postLink: $postLink, username: $username) {
      _id
      title
      postBody
      username
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!, $username: String!) {
    addComment(postId: $postId, commentText: $commentText, username: $username) {
      _id
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation Mutation($postId: ID!) {
    removePost(postId: $postId) {
      postBody
      username
    }
  }
`;

export const REMOVE_COMMENT = gql `
  mutation RemoveComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      title
      postBody
    }
  }
`;
