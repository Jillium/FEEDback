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
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

  
// need to figure out how to export comments here 
export const ADD_POST = gql`
  mutation addPost($postBody: String!, $postLink: String!, $title: String!, $username: String! ) {
    addPost(postBody: $postBody, postLink: $postLink, title: $title, username: $username) {
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
  }
`;