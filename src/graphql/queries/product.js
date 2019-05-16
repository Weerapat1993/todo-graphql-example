
import gql from 'graphql-tag';

export const GET_PRODUCT = gql`
  query GetProducts {
    products @client {
      id
      text
      completed
    }
  }
`;
