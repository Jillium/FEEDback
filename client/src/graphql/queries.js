import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postBody
      createdAt
      Comments {
        _id
        commentText
        commentedBy
        createdAt
      }
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
      Comment {
        _id
        commentText
        commentedBy
        createdAt
        replies {
          ReplyText
          RepliedBy
          createdAt
        }
      }
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

// I don't think we actually need to query these, we need mutations to add them 

// export const QUERY_COMMENT = gql`
// query comment($username: String!) {
//   reply(username: $username) {
//     _id
//     CommentText
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