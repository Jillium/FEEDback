import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!) {
    login(usernname: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: Sring!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
  `;

  export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
      addFriend(friendId: $id) {
        _id
        username
        friends {
          _id
          username
        }
      }
    }`

  
  // need to figure out how to export comments here 
  export const ADD_POST = gql`
    mutation addPost($PostBody: String!) {
      addPost(PostBody: $PostBody) {
        _id
        title
        PostBody
        username
        createdAt
      }
    }
    `;

    export const ADD_COMMENT = gql`
      mutation addComment($postId: ID!, $CommentText: String!) {
        addComment(postId: $postId, commentText: $commentText) {
          _id
          comments {
            _id
            CommentText
            username
            createdAt
          }
        }
      }`