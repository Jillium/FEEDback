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
  mutation addComment($postId: ID!, $CommentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
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

// export const REMOVE_FRIEND = gql`
//   mutation removeFriend($id: ID!) {
//     removeFriend(id: $id) {
//       _id
//       username
//       friends {
//         _id
//         username
//       }
//     }
//   }
// `;
