import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postBody
      createdAt
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      title
      postBody
      createdAt
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      name
      email
      posts {
        _id
        title
        postBody
        postedBy
        comments
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    password
    posts {
      _id
      title
      postBody
      username
      createdAt
      postLink
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
}
`;

export const QUERY_ME_BASIC = gql`
query ME_BASIC {
  me {
    _id
    username
    email
    friends {
      friends {
        _id
        username
      }
    }
  }
}`

// I don't think we actually need to query these, we need mutations to add them 

// export const QUERY_COMMENT = gql`
// query comment($username: String!) {
//   reply(username: $username) {
//     _id
//     commentText
//     Replies: {
//       ReplyText
//       RepliedBy
//       createdAt
//     }
//   }
// }
// `;

// // export const QUERY_REPLY = gql `
// // query reply($RepliedBy: String!) {
// //   reply(RepliedBy: $RepliedBy) {
// //     _id
// //     ReplyText
// //     createdAt
// //   }
// // }
// // `;