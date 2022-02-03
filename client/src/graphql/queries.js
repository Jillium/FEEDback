import { gql } from '@apollo/client';

export const QUERY_BOOKS = gql`
  query Books {
    books {
      title
      author {
        name
      }
    }
  }
`;