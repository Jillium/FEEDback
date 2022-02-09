import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query posts($PostedBy: String) {
    posts(PostedBy: $PostedBy) {
      _id
      PostBody
      createdAt
      Comments {
        _id
        CommentText
        CommentedBy
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
      PostBody
      createdAt
      Comment {
        _id
        CommentText
        CommentedBy
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
  query user($name: String!) {
    user(name: $name) {
      _id
      name
      email
      posts {
        _id
        title
        PostBody
        PostedBy
        Comments
        createdAt
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
query comment($CommentedBy: String!) {
  reply(CommentedBy: $CommentedBy) {
    _id
    CommentText
    Replies: {
      ReplyText
      RepliedBy
      createdAt
    }
  }
}
`;

export const QUERY_REPLY = gql `
query reply($RepliedBy: String!) {
  reply(RepliedBy: $RepliedBy) {
    _id
    ReplyText
    createdAt
  }
}
`;