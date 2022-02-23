import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postBody
      username
      title
      postLink
      createdAt
      commentCount
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($_id: ID!) {
    post(_id: $_id) {
      _id
      title
      postBody
      username
      postLink
      createdAt
      commentCount
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      posts {
        _id
        title
        postBody
        username
        postLink
        commentCount
        createdAt
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

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
      friendCount
      friends {
        _id
        username
      }
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
      user {
        friends {
          _id
          username
        }
      }
    }
  }
`
