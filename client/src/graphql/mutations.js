import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($name: String!) {
    login(name: $name) {
      token
      author {
        name
      }
    }
  }
`;