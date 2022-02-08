import { gql } from '@apollo/client';

export const QUERY_BOOKS = gql`
  query Posts {
    posts {
      title
      user {
        name
      }
    }
  }
`;